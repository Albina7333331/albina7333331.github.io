from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    # Log the POST data
    postData = request.form  # Access form data as a dictionary
    print("POST request received:", postData)
    # You can also use libraries like json or logging for more structured logging
    return "Button clicked! Data received."
  else:
    return """
    <html><body>
    <h1>Click the button</h1>
    <form action="/" method="post">
      <input type="submit" value="Click Me">
    </form>
    </body></html>
    """

if __name__ == "__main__":
  app.run(debug=True)  # Enable debug mode for development

