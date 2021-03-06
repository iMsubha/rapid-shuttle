import { Button, Image } from "react-bootstrap";
import React, { useContext, useState } from "react";
import firebaseConfig from "../../components/Login/firebase.config";
import { Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Navigation from "../Navigation/Navigation";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { UserContext } from "../../App";
import FacebookIcon from "@material-ui/icons/Facebook";
import googleImage from "../../images/google.png";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: "false",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: "",
  });
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const inputStyle = {
    width: "350px",
  };
  const handleBlur = (e) => {
    let isFieldValid;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password" || "confirmPassword") {
      const isPasswordValid = e.target.value.length > 6;
      const hasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && hasNumber;
      console.log("password", isFieldValid);
    }
    if (e.target.name === "name") {
      // const newUserName = e.target.value;
      // console.log(newUserName)
      isFieldValid = e.target.value;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    //newUser &&
    if (newUser && user.email && user.password && user.confirmPassword) {
      if (user.confirmPassword === user.password) {
        console.log("con", user.confirmPassword);
        console.log("pass", user.password);
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
            const loginUser = {
              name: user.name,
              email: user.email,
            };
            setLoginUser(loginUser);
            history.replace(from);
          })
          .catch((err) => {
            console.log(err.message);
            const newUserInfo = { ...user };
            newUserInfo.error = err.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
      }
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((err) => {
          const newUserInfo = { ...user };
          newUserInfo.error = err.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email,
        };
        setUser(signInUser);
        setLoginUser(signInUser);
        history.replace(from);
        //console.log(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email,
        };
        console.log(result.user);

        setUser(signInUser);
        setLoginUser(signInUser);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
      });
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("user name updated successfully");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div>
      <Navigation />
      <h6 className="text-center pt-4" style={{ color: "red" }}>
        {user.error}
      </h6>
      {user.success && (
        <h6 className="text-center pt-4" style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged in"} Successfully!!{" "}
          <ThumbUpIcon fontSize={"small"} htmlColor={"green"} />{" "}
        </h6>
      )}
      <div className="container d-flex justify-content-center align-items-center">
        <Form className="border mt-4 p-5">
          <h5 className="mb-4 font-weight-bold">
            {newUser ? "Create an account" : "Login"}
          </h5>
          {newUser && (
            <div>
              <input
                style={inputStyle}
                className="mb-4"
                type="text"
                name="name"
                onBlur={handleBlur}
                placeholder="Name"
                required
              />
            </div>
          )}
          <div>
            <input
              style={inputStyle}
              className="mb-4"
              type="text"
              name="email"
              onBlur={handleBlur}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              style={inputStyle}
              className="mb-4"
              type="password"
              name="password"
              onBlur={handleBlur}
              placeholder="Password"
              required
            />
          </div>
          {newUser && (
            <div>
              <input
                style={inputStyle}
                className="mb-4"
                type="password"
                name="confirmPassword"
                onBlur={handleBlur}
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          {newUser ? (
            ""
          ) : (
            <div>
              <input type="checkbox" name="rememberMe" id="" />
              <label className="ml-2" htmlFor="rememberMe">
                Remember Me
              </label>
              <Link style={{ color: "#ff7b54" }} className="ml-5 pl-5">
                Forgot Password
              </Link>
            </div>
          )}
          <br />

          {newUser ? (
            <Link to={`/destination`}>
              <input
                onClick={handleSubmit}
                className="p-2"
                style={{
                  backgroundColor: "#ff7b54",
                  border: "none",
                  width: "350px",
                  color: "white",
                }}
                type="submit"
                value="Create an account"
              />
            </Link>
          ) : (
            <input
              onClick={handleSubmit}
              className="p-2"
              style={{
                backgroundColor: "#ff7b54",
                border: "none",
                width: "350px",
                color: "white",
              }}
              type="submit"
              value="Login"
            />
          )}

          {newUser === false && (
            <div className="d-flex justify-content-center">
              <p>Don't have an account?</p>
              <Link
                to={`/login`}
                style={{ color: "#ff7b54" }}
                onClick={() => setNewUser(true)}
              >
                Create an account
              </Link>
            </div>
          )}
          {newUser && (
            <div className="d-flex justify-content-center">
              <p>Already have an account?</p>
              <Link
                to={`/login`}
                onClick={() => {
                  history.go(0);
                }}
                style={{ color: "#ff7b54" }}
              >
                Login
              </Link>
            </div>
          )}
        </Form>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center pt-2">
        <div className="d-flex">
          <div style={{ width: "150px" }}>
            <hr />
          </div>
          <p>Or</p>
          <div style={{ width: "150px" }}>
            <hr />
          </div>
        </div>
        <Button
          onClick={handleFacebookSignIn}
          style={inputStyle}
          className="d-block mb-3 bg-white text-dark rounded-pill border"
        >
          <FacebookIcon color="primary" className="mr-3" />
          Continue with Facebook
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          style={inputStyle}
          className="d-block mb-3 bg-white text-dark rounded-pill border"
        >
          <Image src={googleImage} width={18} className="mr-4" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
