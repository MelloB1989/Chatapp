import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request
from flask_cors import CORS
import time, hashlib, random

# Initialize Firebase 🔥
cred = credentials.Certificate("./private_key.json")
firebase_admin.initialize_app(cred)

# Set client 🥣
db = firestore.client()

# Set Flask App 🥣
app = Flask(__name__)
CORS(app, supports_credentials=True)
#cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Set API_KEY ⛵
API_KEY = "Mellob1989@api-key-chatapp"

def getData(col, id):
    collection = db.collection(col)
    doc = collection.document(id)
    data = doc.get().to_dict()
    return data

def updateData(col, id, key, value):
    collection = db.collection(col)
    update = collection.document(id).update({
        key: value
    })
    return update

def addData(col, id, data):
    collection = db.collection(col)
    add = collection.document(id).set(data)
    return add

#@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST")

@app.route('/accounts/login', methods=['GET'])
def login():
    username = request.headers["username"]
    password = request.headers["password"]
    api_key = request.headers["Authorization"]

    if api_key == API_KEY:
        user_data = getData("users", username)
        if user_data['username'] == username and user_data['password'] == password:
        #Generating a unique token for the user
            cookie_str = str(username)+"MelloB1989@"+str(password)+str(time.time())+str(random.random())
        #Encrypting the token for unique identification
            cookie = "session_"+hashlib.sha256(cookie_str.encode('utf-8')).hexdigest()
            updateData("users", username, "cookie", cookie)
            response = {"username": username, "name": user_data['name'], "cookie": cookie}
            #response = after_request(response)
            return response
        else:
            return "{'error': 'invalid_api_key_or_password'}"

#def options (self):
#    return {'Allow': 'POST'}, 200, \
#        {'Access-Control-Allow-Origin': '*', \
#            'Access-Control-Allow-Methods': 'POST'}

@app.route('/accounts/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    name = request.form['name']
    api_key = request.form['api_key']
    if api_key == API_KEY:
        user_data = getData("users", username)
        if user_data != None:
        #Generating a unique token for the user
            cookie_str = str(username)+"MelloB1989@"+str(password)+str(time.time())+str(random.random())
        #Encrypting the token for unique identification
            cookie = "session_"+hashlib.sha256(cookie_str.encode('utf-8')).hexdigest()
            data = {'username': username, 'password': password, 'name': name, 'cookie': cookie}
            add = addData("users", username, data)
            response = {'done': add, 'cookie': cookie}
            return response

        else:
            response = {'error': 'User already exists!'}
            return response

    else:
        response = {'error': 'Invalid API Key!'}
        return response

@app.route('/user/messages', methods=['POST'])
def get_messages():
    username = request.form['username']
    context = request.form['context']
    cookie = request.form['cookie']
    api_key = request.form['api_key']

    if api_key == API_KEY:
        user_data = getData("messages", username+"*"+context)

        if user_data == None:
            response = {'error': "Unknown error occured"}

        if cookie == user_data['cookie']:
            messages = getData("messages", username)
            
            return messages

        else:
            response = {'error': "user_not_logged_in"}
            return response

    else:
        response = {'error': "Invalid API Key!"}
        return response



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)