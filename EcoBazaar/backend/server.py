from flask import Flask, request, jsonify
import os, json

app = Flask(__name__)
USER_FILE = 'users.json'

# Create sample.json if it doesn't exist
if not os.path.exists(USER_FILE):
    with open(USER_FILE, 'w') as f:
        json.dump({}, f)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    with open(USER_FILE, 'r') as f:
        users = json.load(f)

    user = users.get(data['username'])
    if user and user['password'] == data['password']:
        return jsonify(success=True, message="Login successful")
    return jsonify(success=False, message="Login failed. Try again.")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    with open(USER_FILE, 'r') as f:
        users = json.load(f)

    if data['username'] in users:
        return jsonify(success=False, message="User already exists")

    users[data['username']] = { "password": data['password'] }
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=4)

    return jsonify(success=True, message="Signup successful")

if __name__ == '__main__':
    app.run(debug=True)
