from flask import Flask, request, jsonify
from resume_analyzer import analyze_resumes

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    job_description = data['jobDescription']
    resumes = data['resumes']
    rankings = analyze_resumes(job_description, resumes)
    return jsonify(rankings=rankings)

if __name__ == '__main__':
    app.run(debug=True)
