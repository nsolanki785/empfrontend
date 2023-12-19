import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
// import "../App.css"
import { useNavigate, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import CircularProgress from '@mui/material/CircularProgress';

// import "../../style.css"
import { setHeader } from "../../api/common";
import { AthentificationToken,UserData } from "../../utils/config";


const LoginPage = () => {
    const {token,setToken} = useContext(AthentificationToken);
    const {userDetails,setUserdetails} = useContext(UserData);  

    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    console.log("token",token);

    const validateAllField = () => {
        let isValid = true;
        const errors = {}

        if (!regex.test(loginData.email)) {
            errors['email'] = 'Invalid email'
            isValid = false;
        }
        console.log("condition", loginData.password.match(passwordRegex));

        if (!passwordRegex.test(loginData.password)) {
            errors['password'] = 'Invalid password'
            isValid = false;
        }
        setFormErrors(errors)
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAllField()) {
            try {
                var config = {
                    method: 'post',
                    url: "http://localhost:9000/signin",
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(loginData)
                };

                await axios(config)
                    .then((res) => {
                        console.log("UserDetails",res?.data?.userDetails);
                        setHeader(res?.data?.data);
                        localStorage.setItem('userDetails',JSON.stringify(res?.data?.userDetails))
                        setUserdetails(res?.data?.userDetails);
                        console.log("response", res)
                        setLoader(false);
                        setToken(res?.data?.token)
                        localStorage.setItem('secure-token', res?.data?.token)
                        navigate("/dashboard")
                        // window.location.reload()
                    })
            }

            catch (err) {
                console.log("message", err?.response?.data?.message)
                toast.error(err?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }


    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6"
                             onSubmit={handleSubmit}
                             >
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="email" id="email" onChange={(e) => setLoginData({
                                        ...loginData,
                                        email: e.target.value
                                    })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    {!regex.test(loginData.email) && formErrors.email &&
                                        <span style={{
                                            fontSize: "14px",
                                            color: "red"
                                        }}>
                                            {formErrors.email}
                                        </span>
                                    }
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                        onChange={(e) => setLoginData({
                                            ...loginData,
                                            password: e.target.value
                                        })}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    {!passwordRegex.test(loginData.password) && formErrors.password &&
                                        <span style={{
                                            fontSize: "14px",
                                            color: "red"
                                        }}>
                                            {formErrors.password}
                                        </span>}
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" class="text-sm font-medium text-gray-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Sign in</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a onClick={() => navigate('/signup')} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage;