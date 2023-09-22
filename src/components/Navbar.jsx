import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';
const Navbar = () => {

    const [cartView, setCartView] = useState(false);
    let data = useCart()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/")
    }


    return (
        < >
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">Food-Delicious</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : <></>}
                        </ul>
                        {!localStorage.getItem("authToken") ? <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" aria-current="page" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                        </div> : <>

                            <div className='btn bg-white text-success mx-2' onClick={()=> setCartView(true)}>
                                MyCart{" "}
                                {<Badge pill bg='danger'>{data.length}</Badge>}
                            </div>
                            {cartView ? <Modal onClose={()=> setCartView(false)}><Cart /></Modal>:null}
                            <div onClick={handleLogout} className='btn bg-white text-danger mx-2'>LogOut</div>
                        </>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar