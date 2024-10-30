import React, { useState } from 'react';
import { FaInstagram } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({name:"" , email: "", password: "" });

  const handleChangeEmail = (e) => {
    setData((prev) => ({ ...prev, email: e.target.value }));
  };
  const handleChangeName = (e) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangePassword = (e) => {
    setData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleRouter = () => {
    if (!data.email || !data.password) {
      alert("Enter all fields");
    } else {
      window.localStorage.setItem("userdata", JSON.stringify(data));
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaInstagram color='pink' className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Registration
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <label htmlFor="email" className="block text-sm font-medium text-gray-900">
         Name
        </label>
        <input
          id="name"
          name="name"
          type="name"
          onChange={handleChangeName}
          required
          autoComplete="name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
        />
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChangeEmail}
          required
          autoComplete="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mt-4">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={handleChangePassword}
          autoComplete="current-password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
        />
        <button
          onClick={handleRouter}
          className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 mt-6 text-sm font-semibold text-white shadow-sm"
        >
          Submit
        </button>
        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account?{' '}
          <Link to="/" className="font-semibold text-pink-600 hover:text-pink-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
