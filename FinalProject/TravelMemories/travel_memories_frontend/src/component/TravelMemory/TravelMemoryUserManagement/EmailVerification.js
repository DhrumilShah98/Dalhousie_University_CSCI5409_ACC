/* Nachiket Panchal */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getElement, alertBox } from "../Libs/Helper";
import * as AWS from 'aws-sdk/global';
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';

function EmailVerification() {
    const navigate = useNavigate();
    if(localStorage.getItem("verified") == "" || localStorage.getItem("email") == ""){
        navigate("/");
    }else if(localStorage.getItem("verified") == true){
        navigate("/dashboard");
    }
    
    const [errors, setErrors] = useState({});
    const region = 'us-east-1';
    const PoolConfig = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID
    };

    var flag = 0;
    var alertCon = getElement("alert_box");

    if (localStorage.getItem("token") !== null) {
        navigate("/dashboard");
    }

    const [values, setValues] = useState({
        email: localStorage.getItem("email"),
        vcode: "",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value.trim(),
        });
    };

    function validation(values) {
        let errors = {};
        let re_email =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!values.email) {
            errors.email = "Please enter email.";
            flag = 1;
        }
        if (!values.vcode) {
            errors.vcode = "Please enter verification code.";
            flag = 1;
        }
        if (flag == 0 && (!re_email.test(values.email) || values.vcode.length != 6)) {
            alertCon.innerHTML = alertBox(0,"Invalid email or verification code");
            flag = 1;
        }
        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (flag === 0) {
            userConfirm();
        }
    };

    const resend = ()=>{
        resendCode();
    };
    function userConfirm(){
        var userPool = new CognitoUserPool(PoolConfig);
        var userData = {
          Username: values.email,
          Pool: userPool,
        };
      
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(values.vcode, true, function(err, result) {
          if (err) {
            alertCon.innerHTML = alertBox(0, err.message);
          }else{
            alertCon.innerHTML = alertBox(1, result);
            localStorage.setItem("verified", false);
            navigate("/login");
          }
        });
    }
    function resendCode(){
        var userPool = new CognitoUserPool(PoolConfig);
        var userData = {
            Username: values.email,
            Pool: userPool,
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }else{
                alertCon.innerHTML = alertBox(1, "Email sent successfully");
            }
        });
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
                                        <h2 className="h3 expensio-title">Email Verification</h2>
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
                                        value={values.email}
                                        disabled
                                    />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="Login-form mb-2 text-muted">
                                    <label htmlFor="vcode">Verification Code</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="vcode"
                                        id="vcode"
                                        placeholder="Enter verification code"
                                        value={values.vcode}
                                        onChange={handleChange}
                                    />
                                    {errors.vcode && <p className="text-danger">{errors.vcode}</p>}
                                </div>
                                <div className="mb-2">
                                    <button
                                        className="btn btn-success mx-auto d-inline"
                                        type="submit"
                                        name="submit"
                                        id="submit"
                                        onClick={handleSubmit}
                                    >
                                        Verify
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary mx-auto float-right d-inline"
                                        onClick={resend}
                                    >
                                        Resend
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

export default EmailVerification;