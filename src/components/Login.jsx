import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Store the selected profile picture
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const authObject = {
      "Project-ID": "4ddd21de-9c21-4d15-a7c3-658cdfe6720e",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      // Check if the user exists by making a request to ChatEngine
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      // Set username and password in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // Reload the page after setting the items in localStorage
      window.location.reload();
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };


  const handleRegistration = async () => {
    try {
      const privateApiKey = "e7562d39-19f2-42b1-b684-82d97d3b2092"; // Replace with your actual private key

      // Create a new FormData object to send the user data including the profile picture
      const formData = new FormData();
      formData.append("username", username);
      formData.append("secret", password);
      if (profilePicture) {
        formData.append("avatar", profilePicture, profilePicture.name);
      }

      // Create a new user using ChatEngine API with PRIVATE-KEY header
      await axios.post("https://api.chatengine.io/users/", formData, {
        headers: {
          "PRIVATE-KEY": privateApiKey,
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      // Create a chat room named "Root" for the user
      await axios.post(
        "https://api.chatengine.io/chats/",
        {
          title: "Root",
          usernames: [username],
        },
        {
          headers: {
            "Project-ID": "4ddd21de-9c21-4d15-a7c3-658cdfe6720e",
            "User-Name": username,
            "User-Secret": password,
          },
        }
      );

      // After successful registration, clear the error
      setError("");

      // Automatically log in after registration
      handleLogin();
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };





  return (
    <div className="login">
      <div className="login-wrapper">
        <h1>Chat Application</h1>
        <form>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="file"
            accept="image/*" // Allow only image files
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <div className="btn-container">
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <br/>
            <br/>
            <button type="button" onClick={handleRegistration}>
              Register
            </button>
          </div>
          <h2>{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
