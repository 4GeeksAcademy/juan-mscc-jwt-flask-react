"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    
    if ('email' not in data or 'password' not in data):
        return jsonify({'msg': 'Bad request, missing data'}), 401
    
    user = db.session.execute(select(User).where(User.email == data['email'])).scalar_one_or_none()


    if (user):
        return jsonify({'msg': 'An user with this email already exist'}), 401

    user =  User(email = data['email'], password = data['password'], is_active = True)

    db.session.add(user)
    db.session.commit()

    return jsonify({'msg': 'User created'}), 200



@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)

    print(email)

    password = request.json.get("password", None)

    print(password)

    user = User.query.filter_by(email = email).first()

    if (user is None):
        return jsonify({'msg': 'Bad username or password'}), 401
    print(user)
    if (password != user.password):
        return jsonify({'msg': 'Bad username or password'}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


    

@api.route('/protected', methods=['POST'])
def protected():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
