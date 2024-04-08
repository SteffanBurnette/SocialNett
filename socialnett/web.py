from collections.abc import Mapping
import json
import pathlib
from flask import Flask
from routes import user





server: Flask = Flask('')

config = 
server.register_blueprint(user.login)
server.register_blueprint(user.register)


@server.route('/')
def index():
    pass






      


# if __name__ == '__main__':
#     print(mm)
