/* Nachiket Panchal */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getElement, alertBox } from "../Libs/Helper";
import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';


function Registration() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        add1: "",
        add2: ""
    });
    const PoolConfig = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID
    };    
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value.trim(),
        });
    };

    var alertCon = getElement("alert_box");
    var flag = 0;
    const navigate = useNavigate();

    function validation(values) {
        let errors = {};
        let re_email =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let re_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!values.fname) {
            errors.fname = "Please enter your first name.";
            flag = 1;
        }

        if (!values.lname) {
            errors.lname = "Please enter your last name.";
            flag = 1;
        }

        if (!values.email) {
            errors.email = "Please enter email.";
            flag = 1;
        }
        if (!values.password) {
            errors.password = "Please enter password.";
            flag = 1;
        }

        if (!values.add1) {
            errors.add1 = "Please enter your address.";
            flag = 1;
        }

        if (flag == 0 && (!re_email.test(values.email) || !re_password.test(values.password))) {
            alertCon.innerHTML = alertBox(0, "Invalid user details.");
            flag = 1;
        }
        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (flag === 0) {
            register();
        }
    };
    function register() {
        var userPool = new CognitoUserPool(PoolConfig);
        var attributes = [];
        attributes.push(new CognitoUserAttribute({Name: 'name',Value: values.fname}));
        attributes.push(new CognitoUserAttribute({Name: 'email',Value: values.email}));
        attributes.push(new CognitoUserAttribute({Name: 'custom:lastName',Value: values.lname}));
        attributes.push(new CognitoUserAttribute({Name: "custom:address1",Value: values.add1}));
        attributes.push(new CognitoUserAttribute({Name: 'custom:address2',Value: values.add2}));
        userPool.signUp(values.email, values.password, attributes, null, 
          (err, result) => {
              if (err) {  
                alertCon.innerHTML = alertBox(0, err.message);
              }else{
                alertCon.innerHTML = alertBox(1, "User Successfully registered.");
                localStorage.setItem("email", values.email);
                localStorage.setItem("verified", false);
                navigate("/email-verification");
            }
        });
    }    
    return (
        <div className="container my-5">
            <div className="row">
                <div className="mx-auto col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="App-name">
                                <div className="text-center p-3 mb-2">
                                    <h2 className="h3 expensio-title">Register</h2>
                                </div>
                                <hr />
                            </div>
                            <div id="alert_box"></div>
                            <div className="row">
                                <div className="mx-auto">
                                    <form className="form-group" id="form">
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="fname">First Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="fname"
                                                id="fname"
                                                placeholder="Enter Your First Name"
                                                value={values.fname}
                                                onChange={handleChange}
                                            />
                                            {errors.fname && <p className="text-danger">{errors.fname}</p>}
                                        </div>
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="lname">Last Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="lname"
                                                id="lname"
                                                placeholder="Enter Your Last Name"
                                                value={values.lname}
                                                onChange={handleChange}
                                            />
                                            {errors.lname && <p className="text-danger">{errors.lname}</p>}
                                        </div>
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter Email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <p className="text-danger">{errors.email}</p>}
                                        </div>
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter Password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            <small class="text-muted">Max length 8 chars, One Upper, One lower, One Digit, One Special Char Required</small>
                                            {errors.password && <p className="text-danger">{errors.password}</p>}
                                        </div>
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="add1">Address Line 1</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="add1"
                                                id="add1"
                                                placeholder="Enter your address"
                                                value={values.add1}
                                                onChange={handleChange}
                                            />
                                            {errors.add1 && <p className="text-danger">{errors.add1}</p>}
                                        </div>
                                        <div className="Login-form mb-2 text-muted">
                                            <label htmlFor="answer">Address Line 2</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="add2"
                                                id="add2"
                                                placeholder="Enter your address"
                                                value={values.add2}
                                                onChange={handleChange}
                                            />
                                            {errors.add2 && <p className="text-danger">{errors.add2}</p>}
                                        </div>

                                        <div className="mb-2">
                                            <button
                                                className="btn btn-primary mx-auto d-block"
                                                type="submit"
                                                name="submit"
                                                id="submit"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-center">
                                                Existing user? Please <Link to="/login">Sign in</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Registration;
