import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('set-board')
  handleSetBoard(client: Socket, boardId: string) {
    if (client['myBoardId'] === boardId) return;
    if (client['myBoardId']) {
      client.leave(client['myBoardId']);
      this.logger.log(`Socket is leaving board ${client['myBoardId']} [id: ${client.id}]`);
    }
    client.join(boardId);
    client['myBoardId'] = boardId;
    this.logger.log(`Socket joined board ${boardId} [id: ${client.id}]`);
  }

  emitTo({ type, data, label }) {
    if (label) {
      this.server.to(`watching:${label}`).emit(type, data);
    } else {
      this.server.emit(type, data);
    }
  }

  emitToUser({ type, data, userId }) {
    const userSockets = this.getUserSockets(userId);
    if (userSockets.length > 0) {
      userSockets.forEach((socket) => {
        socket.emit(type, data);
      });
      this.logger.log(`Emitting event: ${type} to user: ${userId}`);
    } else {
      this.logger.log(`No active socket for user: ${userId}`);
    }
  }

  broadcast({ type, data, room = null, userId = null }) {
    this.logger.log(`Broadcasting event: ${type}`);
    
    if (room && userId) {
      this.server.to(room).except(this.getUserSocketIds(userId)).emit(type, data);
      this.logger.log(`Broadcast to room ${room} excluding user: ${userId}`);
    } else if (userId) {
      this.server.except(this.getUserSocketIds(userId)).emit(type, data);
      this.logger.log(`Broadcast to all excluding user: ${userId}`);
    } else if (room) {
      this.server.to(room).emit(type, data);
      this.logger.log(`Emit to room: ${room}`);
    } else {
      this.server.emit(type, data);
      this.logger.log(`Emit to all`);
    }
  }

  private getUserSockets(userId: string): Socket[] {
    if (!userId) return [];
    const sockets = [];
    this.server.sockets.forEach((socket) => {
      if (socket['userId'] === userId) {
        sockets.push(socket);
      }
    });
    return sockets;
  }

  private getUserSocketIds(userId: string): string[] {
    return this.getUserSockets(userId).map((socket) => socket.id);
  }
}
