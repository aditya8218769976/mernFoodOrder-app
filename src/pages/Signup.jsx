import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const navigate = useNavigate()

    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        console.log("response---",response);
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        navigate("/")
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input value={credentials.name} onChange={onChange} name='name' type="text" className="form-control" id="exampleInputName1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={onChange} value={credentials.email} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={onChange} value={credentials.password} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                        <input onChange={onChange} value={credentials.geolocation} name='geolocation' type="text" className="form-control" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                    <Link to="/" className='m-3 btn btn-danger'>Go to Homepage</Link>
                </form>
            </div>
        </>
    )
}

export default Signup