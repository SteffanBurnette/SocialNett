from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/data', methods=['POST'])
def get_data():
    # Extract data from request
    data = request.json

    # Make a request to the provided endpoint from the WHO/GHO
    response = requests.get('https://ghoapi.azureedge.net/api/Dimension')

    # Return the response data
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
