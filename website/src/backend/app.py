from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import matplotlib
from schedulingmodelRefactor import print_results
import os
from dotenv import load_dotenv
from flask_migrate import Migrate

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
    params = {
        'zipcode': request.args.get('zipcode'),
        'countrycode': request.args.get('countrycode'),
        'rank': request.args.get('rank'),
        'rest': request.args.get('rest'),
        'travel': request.args.get('travel'),
        'earnings': request.args.get('earnings'),
        'points': request.args.get('points'),
        'excluded': request.args.get('excluded'),
        'included': request.args.get('included')
    }
    print("past here")

    try:
        # print(params['included'])
        print(params)
        # Call the print_results function with the received parameters and write to a file
        result = print_results(**params)
        print(result)
        # Return the schedule data as JSON response
        print("Finished schedule generation")
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return "ERROR", 500

@app.route('/save_schedule', methods=['POST', 'GET'])
def save():
    username = request.args.get('user_name')
    
    if request.method == 'GET':
        if not username:
                return jsonify({"error": "Username is required"}), 400
            
        # Query for schedules associated with the username
        schedules = Schedule.query.filter_by(user_name=username).all()
        if not schedules:
            return jsonify({"error": "No schedules found for this user"}), 404

        # Format the schedules for the response
        schedules_list = [{'id': sched.id, 'schedule': sched.schedule} for sched in schedules]
        return jsonify(schedules_list), 200

    elif request.method == 'POST':
        schedule = request.args.get('schedule')
        sched = Schedule(user_name=username, schedule=schedule)
        db.session.add(sched)
        db.session.commit()

    return "Success", 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
