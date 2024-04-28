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
    result = supabase.table('Advice').select('prompt, response, id').eq('userid', user_id).execute()
    if result.data:
        return jsonify(result.data), 200
    else:
        return jsonify({"message":  "No advises found"}), 404


@app.route("/createadvice", methods = ["POST"])
def  create_advice():
    data = request.json
    prompt= data['prompt']
    response = advisor(prompt)
    newdata = {
        "prompt": prompt,
        "response": response,
        "userid": mysession["userid"]
    }

    result = supabase.table("Advice").insert(newdata).execute()

    if result.data:
         print("Insert successful:", result.data), 200
         return result.data
    else:
        print("Error:")
        return None
    


@app.route("/deleteadvice/<int:id>", methods=["DELETE"])
def delete_advice(id):
    
    try:
        # Assuming 'userid' and 'adviceid' are columns in your 'Advice' table
        result = supabase.table("Advice").delete().eq("userid", mysession["userid"]).eq("id", id).execute()

        if result:
            print("Delete successful for advice ID:", id)
            return {"message": "Advice deleted successfully"}, 200
        else:
            print("Delete error:", result.error)
            return {"message": "Deletion failed"}, 400
    except Exception as e:
        print("Error:", e)
        return {"message": str(e)}, 500


@app.route("/getgoals", methods = ["GET"])
def get_goals():
    
    user_id = mysession["userid"]
    result = supabase.table('Goals').select('title, goal, id, isCompleted').eq('userid', user_id).execute()
    if result.data:
        return jsonify(result.data), 200
    else:
        return jsonify({"message":  "No Goals found"}), 404

@app.route("/deletegoal/<int:id>", methods=["DELETE"])
def delete_goal(id):
    
    try:
        # Assuming 'userid' and 'adviceid' are columns in your 'Advice' table
        result = supabase.table("Goals").delete().eq("userid", mysession["userid"]).eq("id", id).execute()

        if result:
            print("Delete successful for Goal ID:", id)
            return {"message": "Goal deleted successfully"}, 200
        else:
            print("Delete error:", result.error)
            return {"message": "Deletion failed"}, 400
    except Exception as e:
        print("Error:", e)
        return {"message": str(e)}, 500


@app.route("/updategoal/<int:id>", methods=["PUT"])
def update_goal(id):
    try:
        # Assuming 'userid' is a column in your 'Goals' table
        # And that the request contains the new data for the goal
        data = request.json
        updated_goal_data = {
            "title": data.get("title"),
            "goal": data.get("goal"),
            "isCompleted": data.get("isCompleted"),

            # Include other goal fields here if needed
        } 

        # Update the goal in the database
        result = supabase.table("Goals").update(updated_goal_data).eq("userid", mysession["userid"]).eq("id", id).execute()

        if result.data:
            print("Update successful for Goal ID:", id)
            return {"message": "Goal updated successfully"}, 200
        else:
            print("Update error:", result.error)
            return {"message": "Update failed"}, 400
    except Exception as e:
        print("Error:", e)
        return {"message": str(e)}, 500


@app.route("/creategoal", methods=["POST"])
def create_goal():
    # Ensure the user is logged in and has a session
    if "userid" not in mysession:
        return jsonify({"message": "User not logged in"}), 401

    user_id = mysession["userid"]
    data = request.json

    # Validate the incoming data
    if not data or 'title' not in data or 'goal' not in data:
        return jsonify({"message": "Missing data"}), 400

    title = data['title']
    goal = data['goal']
    isCompleted = data['isCompleted']

    # Insert the new goal into the database
    try:
        result = supabase.table('Goals').insert({
            "userid": user_id,
            "title": title,
            "goal": goal,
            "isCompleted":isCompleted,
        }).execute()

        if result.error:
            return jsonify({"message": "Database error", "details": str(result.error)}), 500

        return jsonify({"message": "Goal created successfully", "goal": result.data}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred", "details": str(e)}), 500



#Runs the server
if __name__ == "__main__":
    app.run(debug = True)