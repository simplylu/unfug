from flask import Flask, request
from flask_cors import CORS
import requests
import base64

from bundestag_captcha.solver import solve_captcha

app = Flask(__name__)
CORS(app)

def log_success(name: str) -> None:
    data = open("success.txt", "r").read().splitlines()
    if name not in data:
        data.append(name)
    with open("success.txt", "w") as f:
        f.write('\n'.join(data))

@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "GET":
        return "It works!"

    data = request.json.get("src")
    name = request.json.get("name")
    log_success(name)
    print("Sending mail to:", name)

    if not data:
        return {"status": "Error"}, 500
    
    with open("temp.png", "wb") as f:
        f.write(base64.b64decode(data.encode()))
    
    return {
        "captcha": solve_captcha("temp.png")
    }

if __name__ == "__main__":
    # Use the SSL context to run the app over HTTPS
    app.run(debug=True, host="0.0.0.0", port=8080, ssl_context=('cert.pem', 'key.pem'))