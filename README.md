**Talking Hands**

Talking Hands is a web application that helps users learn and practice American Sign Language (ASL) through interactive real-time gesture recognition, quizzes, and educational content. It uses your webcam and cutting-edge machine learning to interpret ASL hand signs in real time, allowing you to receive instant feedback on your signing. Whether you’re a beginner or brushing up on your skills, Talking Hands provides a fun and educational platform to communicate beyond words and bridge the gap between spoken and signed languages.

**Features ✨**

**Real-time ASL Sign Detection** - Uses MediaPipe Hands and TensorFlow.js to recognize ASL letters from your webcam video feed in real time. Simply show a hand sign to the camera, and the app will identify the letter you're signing on the screen. This feature helps you practice hand shapes and get immediate feedback on your gestures.

**Interactive Multiple-Choice Quiz** - Challenge yourself with a built-in ASL quiz! The quiz displays an image of an ASL hand sign (e.g. a letter of the alphabet), and you must choose the correct meaning or letter from multiple choices. Get instant feedback on your answer – the app will tell you if you're correct ✅ or encourage you to try again ❌. Hints are available to help you learn from mistakes, and your score updates as you progress.

**Educational Info Cards** - Learn about deafness, Deaf culture, and various communication methods through informative cards and content. 📚 The app includes educational sections discussing topics like sign language, lip reading, real-time captioning (CART), video relay services, and other assistive technologies that improve accessibility for the Deaf and hard-of-hearing community. These insights provide important context and encourage a well-rounded understanding alongside hands-on practice.

**Guest Mode and User Dashboard** - You can explore Talking Hands as a guest or as a registered user. Guest mode (no login required) lets you try out the sign detection and quiz features without creating an account. Logged-in users get access to a personalized dashboard 🙋, where your quiz progress and practice sessions can be tracked. The dashboard welcomes you by name and retains your learning progress (e.g. quiz scores or last practiced signs) for a more tailored experience. This way, you can monitor improvement over time. Logged-in users can also access account-specific features like saving your custom sign classifier (from the real-time detection feature) and receiving personalized tips.

**Tech Stack 🛠**

**Backend:** Node.js + Express – Implements the server-side API and application logic (user authentication, session management, etc.). Uses Express.js for routing and handles RESTful endpoints for login/signup. Data is stored in a MongoDB database via Mongoose (a MongoDB ODM) for managing user accounts and any saved progress.

**Frontend:** EJS Templates + HTML/CSS/JavaScript – Renders dynamic pages on the server side using Embedded JavaScript (EJS) templating. The interface is composed of EJS views styled with CSS for a clean, responsive UI. Vanilla JavaScript (and some DOM libraries) handle client-side interactivity, such as quiz logic and connecting to the gesture recognition.

**ASL Gesture Recognition:** **TensorFlow.js and MediaPipe –** The app leverages TensorFlow.js in the browser for machine learning. It uses the MediaPipe Hands model (via TensorFlow.js) to detect hand landmarks from the webcam. A KNN classifier (from TensorFlow.js library) is then used to classify these hand positions into ASL letters. This combination enables real-time prediction of hand signs without any native app – all happening in the web browser.

**Additional Libraries:** Uses dependencies like bcryptjs for password hashing, jsonwebtoken for auth tokens (JWT), dotenv for environment config, and Mailtrap API for sending emails (for features like verification or password reset). The front-end may also use small helper libraries (e.g. for UI components), but largely relies on custom code.

**Installation and Setup 🚀** 

Follow these steps to run the Talking Hands project locally on your machine:

**1.Clone the Repository:** 

git clone https://github.com/xxxxx/TalkingHands.git

cd TalkingHands

**2.Setup Backend (Server):**

Navigate to the backend/ folder and install dependencies:

cd backend

npm install

Create a .env file in the backend/ directory (if not already present) with the following environment variables:

. MONGO_URI – Your MongoDB connection string. (Example: mongodb+srv://<user>:<pass>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority)

. JWT_SECRET – A secret key for signing JWT tokens (use any random string).

. PORT – (Optional) Port for the backend server (defaults to 5000 if not set; the front-end expects 5000 or 5001 as configured).

. CLIENT_URL – (Optional) URL of the front-end (e.g. http://localhost:3000 for development).

. MAILTRAP_TOKEN and MAILTRAP_ENDPOINT – (Optional) Credentials for Mailtrap email service, if you want to enable email notifications (for features like password reset). You can skip these if not using the email features.

After setting up the .env, start the backend server:

**node index.js**

This will launch the Express server (by default at http://localhost:5000 unless you specified a different PORT).

**3.Setup Frontend (Client):**

Open a new terminal and navigate to the frontend/ folder:

cd ../frontend

npm install

(The front-end may not require additional environment variables by default. It will run on port 3000 unless configured otherwise.)

Start the front-end web server with:

**node app.js**

This will start the web application UI at http://localhost:3000.

**4.Run the Application:**

With both the backend and frontend servers running, open your browser and go to http://localhost:3000. You should see the Talking Hands welcome page. From here you can log in / register, or continue as a guest to start using the app.

**Note:** Ensure that the backend is running on the port that the frontend expects. By default, the front-end fetch calls point to localhost:5000 (or 5001 as per configuration). If needed, update the fetch URLs in the frontend scripts (e.g. in frontend/login_page/public/js/login.js) to match your backend port. Also, make sure you have MongoDB running and accessible via the MONGO_URI you provided.

**Screenshots 📸**








