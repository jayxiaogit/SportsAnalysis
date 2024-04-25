from flask import Flask, request, jsonify
import flask
import json
from flask_cors import CORS
import matplotlib
from schedulingmodelRefactor import print_results

app = Flask(__name__)
CORS(app)
matplotlib.use('agg')  # Set matplotlib backend to 'agg'

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

    try:

        # Call the print_results function with the received parameters and write to a file
        result = print_results(zipcode, countrycode, rank, rest, travel, earnings, points, excluded)

        print(result)

        # Return the schedule data as JSON response
        print("Finished schedule generation")
        return result
    except Exception as e:
        return "ERROR"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)