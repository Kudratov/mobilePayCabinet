import React, { Component } from 'react';
import Link from 'next/link';

import Categories from './../../store/categories.json';

class CabinetPayment extends Component {

    render() {
        return (
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 className="text-5 font-weight-400 mb-4">Payments <span className="text-muted text-4">(aviable merchants)</span></h3>
                    <div>
                                <div className="brands-grid separator-border bg-white">
                                <div className="row align-items-center">

                                {Categories.categories && 
                                    <>
                                    {Categories.categories.map((element, i) => {
                                        return (
                                            <>

                                    <div className="col-md-4 col-sm-6 col-lg-3 col-6 text-center logo-src-payment"><Link><a href><img className="img-fluid logo-img-payment" src={element.url ? element.url : "./../../images/payment/pay_mobile.png"} alt="Brands" /><br/><span className="payment-name">{element.name}</span></a></Link></div>
                                


                            </>
                            )
                            })}                        
                            </>
                            }

                                </div>
                                </div>
                    </div>
                    </div>
                </div>
        );
    }
}

export default CabinetPayment;
