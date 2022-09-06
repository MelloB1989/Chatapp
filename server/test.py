
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./private_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
collection = db.collection('users')
doc = collection.document('mellob')
#doc = collection.get()
res = doc.get().to_dict()

#create = collection.document('kartik').set({
#    'name': 'Kartik Deshmukh22',
#    'password': res['password'],
#    'last_seen': res['last_seen']
#})

messages = [{
            "id": "1",
            "name": "kartik",
            "timeStamp": "00:00",
            "message": "Hello, Lores imporem, elizabeth mine"
        },
        {
            "id": "2",
            "name": "unknown",
            "timeStamp": "00:00",
            "message": "Ok, I am a bot, this is a example message, this ap is made in react js by MelloB"
        },
        {
            "id": "3",
            "name": "kartik",
            "timeStamp": "00:00",
            "message": "Hello, Lores imporem, elizabeth mine"
        },
        {
            "id": "4",
            "name": "unknown",
            "timeStamp": "00:00",
            "message": "Ok, I am a bot, this is a example message, this ap is made in react js by MelloB"
        }]

#update = collection.document('mellob').update({
#    'messages': messages
#})

messages = res['messages']
message = messages[0]['message']
print(message)