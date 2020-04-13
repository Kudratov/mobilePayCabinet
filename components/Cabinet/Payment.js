import React, { Component } from 'react';
import Link from 'next/link';

class CabinetPayment extends Component {
    render() {
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="row">
                        
                        <div className="col-md-6">
                            <h2>To'lov</h2>
                            <p>Har qanday online kartasi bilan</p>
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <form className="form-inline">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                <div className="selected-payments">
                    <div className="row">
                        <div className="col">
                            <h5>Saqlangan to'lovlar</h5>
                        </div>
                    </div>
                </div>
                <div className="selected-payments">
                    <div className="row">
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text">+9989566253</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="selected-payments">
                    <div className="row">
                        <div className="col">
                            <h5>Ko'p qo'llaniladiganlar</h5>
                        </div>
                    </div>
                </div>
                <div className="selected-payments">
                    <div className="row">
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
                </section>
        );
    }
}

export default CabinetPayment;