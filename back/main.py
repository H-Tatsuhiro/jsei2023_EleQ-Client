from flask import Flask, jsonify, request
from flask_cors import CORS
from core.qr import encode, decode
import base64
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "API Server's index."

@app.route("/encode", methods=["POST"])
def Encode():
    response_data = []

    for content in request.json:
        data_text = content['data']
        encoded_path = encode(data_text)
        with open(encoded_path, "rb") as f:
            img_base64 = base64.b64encode(f.read()).decode('utf-8')
            response_data.append({'data' : img_base64})

    return jsonify(response_data)

@app.route("/decode", methods=['POST'])
def Decode():
    for content in request.json:
        data_b64 = content['data']
        img_bin = base64.b64decode(data_b64)
        png = np.frombuffer(img_bin, dtype=np.uint8)
        img = cv2.imdecode(png, cv2.IMREAD_COLOR)
        cv2.imwrite("img/uploaded.png", img)

    response_data = decode("img/uploaded.png")
    return response_data

if __name__ == "__main__":
    app.run(debug=True)