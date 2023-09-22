import React, { useRef, useState, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = (props) => {

    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options)
    let data = useCart();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef()
    
    const handleAddToCart = async () => {
        let food = [];
        for (const item of data){
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({type:"UPDATE", id: props.foodItem._id,price:finalPrice, qty: qty})
                return
            }else if (food.size !== size) {
                await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty, size: size,img:props.foodItem.img})
                return;
            }
            return;
        }
        await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty, size: size,img:props.foodItem.img})
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div className="card mt-3 d-flex" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} id='card-img' className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">Some quick example text to build.</p>
                    <div className='container w-100'>
                        <div className='d-flex'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select ref={priceRef} className='m-2 h-100 bg-success rounded' onChange={(e)=> setSize(e.target.value)}>
                            {priceOptions.map((item) => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>

                        <div className='d-inline mt-2 h-100 fs-6'>
                            Rs.{finalPrice}/-
                        </div>
                        </div>
                        <hr />

                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card