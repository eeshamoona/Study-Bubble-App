#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify #added to top of file
import db_worker
from db_worker import create_db_table

app = Flask(__name__)

@app.route('/api/StudyBubbles/', methods=['GET'])
def api_get_StudyBubbles():
    return jsonify(db_worker.get_StudyBubbles())

@app.route('/api/StudyBubbles/<StudyBubble_id>/', methods=['GET'])
def api_get_StudyBubble(StudyBubble_id):
    return jsonify(db_worker.get_StudyBubble_by_id(StudyBubble_id))

@app.route('/api/StudyBubbles/add/',  methods = ['POST'])
def api_add_StudyBubble():
    StudyBubble = request.get_json()
    print(StudyBubble)
    return jsonify(db_worker.insert_StudyBubble(StudyBubble))

@app.route('/api/StudyBubbles/update/',  methods = ['PUT'])
def api_update_StudyBubble():
    StudyBubble = request.get_json()
    return jsonify(db_worker.update_StudyBubble(StudyBubble))

@app.route('/api/StudyBubbles/delete/<StudyBubble_id>/',  methods = ['DELETE'])
def api_delete_StudyBubble(StudyBubble_id):
    return jsonify(db_worker.delete_StudyBubble(StudyBubble_id))

@app.route('/api/StudyBubbles/date/<StudyBubble_date>/', methods=['GET'])
def api_get_StudyBubble_in_date(StudyBubble_date):
    print(StudyBubble_date)
    return jsonify(db_worker.get_all_study_bubbles_in_date(StudyBubble_date))

# ---------------------------------------------------------------------
@app.route('/api/LCards/', methods=['GET'])
def api_get_LCards():
    return jsonify(db_worker.get_LCards())

@app.route('/api/LCards/<LCard_id>/', methods=['GET'])
def api_get_LCard(LCard_id):
    return jsonify(db_worker.get_LCard_by_id(LCard_id))

@app.route('/api/LCards/add/',  methods = ['POST'])
def api_add_LCard():
    LCard = request.get_json()
    print(LCard)
    return jsonify(db_worker.insert_LCard(LCard))

@app.route('/api/LCards/update/',  methods = ['PUT'])
def api_update_LCArd():
    LCard = request.get_json()
    return jsonify(db_worker.update_LCard(LCard))

@app.route('/api/LCards/delete/<LCard_id>/',  methods = ['DELETE'])
def api_delete_LCard(LCard_id):
    return jsonify(db_worker.delete_LCard(LCard_id))

@app.route('/api/LCards/all/<StudyBubble_id>/', methods=['GET'])
def api_get_LCard_with_StudyBubble_id(StudyBubble_id):
    return jsonify(db_worker.get_LCard_with_StudyBubble_id(StudyBubble_id))

"""
Enable CORS. Disable it if you don't need CORS
"""
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000" # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

if __name__ == "__main__":
    create_db_table()
    """
    Here you can change debug and port
    Remember that, in order to make this API functional, you must set debug in False
    """
    app.run(host='0.0.0.0', port=8000, debug=False)