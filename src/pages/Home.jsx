import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setfoodCategory] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        let response = await fetch("http://localhost:8080/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItems(response[0]);
        setfoodCategory(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{objectFit:"contain !important"}}>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                <div className="carousel-inner" id='carousal'>
                    <div className='carousel-caption' style={{"zIndex":"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/700×500/?burger" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/700×500/?momos" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/700×500/?pizza" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..." />
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            </div>
            <div className='container'>
                {foodCategory.length > 0 ? foodCategory.map((itemCat) => (
                    <div className='row mb-3' key={itemCat._id}>
                        <div className='fs-3 m-3'>
                            {itemCat.CategoryName}
                        </div>
                        <hr />
                        {foodItems.length > 0 ? foodItems
                            .filter((item) => (
                                item.CategoryName === itemCat.CategoryName &&
                                item.name.toLowerCase().includes(search.toLowerCase())
                            ))
                            .map(filterItems => (
                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                    <Card
                                        foodItem={filterItems}
                                        options={filterItems.options[0]}
                                    />
                                </div>
                            ))
                            : <p>No Such Data Found</p>}
                    </div>
                )) : <></>}
            </div>
            <Footer />
        </>
    );
};

export default Home;
