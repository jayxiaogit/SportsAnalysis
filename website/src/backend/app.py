from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import flask
import json
from flask_cors import CORS
import matplotlib
from schedulingmodelRefactor import print_results
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the environment variables
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

app = Flask(__name__)
CORS(app)
matplotlib.use('agg')  # Set matplotlib backend to 'agg'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route("/")
def hello():
    return ""

@app.route('/schedule', methods=["GET"])
def results():
    print("schedule endpoint reached...")
    # Get query parameters from the request
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

        print(included)

        # Call the print_results function with the received parameters and write to a file
        result = print_results(zipcode, countrycode, rank, rest, travel, earnings, points, excluded, included)

        print(result)

        # Return the schedule data as JSON response
        print("Finished schedule generation")
        return result
    except Exception as e:
        return "ERROR"
    
@app.route('/save', methods = ['POST', 'GET'])
def login():
    if request.method == 'GET':
        username = request.form['username']
        cursor = db.cursor()
        cursor.execute(''' SELECT * FROM users WHERE username=(%s)''',(username))
        cursor.close()
     
    if request.method == 'POST':
        schedule = request.form['schedule']
        user = request.form['username']
        cursor = db.cursor()
        cursor.execute(''' INSERT INTO schedules VALUES(%s, %s)''',(schedule, user))
        cursor.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)

db.close()