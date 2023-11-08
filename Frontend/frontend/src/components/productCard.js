import React, { startTransition } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'


export const ProductCard = (props) => {
    return (
        <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
            <div className="card">
                <img src={props.imageSrc}
                    className="card-img-top" alt="Product" />
                <div className="card-body">

                    <div className="d-flex justify-content-between mb-3">
                        <Link To={props.productUrl}><h5 className="mb-0">{props.title}</h5></Link>
                        <h5 className="text-dark mb-0">{props.price}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Available: <span className="fw-bold">{props.quantityAvailable}</span></p>
                        <div className="d-flex flex-row">
                        <Rating initialValue={props.rating} readonly />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
