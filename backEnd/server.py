from flask import  Flask, jsonify, request, session
from flask_cors import CORS
import os
from dotenv import load_dotenv #Used to get values from .env file
from supabase import create_client, Client
#Takes the prompt and returns the response for the llama2 model loaded in from huggingface
from myModels import advisor
from flask_session import Session
import redis #Used to store session data on the server side since be default its stored on client side


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = True
app.config['SESSION_TYPE'] = 'filesystem'
#app.config["SESSION_TYPE"] = "redis"
#app.config['SESSION_REDIS'] = redis.StrictRedis(host='localhost', port=5000, db=0)


Session(app)
app.secret_key = "abc" #The sessions secret key
#CORS(app) #Allows the client and server to interact since they will be running on different servers
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

#Had to create an object that represented the session because the normal session
#object didnt keep the values persistant from endpoint to endpoint
mysession = {}

load_dotenv()
url = os.getenv("URL")
api_key = os.getenv("API_KEY")
#Gets the authenticated values to connect to the supabase database from the .env file
supabase: Client = create_client(url, api_key)



    
#A POST request that will create a user if no flags are set off
@app.route("/signup", methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']  # In a real app, make sure to hash passwords!
    repassword = data["repassword"] #The re-entered password

    # Check if username already exists
    existing_user = supabase.table('User').select('username').eq('username', username).execute()
   
    #A flag that makes sure that there are no duplicate users within the database
    if existing_user.data: 
        # User already exists
        return jsonify({'message': 'Username already taken'}), 400
    
    #A flag used to make sure that the user enters the correct password
    if(password != repassword):
        return jsonify({"message": "Passwords do not match"}), 400

    # Insert new user into Supabase
    user = supabase.table('User').insert({'username': username, 'password': password}).execute()
    userId = supabase.table('User').select('id').eq('username', username).execute()
    mysession["username"] = username
    mysession["userid"] = userId.data[0]["id"]
    #print(session["id"])
    return jsonify(user.data), 200
    
@app.route("/login", methods = ["POST"])
def login():
    #Receives any data pass from the client
    data = request.json
    username = data['username']
    password = data['password']
    # Check if username already exists
    result = supabase.table('User').select('username, password').eq('username', username).execute()
    if result.data:
        # Access the first user in the list
        existing_user = result.data[0]

    #Time to handle the login logic
    if result.data:
        #If it is in the database then compare the password with the one stored on the DB
        if(username == existing_user["username"]):
            if(password == existing_user["password"]):
                #Gets the id and store the session information
                userId = supabase.table('User').select('id').eq('username', username).execute()
                mysession["username"] = username
                print(userId.data[0]["id"])
                mysession["userid"] = userId.data[0]["id"]
                print(mysession["userid"])
                return jsonify({"message": "Login successful"}), 200
            else: 
                return jsonify({"message": "Wrong Password"}), 401
    return jsonify({"message": "Wrong Username"}), 401

#Clears the session once the user logs out
@app.route("/logout", methods = ["POST"])
def logout(): 
    #Clears the session object
    mysession = {}
    #session.clear()
    return jsonify({"message":"Logged out successfully"}), 200



@app.route("/getadvise", methods = ["GET"])
def get_advises():
    
    user_id = mysession["userid"]
    result = supabase.table('Advice').select('prompt, response').eq('userid', user_id).execute()
    if result.data:
        return jsonify(result.data), 200
    else:
        return jsonify({"message":  "No advises found"}), 404



#Runs the server
if __name__ == "__main__":
    app.run(debug = True)