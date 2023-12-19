import React, { useEffect, useState, useContext,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { auth } from "../../../utils/config";
import { AthentificationToken } from "../../../utils/config";
import useOutsideClick from "../../../hooks/useoutsideclick";


const Header = () => {
    const profileRef = useRef();
    const [profileBar, setProfilebar] = useState(false);
    const { token, setToken } = useContext(AthentificationToken);
    useOutsideClick(profileRef,setProfilebar)




    const navigate = useNavigate();
    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('secure-token');
        navigate('/');
        // window.location.reload();
    }

    return (
        <>
            <nav className="bg-gray-800 fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700" >
                <div className=" bg-gray-800">
                    <div className="pl-3 pr-3">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* <button type="button" onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button> */}
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    {/* <div className="flex space-x-4">
                                        <a className=" bg-gray-800 hover:bg-gray-700 text-white rounded-md px-7 py-2 text-sm font-medium" aria-current="page" onClick={(e) => handleSettitle("home")}>Home</a>
                                        <a className=" bg-gray-800 text-white hover:bg-gray-700 hover:text-white rounded-md px-7 py-2 text-sm font-medium" onClick={() => handleSettitle("products")}>MarketPlace</a>
                                        {cartData?.cartproducts?.length > 0 && <a className=" bg-gray-800 text-white hover:bg-gray-700 hover:text-white rounded-md px-7 py-2 text-sm font-medium" onClick={() => handleSettitle("cart")}> Go to cart</a>}
                                        <a className=" bg-gray-800 text-white hover:bg-gray-700 hover:text-white rounded-md px-7 py-2 text-sm font-medium"></a>
                                        {role == "admin" && <a className=" bg-gray-800 text-white hover:bg-gray-700 hover:text-white rounded-md px-7 py-2 text-sm font-medium" onClick={() => handleSettitle("addproduct")}>Add Product</a>}
                                    </div> */}
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                </button>


                                <div className="relative ml-3" ref={profileRef}>
                                    <div>
                                        <button type="button" onClick={() => profileBar ? setProfilebar(false) : setProfilebar(true)} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>
                                    {profileBar &&
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                            <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                                            <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                                            <a className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={() => handleLogout()}>Logout</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;