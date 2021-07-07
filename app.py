import time
from flask import Flask, request,  jsonify
from flask_cors import CORS
import record_match
import json


app = Flask(__name__)

CORS(app)

fn = record_match.FuzzyMatcher(block_keys=['medicamento'], complex_keys=[], opt_keys=[], threshold=0.8, normalizer=str.lower)

f = open('vademecum_mexico.json')
data = json.load(f)

def search(text):
    b1 = {'medicamento':text}
    top = []
    for message in list(data):
        b2 = {'medicamento': message}
        match = fn.match(b1,b2)
        if match[0] == True:
            top.append(message)
    return top


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/sub", methods = ['POST'])
def postTest():
    if not request.json:
        return 'not a json post'

    data = request.get_json()
    print(data['user1'])
    a = search(data['user1'])
    return jsonify(a)
   
    