import React, { useState } from 'react';
import './CSS/LoginSignUp.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setErrorMessage(""); // Clear previous errors
    if (!validateForm()) return; // Stop submission if validation fails

    setLoading(true); // Show loading
    try {
      if (state === "Login") {
        await login();
      } else {
        await signup();
      }
    } finally {
      setLoading(false); // Hide loading
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || (state === "Sign Up" && !formData.username)) {
      setErrorMessage("All fields are required.");
      return false;
    }
    return true;
  };

  const login = async () => {
    console.log("Login Function Executed!", formData);
    try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token); // Save token
          window.location.replace("/"); // Redirect to the home page
        } else {
          setErrorMessage(responseData.message || "Login failed.");
        }
      } catch (error) {
        console.error('Error during Login:', error);
        setErrorMessage("An error occurred. Please try again later.");
      }
  };

  const signup = async () => {
    console.log("Sign Up Function Executed!", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token); // Save token
        window.location.replace("/"); // Redirect to the home page
      } else {
        setErrorMessage(responseData.message || "Signup failed.");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form className="loginsignup-fields" onSubmit={submitHandler}>
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              disabled={loading}
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
            disabled={loading}
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="agree" id="agree" disabled={loading} />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
