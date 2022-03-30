from api import app
from flask import request
from flask.json import jsonify
from flask.wrappers import Response

@app.route('/api/testing')
def testing() -> Response:
    return jsonify(status=200, message="Hello,world")