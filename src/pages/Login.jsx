import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("credentials ---",credentials);
      const response = await fetch('http://localhost:8080/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem('authToken', data.authToken);
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={credentials.email}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={credentials.password}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/signup" className="m-3 btn btn-danger">
          Create a new Account!
        </Link>
        <Link to="/" className='m-3 btn btn-danger'>Go to Homepage</Link>
      </form>
    </div>
  );
};

export default Login;
