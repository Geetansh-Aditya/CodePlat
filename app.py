from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-problems', methods=['POST'])
def get_problems():
    try:
        print('Getting problems...')
        json_payload = {"topic": "arrays", "difficulty": "medium"}
        response = requests.post(url="http://127.0.0.1:8000/generate_questions", json=json_payload)
        print(response.json())
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": "Failed to fetch questions from API"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)