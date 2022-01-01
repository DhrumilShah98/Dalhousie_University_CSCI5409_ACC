/* Nachiket Panchal */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getElement, alertBox } from "../Libs/Helper";
import * as AWS from 'aws-sdk/global';
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';

function ResetPassword() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const region = 'us-east-1';
    const PoolConfig = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID
    };
    let re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    var flag = 0;
    var alertCon = getElement("alert_box");

    const [values, setValues] = useState({
        email: "",
        password: "",
        code: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value.trim(),
        });
    };

    function validation(values) {
        let errors = {};

        if (!values.email) {
            errors.email = "Please enter email.";
            flag = 1;
        }
        if (!values.code) {
            errors.code = "Please enter verification code.";
            flag = 1;
        }
        if (!values.password) {
            errors.password = "Please enter a new password";
            flag = 1;
        }else if(!re_password.test(values.password)){
            errors.password = "Please enter a valid password";
            flag = 1;
        }
        if (flag == 0 && (!re_email.test(values.email) || values.code.length != 6)) {
            alertCon.innerHTML = alertBox(0,"Invalid email or verification code");
            flag = 1;
        }
        return errors;
    }
    function verifyEmail(){
        if (!values.email || !re_email.test(values.email)) {
            errors.email = "Please enter valid email.";
            return false;
        }
        return true;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (flag === 0) {
            newPassword();
        }
    };

    function newPassword(){
        var userPool = new CognitoUserPool(PoolConfig);
        var userData = {
          Username: values.email,
          Pool: userPool,
        };
      
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmPassword(values.code, values.password, {
            onSuccess() {
                alertCon.innerHTML = alertBox(1, "Password updated successfully");
                navigate("/login");
            },
            onFailure(err) {
                alertCon.innerHTML = alertBox(0, "Could not update the password");
            },
        });
    }
    function getCode(){
        var isEmailCorrect = verifyEmail();
        if(isEmailCorrect){
            var userPool = new CognitoUserPool(PoolConfig);
            var userData = {
                Username: values.email,
                Pool: userPool,
            };
            var cognitoUser = new CognitoUser(userData);
            cognitoUser.forgotPassword({
                onSuccess: function(data) {
                    alertCon.innerHTML = alertBox(1, "Code sent to email address successfully");
                },
                onFailure: function(err) {
                    alertCon.innerHTML = alertBox(0, err.message);
                },
            });    
        }
    }
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="mx-auto col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-group" id="form">
                                <div className="App-name">
                                    <div className="text-center p-3 mb-2">
                                        <h2 className="h3 expensio-title">Reset Password</h2>
                                    </div>
                                    <hr />
                                </div>
                                <div className="space"></div>
                                <div id="alert_box"></div>
                                <div className="Login-form mb-2 text-muted">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="Login-form mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary mx-auto"
                                        onClick={getCode}
                                    >
                                        Get Code
                                    </button>

                                </div>
                                <div className="Login-form mb-2 text-muted">
                                    <label htmlFor="code">Verification Code</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="code"
                                        id="code"
                                        placeholder="Enter verification code"
                                        onChange={handleChange}
                                    />
                                    {errors.code && <p className="text-danger">{errors.code}</p>}
                                </div>
                                <div className="Login-form mb-2 text-muted">
                                    <label htmlFor="code">Enter New Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter new password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                </div>
                                <div className="mb-2">
                                    <button
                                        className="btn btn-primary mx-auto d-inline"
                                        type="submit"
                                        name="submit"
                                        id="submit"
                                        onClick={handleSubmit}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;