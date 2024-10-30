import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const router = useNavigate();

    useEffect(() => {
        const storedUserData = JSON.parse(window.localStorage.getItem("userdata"));
        if (storedUserData) {
            setProfileData(storedUserData);
        } else {
            router("/");
        }
    }, [router]);

    const handleSignOut = () => {
        localStorage.removeItem("userdata");
        router("/");
    };

    return (
        <React.Fragment>
            <div className='flex justify-center flex-col h-full align-middle'> 
                <div className='text-4xl'>Profile Data</div>
                <div className='flex flex-col gap-5 mt-10'>
                    {profileData.email && (
                        <div className='flex row gap-3'>
                            <div>Email:</div>
                            <div>{profileData.email}</div>
                        </div>
                    )}
                    {profileData.password && (
                        <div className='flex row gap-3'>
                            <div>Password:</div>
                            <div>{profileData.password}</div>
                        </div>
                    )}
                 <div className='flex flex-row gap-10'>
                 <button className='flex justify-center' onClick={handleSignOut}>
                        <FaSignOutAlt size={40} color='red' />
                    </button>
                    <button className='flex justify-center' onClick={()=>{router("/home")}}>
                        <IoMdArrowBack size={40} color='red' />
                    </button>
                 </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
};

export default Profile;
