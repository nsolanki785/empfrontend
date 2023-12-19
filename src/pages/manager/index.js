import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import SharedTable from "../../sharedcomponents/table";
import Modal from "../../sharedcomponents/modal";
import Layout from "../../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import apiendpoints from "../../api/apiendpoints";
import { apiCall } from "../../api/common";



const ManagerList = () => {
    const [showModal,setShowModal] =  useState(false);
    const [signUpdata, setsignUpdata] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [loader,setLoader] = useState(false);
    const [managerList,setManagerlist] = useState([]);
    const [modalTitle,setModaltitle] =useState("Add");
    const navigate = useNavigate();

    console.log("managerList",managerList);

    console.log("signUpdata",signUpdata);
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    console.log("formError",formErrors);    


    useEffect(()=>{
        handleFatch()
    },[])

     const handleFatch = async () => {       
         var config = {
            method: 'post',
            url:"http://localhost:9000/getusers", 
            headers:{'accept': 'application/json'},
            data:{role:"manager"}   
         };      
            axios(config)
             .then(function (response) {
                console.log('product',response?.data);
                setManagerlist(response?.data);
               })

             .catch(function (error) {
                console.log("err",error);
             });
    }

    const handleDelete = (id) => {
                
       const filtermanager = managerList.filter((item)=>item._id != id );
       var config = {
        method: 'delete',
        url:`http://localhost:9000/deleteuser/${id}`, 
        headers:{'accept': 'application/json'},   
     };      
        axios(config)
         .then(function (response) {
            if (response.status == 200) {
                setManagerlist(filtermanager);
            toast.success("Delete Succesfully", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
           })

         .catch(function (error) {
            console.log("err",error);
         }); 
    }

     
     
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

    const handleEditadmindetails = (data,index) => {
        setShowModal(true);
        setsignUpdata(data);
        setModaltitle("Edit")
    }

    const handleClose = () => {
        setShowModal(false);
        setFormErrors({})
    }

    const handleOpenModal = () => {
        setModaltitle("Add");
        setShowModal(true)
    }

    const handleSubmit = async (e) => {
        console.log("e");
        // e.preventDefault();
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
                    id:signUpdata._id, 
                    email:signUpdata?.email,
                    firstName:signUpdata?.firstName,
                    lastName:signUpdata?.lastName,
                    password:signUpdata?.password,
                    role:"manager"
                 })   
            };
             axios(config)
                 .then(function (response) {
                    if (response.status == 200) {
                       setShowModal(false);
                       handleFatch()
                       toast.success("Added Succesfully", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    }
                   })
                }

                catch (err) {
                  console.log("err",err)
                }
        }
    }

    return(
        <>
        <Layout>
          
            <div className="m-3">
             <div className="flex mb-3" ><h4 className="text-gray-400">Manager</h4> <span className="ms-2 text-gray-400">Manager List</span></div>
             <div className="flex bg-gray-500 p-3 text-gray-700 mb-3"> 
             <span className="mt-1 ms-1"><GoHomeFill/></span>
             <span className="me-1">Home</span> {">"} <span className="ms-1">Manager  {">"} ManagerList</span></div>
             <div>
             <div className="flex mb-3">
             <button type="button" onClick={()=>handleOpenModal()}  className="bg-green-500 text-white ps-2 pe-2 pt-1 pb-1">Add New Manager</button></div>
             </div>
             <div className="mt-3">
             {managerList.length>0 ?
                <SharedTable handleDelete={handleDelete} data={managerList} usedrole ="manager" handleEditadmindetails={handleEditadmindetails}/>
              :
              <div className="text-center">No Record Found</div>
             }
             </div>
                {showModal &&
                <Modal
                modalTitle={`${modalTitle} Manager`}
                handleSubmit={handleSubmit}
                setShowModal={setShowModal}
                handleClose={handleClose}

                >
                <form  className="mt-3 space-y-4">
            
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
                            value={signUpdata.firstName} 
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
                            value={signUpdata.lastName} 
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
                            value={signUpdata.email}
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
            

            
                </div>
                <div className="grid grid-cols-2 gap-4 ">
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
            
                </div>
                </form>
                </Modal>
                }
            </div>
        </Layout>
        </>
    )

}

export default ManagerList; 