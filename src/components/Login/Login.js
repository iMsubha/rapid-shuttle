import { Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import firebaseConfig from "../../components/Login/firebase.config";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Navigation from "../Navigation/Navigation";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { UserContext } from "../../App";

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
var googleProvider = new firebase.auth.GoogleAuthProvider();
var fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = () => {
    const [loginUser, setLoginUser] = useContext(UserContext)
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: "false",
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
    });
    const inputStyle = {
        width: "350px",
    };
    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFieldValid;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
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
        if (newUser && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                })
                .catch((err) => {
                    console.log(err.message);
                    const newUserInfo = { ...user };
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
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
                const { displayName } = result.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName
                };
                setUser(signInUser);
                setLoginUser(signInUser);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    };
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName } = result.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                };
                console.log(displayName);
                setUser(signInUser);
                setLoginUser(signInUser);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    };
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // Update successful.
            console.log('user name updated successfully');
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }
    return (
        <div>
            <Navigation />

            {/* <h2>{user.displayName}</h2>
            <h2>{user.name}</h2>
            <h6>{user.email}</h6>
            <h6>{user.password}</h6> */}

            <h6 className="text-center pt-4" style={{ color: "red" }}>{user.error}</h6>
            {user.success && (
                <h6 className="text-center pt-4" style={{ color: "green" }}>
                    User {newUser ? "Created" : "Logged in"} Successfully!!{" "}
                    <ThumbUpIcon fontSize={"small"} htmlColor={"green"} />{" "}
                </h6>
            )}
            <div className="container d-flex justify-content-center align-items-center">
                <Form className="border mt-4 p-5">
                    {/* <h5 className="mb-4 font-weight-bold">Login</h5> */}
                    {
                        newUser ? <h5 className="mb-4 font-weight-bold">Create an account</h5> :
                            <h5 className="mb-4 font-weight-bold">Login</h5>
                    }
                    {/* <div>
                        <input
                            type="checkbox"
                            name="newUser"
                            onChange={() => setNewUser(!newUser)}
                            id=""
                        />
                        <label htmlFor="newUser" className="p-3">
                            Create a new user
                        </label>
                    </div> */}
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
                    {newUser ? '' : <div>
                        <input type="checkbox" name="rememberMe" id="" />
                        <label className="ml-2" htmlFor="rememberMe">
                            Remember Me
                        </label>
                        <Link
                            to="/login"
                            style={{ color: "#ff7b54" }}
                            className="ml-5 pl-5"
                        >Forgot Password
                        </Link>
                    </div>}
                    <br />
                    {/* <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} /> */}

                    {newUser ? <input
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
                    /> : <input
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
                        />}

                    {newUser === false && <div className="d-flex justify-content-center">
                        <p>Don't have an account?</p>
                        <Link
                            to="/login"
                            style={{ color: "#ff7b54" }}
                            onClick={() => setNewUser(true)}
                        >
                            Create an account
                        </Link>
                    </div>}
                    {newUser && <div className="d-flex justify-content-center">
                        <p>Already have an account?</p>
                        <Link
                            to="/login"
                            style={{ color: "#ff7b54" }}
                        >
                            Login
                        </Link>
                    </div>}
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
                    Continue with Facebook
        </Button>
                <Button
                    onClick={handleGoogleSignIn}
                    style={inputStyle}
                    className="d-block mb-3 bg-white text-dark rounded-pill border"
                >
                    Continue with Google
        </Button>
            </div>
        </div>
    );
};

export default Login;
