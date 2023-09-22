import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyOrder = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/myOrderData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setOrderData((prevOrderData) => data.orderData.order_data || prevOrderData);
            setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
            console.error("API Error:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    }, []);


    useEffect(() => {
        fetchMyOrder();
    }, [fetchMyOrder]);


    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className="row">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        orderData.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orderData.map((orderArray, index) => (
                                <div key={`order-${index}`}>
                                    {orderArray.map((arrayData, innerIndex) => (
                                        <div key={`order-${index}-item-${innerIndex}`}>
                                            {arrayData.Order_date && (
                                                <div className='m-auto mt-5'>
                                                    {(arrayData.Order_date)}
                                                    <hr />
                                                </div>
                                            )}
                                            {!arrayData.Order_date && (
                                                <div className='col-12 col-md-6 col-lg-3'>
                                                    <div key={arrayData.id} className='card mt-3' style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={arrayData.img || 'error-image-url'} alt="..." className='card-img-top' style={{ height: "120px", width: "100%" }} />
                                                        <div className='card-body'>
                                                            <h5 className='card-title'>{arrayData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{arrayData.qty}</span>
                                                                <span className='m-1'>{arrayData.size}</span>
                                                                {/* <span className='m-1'>{arrayData.Order_date}</span> */}
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    Rs.{arrayData.price || '-'} /-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default MyOrder;
