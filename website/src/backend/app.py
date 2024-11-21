from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import matplotlib
from modelWithFRONTEND import print_results
import os
from dotenv import load_dotenv
from flask_migrate import Migrate
from datetime import datetime

import logging
from middleware import MwTracker
tracker=MwTracker()


# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

# Check if environment variables are loaded
if not all([db_host, db_user, db_password, db_name]):
    raise ValueError("Missing required environment variables")

app = Flask(__name__)
CORS(app)
matplotlib.use('agg')  # Set matplotlib backend to 'agg'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_owner = db.Column(db.Boolean, default=False)
    owner_id = db.Column(db.String(256), nullable=True)
    name = db.Column(db.String(256), nullable=False)
    user_name = db.Column(db.String(256), nullable=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    deleted_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"User(id={self.id}, user_name='{self.user_name}')"

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=True)
    user_name = db.Column(db.String(256), unique=False, nullable=False)
    schedule = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    deleted_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return (f"Schedule(id={self.id}, user_name='{self.user_name}', "
                f"name='{self.name}', schedule='{self.schedule}', "
                f"created_at='{self.created_at}', updated_at='{self.updated_at}', "
                f"deleted_at='{self.deleted_at}')")

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/schedule', methods=["GET"])
def results():
    # print("schedule endpoint reached...")
    zipcode = request.args.get('zipcode')
    countrycode = request.args.get('countrycode')
    rank = request.args.get('rank')
    rest = request.args.get('rest')
    travel = request.args.get('travel')
    earnings = request.args.get('earnings')
    points = request.args.get('points')
    excluded = request.args.get('excluded')
    included = request.args.get('included')

    try:
        result = print_results(zipcode, countrycode, rank, rest, travel, earnings, points, excluded, included)
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return "ERROR", 500
    
@app.route('/user-profiles', methods=["GET", "POST", "PUT", "DELETE"])
def userProfiles():
    id = request.args.get('id')
    name = request.args.get('name')
    email = request.args.get('email')
    is_owner = request.args.get('is_owner')
    owner_id = request.args.get('owner_id')

    if request.method == 'GET':
        users = User.query.filter_by(owner_id=owner_id, deleted_at=None).all()
        if not users:
            return jsonify({"error": "User profile not found"}), 404
                
        users_list = [{'id': user.id, 'name': user.name, 'email': user.email, 'owner': user.is_owner} for user in users]

        return jsonify({'data': users_list}), 200
    
    if request.method == 'POST':
        user = User(
            name=name,
            email=email,
            is_owner=(is_owner.lower() == 'true'),
            owner_id=owner_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "Successfully added profile"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
        
    elif request.method == 'PUT':
        if not name or not email:
            return jsonify({"error": "All fields are required"}), 400
        
        user = User.query.filter_by(id=id).first()
        if not user:
            return jsonify({"error": "User profile not found"}), 404
                    
        user.name = name
        user.email = email
        user.owner_id = owner_id
        user.updated_at = datetime.now()

        try:
            db.session.commit()
            return jsonify({"message": "User profile saved successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
        
    elif request.method == 'DELETE':
        userProfile = User.query.filter_by(id=id).first()
        if not userProfile:
            return jsonify({"error": "User Profile not found"}), 404
        
        userProfile.deleted_at = datetime.now()
        db.session.commit()
        return jsonify({"message": "Schedule marked as deleted"}), 200

    
@app.route('/user', methods=["GET", "POST", "PUT"])
def user():
    name = request.args.get('name')
    username = request.args.get('user_name')
    email = request.args.get('email')
    is_owner = request.args.get('is_owner')
    owner_id = request.args.get('owner_id')

    if request.method == 'GET':
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        user = User.query.filter_by(email=email, deleted_at=None).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        userJson = {'id': user.id, 'username': user.user_name, 'name': user.name, 'email': user.email, 'owner': user.is_owner}

        return jsonify({'data': userJson}), 200


    elif request.method == 'POST':
        if not name or not email:
            return jsonify({"error": "All fields are required"}), 400
        
        user = User(
            user_name=username,
            name=name,
            email=email,
            is_owner=(is_owner.lower() == 'true'),
            owner_id=owner_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User saved successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
        
    elif request.method == 'PUT':
        if not name or not email:
            return jsonify({"error": "All fields are required"}), 400
        
        user = User.query.filter_by(user_name=username).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        own = is_owner.lower() == 'true'
            
        user.user_name = username
        user.name = name
        user.email = email
        user.is_owner = own
        user.owner_id = owner_id
        user.updated_at = datetime.now()

        try:
            db.session.commit()
            return jsonify({"message": "User saved successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    

@app.route('/save_schedule', methods=['POST', 'GET', 'DELETE', 'PUT'])
def save():
    email = request.args.get('email')
    is_owner = request.args.get('owner')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    if request.method == 'GET':
        schedules = Schedule.query.filter_by(user_name=email, deleted_at=None).all()
        if not schedules:
            return jsonify({"error": "No schedules found for this user"}), 404
        
        schedules_list = [{'id': sched.id, 'username': sched.user_name, 'name': sched.name, 'schedule': sched.schedule} for sched in schedules]
        return jsonify({"data": schedules_list}), 200
        # if is_owner:
        #     users = User.query.filter_by(owner_id=current_user.user_name).all()
        #     if not users:
        #         return jsonify({"error": "No users found for this owner"}), 404
            
        #     return jsonify({"data": [user.user_name for user in users]}), 200
        # else:
        #     schedules = Schedule.query.filter_by(user_name=username, deleted_at=None).all()
        #     if not schedules:
        #         return jsonify({"error": "No schedules found for this user"}), 404
            
        #     schedules_list = [{'id': sched.id, 'name': sched.name, 'schedule': sched.schedule} for sched in schedules]
        #     return jsonify({"data": schedules_list}), 200

    elif request.method == 'POST':
        schedule = request.args.get('schedule')
        name = request.args.get('name')
        if not schedule or not name:
            return jsonify({"error": "Schedule and name are required"}), 400
        
        sched = Schedule(
            user_name=email,
            schedule=schedule,
            name=name,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(sched)
        db.session.commit()
        return jsonify({"message": "Schedule saved successfully"}), 200

    elif request.method == 'DELETE':
        schedule_id = int(request.args.get('id'))
        # print(schedule_id)
        if not schedule_id:
            return jsonify({"error": "Schedule ID and player username are required"}), 400
        
        sched = Schedule.query.filter_by(id=schedule_id).first()
        if not sched:
            return jsonify({"error": "Schedule not found"}), 404
        
        sched.deleted_at = datetime.now()
        db.session.commit()
        return jsonify({"message": "Schedule marked as deleted"}), 200

    elif request.method == 'PUT':
        schedule_id = request.args.get('id')
        if not schedule_id:
            return jsonify({"error": "Schedule ID and player username are required"}), 400
        
        sched = Schedule.query.filter_by(id=schedule_id).first()
        if not sched:
            return jsonify({"error": "Schedule not found"}), 404
        
        schedule = request.args.get('schedule')
        name = request.args.get('name')
        sched.schedule = schedule
        sched.name = name
        sched.updated_at = datetime.now()
        db.session.commit()
        return jsonify({"message": "Schedule updated successfully"}), 200

    return jsonify({"message": "Success"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
