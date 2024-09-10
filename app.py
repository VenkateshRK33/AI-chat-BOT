import os
import openai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'sk-i6VKgcHI56Cu2JDK4LoovD3x9Tqj10jWMz4bXlFhyvuA1MtA'

# Function to generate AI response using GPT
def generate_response_gpt(user_input):
    try:
        # Call the OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",  # Use GPT-3 or GPT-4 engine
            prompt=f'User: {user_input}\nAI:',
            temperature=0.7,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=["\n", "User:", "AI:"]
        )
        print(f"OpenAI Response: {response['choices'][0]['text'].strip()}")  # Print the response for debugging
        return response['choices'][0]['text'].strip()  # Return the response text
    except Exception as e:
        print(f"Error: {e}")  # Print the error if something goes wrong
        return "Sorry, I am currently having trouble processing your request."

# Flask route to render the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle user input and return AI response
@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.form['user_input']
    response = generate_response_gpt(user_input)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
