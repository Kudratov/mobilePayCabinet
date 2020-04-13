import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Main extends Component {

    constructor () {
        super();
        this.state = {
          showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
      }
      
      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

      afterOpenModal () {
          //
      }

      handleOpenModal () {
        this.setState({ showModal: true });
      }

    render() {
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="row">                        
                        <div className="col-md-6">
                            <h2>Kartadan kartaga pul o'tkazish</h2>
                            <p>Xizmat narxi</p>
                        </div>
                    </div>
                <div className="phone-payment d-flex row">
                        <div className="container-fluid">
                            <form className="">
                                <div className="row phone-payment-form-main d-flex justify-content-center form-inline-payment">
                                    <div className="col-phone col-12 col-sm-12 col-md-4 m-auto m-lg-0">
                                        <label className="d-flex justify-content-start">Phone Number</label>
                                        <div className="form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text beginning-phone-num">+998</span>
                                                <input type="text" className="form-control form-inline-input body-phone-num" placeholder="--- -- --"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-amount col-12 col-sm-12 col-md-4 m-auto m-lg-0">
                                        <label className="d-flex justify-content-start">Amount of money</label>
                                        <div className="form-group">
                                            <div className="input-group-append">
                                                <input type="text" className="form-control form-inline-input body-amount" placeholder="Summani kiriting"/>
                                                <span className="input-group-text end-amount">So'm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-button col-12 col-sm-12 col-md-4 m-auto m-lg-0">
                                        <input type="submit" className="form-control form-inline-button-submit"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                <div className="selected-payments">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Saralanga to'lovlar</h3>
                        </div>
                    </div>
                </div>
                <div className="selected-payments row">
                    <a className="selected-payments-main" onClick={this.handleOpenModal}>
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text">Mening raqamim +9989566253</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a className="selected-payments-main">
                        <div className="col">
                            <div className="card div-card-img">
                                <img className="card-img-top" alt="Card image" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png"/>
                                <div className="card-body">
                                    <p className="card-text">Mening raqamim +9989566253</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        );
    }
}

export default withRouter(Main);
