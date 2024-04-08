from flask import Blueprint


app: Blueprint = Blueprint('')


app.route('/login')
def login():
    pass

app.route('/register')
def register():
    pass

