
BASE_URL="https://user:cb2c659c3fd6e19ba7ceb00b2523aef6@workit-backend-app-tunnel-t177r6qd.devinapps.com"
COOKIE_FILE="cookies.txt"

echo "Testing Workit Backend API..."
echo "=============================="

echo -e "\n1. Testing Root Endpoint"
curl -s $BASE_URL
echo -e "\n"

echo -e "\n2. Testing User Signup"
curl -s -X POST $BASE_URL/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2", "password":"password123", "fullname":"Test User 2"}' \
  -c $COOKIE_FILE
echo -e "\n"

echo -e "\n3. Testing User Login"
curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser2", "password":"password123"}' \
  -c $COOKIE_FILE
echo -e "\n"

echo -e "\n4. Testing Board Creation"
BOARD_RESPONSE=$(curl -s -X POST $BASE_URL/api/board \
  -H "Content-Type: application/json" \
  -b $COOKIE_FILE \
  -d '{"title":"Test Board 2", "description":"A test board 2", "groups": [], "members": []}')
echo $BOARD_RESPONSE
BOARD_ID=$(echo $BOARD_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo -e "\nCreated Board ID: $BOARD_ID\n"

echo -e "\n5. Testing Get All Boards"
curl -s -X GET $BASE_URL/api/board \
  -b $COOKIE_FILE
echo -e "\n"

echo -e "\n6. Testing Get Single Board"
curl -s -X GET $BASE_URL/api/board/$BOARD_ID \
  -b $COOKIE_FILE
echo -e "\n"

echo -e "\n7. Testing Update Board"
curl -s -X PUT $BASE_URL/api/board/$BOARD_ID \
  -H "Content-Type: application/json" \
  -b $COOKIE_FILE \
  -d '{"title":"Updated Test Board 2", "description":"An updated test board 2"}'
echo -e "\n"

echo -e "\n8. Testing Get Users"
curl -s -X GET $BASE_URL/api/user \
  -b $COOKIE_FILE
echo -e "\n"

echo -e "\n9. Testing Logout"
curl -s -X POST $BASE_URL/api/auth/logout \
  -b $COOKIE_FILE
echo -e "\n"

echo -e "\nAPI Testing Complete!"
