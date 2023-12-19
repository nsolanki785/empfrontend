import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../App.css"
import { useNavigate,useHistory } from "react-router-dom";
import { toast } from "react-toastify"
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
// import CircularProgress from '@mui/material/CircularProgress';

  

const SignUpPage = () => {
    const [signUpdata, setsignUpdata] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate();

    console.log("signUpdata",signUpdata);
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    console.log("formError",formErrors);

    const validateAllField = () => {
        let isValid = true;
        const errors = {}

        if (!regex.test(signUpdata.email)) {
            errors['email'] = 'Invalid email'
            isValid = false;
        }
    
        if (!passwordRegex.test(signUpdata.password)) {
            errors['password'] = 'Invalid password'
            isValid = false;
        }

        if (!signUpdata.firstName) {
            errors['firstName'] = 'Please enter name'
            isValid = false;
        }

        if (!signUpdata.lastName) {
            errors['firstName'] = 'Please enter name'
            isValid = false;
        }

        if (!signUpdata.role) {
            errors['role'] = 'Please select role'
            isValid = false;
        }

        if (!signUpdata.confirmpassword) {
            errors['confirmpassword'] = 'Please enter confirm password '
            isValid = false;
        }

        if (signUpdata.password != signUpdata.confirmpassword) {
            errors['confirmpassword'] = 'password and confirm password should be some'
            isValid =false;
        }

        setFormErrors(errors)
        return isValid;
    }

    const handleSubmit = async (e) => {
        
        console.log("e");
        e.preventDefault();
        // navigate("/remainderpage")
        
        if (validateAllField()) {    
            try {
                  var config = {
                  method: 'post',
                  url:"http://localhost:9000/signup", 
                  headers:{  
                    'accept': 'application/json', 
                    'Content-Type': 'application/json'
                  },
                  data:JSON.stringify({
                    email:signUpdata?.email,
                    firstName:signUpdata?.firstName,
                    lastName:signUpdata?.lastName,
                    password:signUpdata?.password,
                    role:signUpdata?.role
                 })   
            };
             axios(config)
                 .then(function (response) {
                    if (response.status == 200) {
                        navigate('/')
                    }
                   })
                }

                catch (err) {
                  console.log("err",err)
                }
        }
    }


    return (
        <>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="pl-5 pr-5 flex justify-center">
            <form style={{
                width:"700px"
            }} className="mt-3 space-y-4 shadow-lg p-5"
             onSubmit={handleSubmit}
             >
                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                    Create your account
                 </h1>
                <div className="grid grid-cols-2 gap-4 ">
                    <div className="">
                        <label for="input-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>      
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                          onChange={(e) => setsignUpdata({
                            ...signUpdata,
                            firstName: e.target.value
                          })} 
                         id="input-email"
                         placeholder="First Name" 
                         />

                        {!signUpdata.firstName && formErrors.firstName &&
                            <span style={{
                                fontSize: "14px",
                                color: "red"
                            }}
                            >
                                {formErrors.firstName}
                            </span>
                        }
                    </div>

                    <div className="">
                        <label for="input-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>      
                        <input 
                          type="text" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                          onChange={(e) => setsignUpdata({
                            ...signUpdata,
                            lastName: e.target.value
                          })} 
                         id="input-email"
                         placeholder="First Name" 
                         />

                        {!signUpdata.lastName && formErrors.lastName &&
                            <span style={{
                                fontSize: "14px",
                                color: "red"
                            }}
                            >
                                {formErrors.lastName}
                            </span>
                        }
             </div>
                    </div>
            
             <div className="grid grid-cols-2 gap-4 ">
             <div className="">
                        <label for="input-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            User email
                        </label>
                        <input
                         type="email"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         onChange={(e) => setsignUpdata({
                            ...signUpdata,
                            email: e.target.value
                          })}
                         id="input-email"
                         placeholder="name@example.com"
                         />
                        {(!signUpdata.email || !regex.test(signUpdata.email) ) && formErrors.email &&
                            <span style={{
                                fontSize: "14px",
                                color: "red"
                            }}>
                                {formErrors.email}
                         </span>
                        }
                    </div>
              <div className="">
                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="role">Role:</label>
                 <select 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="role"
                  id="role"
                  onChange={(e)=>setsignUpdata({
                     ...signUpdata,
                     role:e.target.value
                 })}>
                    <option>select role</option>
                   <option value="admin">Admin</option>
                   <option value="manager">Manager</option>
                  </select>

                  {!signUpdata.role && formErrors.role &&
                            <span style={{
                                fontSize: "14px",
                                color: "red"
                            }}
                            >
                                {formErrors.role}
                            </span>
                        }


              </div>

           
            </div>
            <div className="grid grid-cols-2 gap-4 ">
            <div className="">
                 <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                 >Password</label>
                 <input 
                    type="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                    onChange={(e) => setsignUpdata({
                     ...signUpdata,
                     password: e.target.value
                    })} 
                    id="password" 
                    placeholder="password" />
                   {(!signUpdata.password || !passwordRegex.test(signUpdata.password)) && formErrors.password &&
                     <span 
                       style={{
                          fontSize: "14px",
                          color: "red"
                       }}
                     >
                         {formErrors.password}
                  </span>
                 }
             </div>
             <div className="">
                 <label for="c_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                 </label>
                 <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setsignUpdata({
                     ...signUpdata,
                     confirmpassword: e.target.value
                  })}
                  id="c password"
                  placeholder="confirm password"
                 />
                {(!signUpdata.confirmpassword || signUpdata.confirmpassword != signUpdata.password) && formErrors.confirmpassword &&
                     <span style={{
                         fontSize: "14px",
                         color: "red"
                      }}>
                         {formErrors.confirmpassword}
                  </span>
                 }
             </div>
            </div>
            <div>
            <button
             type="submit"
             className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Sign Up
             </button>
            </div>
            </form>
          </div>
          </div>
          </section>
  {/* <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <div type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</div>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section> */}
        </>
    )
}

export default SignUpPage;