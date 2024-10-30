import React, { useEffect, useState } from 'react';
import { FaInstagram } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [authenticated, setAuthenticated] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setData((prev) => ({ ...prev, email }));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setData((prev) => ({ ...prev, password }));
  };

  const storedUserData = JSON.parse(window.localStorage.getItem("userdata"));

  useEffect(() => {
    if (data.email && data.password) {
      setAuthenticated(
        storedUserData &&
        storedUserData.email.trim() === data.email.trim() &&
        storedUserData.password.trim() === data.password.trim()
      );
    }
  }, [data, storedUserData]);

  const handleSubmit = () => {
    if (authenticated) {
      console.log("Matched");
      navigate('/home');
      setData({email: "", password: "" })
    } else {
      if(storedUserData){
        alert(
        
          storedUserData.email.trim() !== data.email.trim()
            ? "Email not valid"
            : "Password not valid"
        );
      } else{
         alert("User Not Foud  Registrate User")
      }
     
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaInstagram color='pink' className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Login Page
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={handleEmailChange}
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 mt-4">
            Password
          </label>
          <input
            onChange={handlePasswordChange}
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
          />
          <button
            onClick={handleSubmit}
            className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 mt-6 text-sm font-semibold text-white shadow-sm"
          >
            Sign in
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/Registration" className="font-semibold text-pink-600 hover:text-pink-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
