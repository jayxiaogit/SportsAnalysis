from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import matplotlib
from modelWithFRONTEND import print_results
import os
from dotenv import load_dotenv
from flask_migrate import Migrate
import datetime

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
    user_name = db.Column(db.String(256), unique=True, nullable=False)

    def __repr__(self):
        return f"User(id={self.id}, user_name='{self.user_name}')"

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=True)
    user_name = db.Column(db.String(256), unique=False, nullable=False)
    schedule = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Schedule(id={self.id}, user_name='{self.user_name}', schedule='{self.schedule})"

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/schedule', methods=["GET"])
def results():
    print("schedule endpoint reached...")
    # Get query parameters from the request
    # params = {
    #     'zipcode': request.args.get('zipcode'),
    #     'countrycode': request.args.get('countrycode'),
    #     'rank': request.args.get('rank'),
    #     'rest': request.args.get('rest'),
    #     'travel': request.args.get('travel'),
    #     'earnings': request.args.get('earnings'),
    #     'points': request.args.get('points'),
    #     'excluded': request.args.get('excluded'),
    #     'included': request.args.get('included')
    # }
    zipcode = request.args.get('zipcode')
    countrycode = request.args.get('countrycode')
    rank = request.args.get('rank')
    rest = request.args.get('rest')
    travel = request.args.get('travel')
    earnings = request.args.get('earnings')
    points = request.args.get('points')
    excluded = request.args.get('excluded')
    included = request.args.get('included')
    # print("past here")

    try:
        # print(params['included'])
        # print(params)
        # Call the print_results function with the received parameters and write to a file
        # result = print_results(**params)
        result = print_results(zipcode, countrycode, rank, rest, travel, earnings, points, excluded, included)
        print(result)
        # Return the schedule data as JSON response
        print("Finished schedule generation")
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return "ERROR", 500

@app.route('/save_schedule', methods=['POST', 'GET', 'DELETE', 'PUT'])
def save():
    username = request.args.get('user_name')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    if request.method == 'GET':
            
        # Query for schedules associated with the username
        schedules = Schedule.query.filter_by(user_name=username).filter(Schedule.deleted_at.is_(None)).all()
        if not schedules:
            return jsonify({"error": "No schedules found for this user"}), 404

        # Format the schedules for the response
        schedules_list = [{'id': sched.id, 'name': sched.name, 'schedule': sched.schedule} for sched in schedules]
        return jsonify(schedules_list), 200

    elif request.method == 'POST':
        schedule = request.args.get('schedule')
        name = request.args.get('name')
        print(name)
        sched = Schedule(user_name=username, schedule=schedule, name=name)
        db.session.add(sched)
        db.session.commit()
        return jsonify({"message": "Schedule saved successfully"}), 201

    elif request.method == 'DELETE':
        schedule_id = request.args.get('id')
        if not schedule_id:
            return jsonify({"error": "Schedule ID is required"}), 400
        sched = Schedule.query.filter_by(id=schedule_id, user_name=username).first()
        if not sched:
            return jsonify({"error": "Schedule not found"}), 404
        
        # Update deleted_at field to current time
        sched.deleted_at = datetime.utcnow()
        db.session.commit()
        return jsonify({"message": "Schedule marked as deleted"}), 200

    elif request.method == 'PUT':
        schedule = request.args.get('schedule')
        name = request.args.get('name')
        sched = Schedule(user_name=username, schedule=schedule, name=name)

    return "Success", 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
