from flask import Flask, request, jsonify
import flask
import json
from flask_cors import CORS
from schedulingmodelRefactor import print_results

app = Flask(__name__)
CORS(app)

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

    # Call the print_results function with the received parameters and write to a file
    with open("schedule_data.txt", "w") as output_file:
        print_results(zipcode, countrycode, rank, rest, output_file)

    # Read the content of the file and parse it as JSON
    with open("schedule_data.txt", "r") as input_file:
        schedule_data = input_file.read()

    # Return the schedule data as JSON response
    return jsonify(schedule_data)

if __name__ == "__main__":
    app.run("localhost", 6969)