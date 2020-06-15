import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {connect} from 'react-redux';

import MobilePayment from './../../store/mobilepayment.json';
import Languages from './../../store/languages.json';

import {url} from './../../store/urls';

import {addRecieverInfo} from './../../store/actions/cartActions';

class CabinetMobilePayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            providerList: [],
            serviceList: [],
            merchantList: [],
            imgUrl: '',
            serviceID: '',
            phoneNumber: '998',
            amount: ''
        }
    }

    componentDidMount () {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        axios.get(`${url}payments-api/v1.0/references/paynet/providers`, {headers: headers})
            .then(response => {
                let mobileP = response.data.providers.filter(element => {
                    return element.categoryId === '1'
                })
                this.setState({providerList: mobileP})
                this.state.providerList.length = 5;
                // console.log(mobileP)
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(`${url}payments-api/v1.0/references/paynet/services`, {headers: headers})
                .then(response => {
                    let mobileS = response.data.services.filter(element => {
                        return element.categoryId === '1' && (element.name === 'Оплата' || element.name === 'GSM - Оплата')
                    })
                    this.setState({serviceList: mobileS})     
                })
                .catch(error => {
                    console.log(error)
                })
            axios.get(`${url}payments-api/v1.0/references/paynet/merchants`, {headers: headers})
                .then(response => {
                    let mobileM = response.data.merchants.filter(element => {
                        return element.categoryId === '1'
                    })
                    this.setState({merchantList: mobileM})
                })
                .catch(error => {
                    console.log(error)
                })
            // console.log(this.state.merchantList.find(element1 => element1.paymentServiceId === this.state.serviceList.find(element2 => element2.providerId === '44').id).id)
    }

    getUrl(id){
        let serviceList = this.state.serviceList;
        let merchantList = this.state.merchantList;
        let serviceId = serviceList.find(element => element.providerId === `${id}`);
        if(serviceId != undefined){
            let merchantId = merchantList.find(element => element.paymentServiceId === serviceId.id)
            if(merchantId != undefined){
                return merchantId.id;
            }
        }
    }

    getServiceID(id){
        let serviceList = this.state.serviceList;
        let merchantList = this.state.merchantList;
        let serviceId = serviceList.find(element => element.providerId === `${id}`);
        if(serviceId != undefined){
            let merchantId = merchantList.find(element => element.paymentServiceId === serviceId.id)
            if(merchantId != undefined){
                return merchantId.paymentServiceId;
            }
        }
    }

    setModal(e) {
        this.setState({phoneNumber: '998'});
        this.setState({amount: ''})
        let imgURL = e.target.alt.split('-')[0];
        let serviceID = e.target.alt.split('-')[1];
        this.setState({imgUrl: imgURL});
        this.setState({serviceID: serviceID});
    }

    handlePhone (e) {        
        const phoneNum = e.target.value.replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        this.setState({phoneNumber: phoneNum});
        console.log(phoneNum.replace(/[^\d]/g, ""))
    }

    handleAmount (e) {
        let amount = e.target.value;
        this.setState({amount: amount});
        let tag = document.getElementById("send-money-btn");       
        if(this.state.amount.length >= 0){
            tag.classList.remove("disactive");
        } else {
            tag.classList.add("disactive");
        }
    }

    render() {
        return (
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 className="text-5 font-weight-400 mb-4">{Languages.page.cabenet_payment[this.props.language].t1} <span className="text-muted text-4"></span></h3>
                    <div>
                                <div className="brands-grid separator-border bg-white">
                                <div className="row align-items-center">

                                {this.state.providerList && 
                                    <>
                                    {this.state.providerList.map((element, i) => {
                                        return (
                                            <>

                                    <div key={i} className="col-md-4 col-sm-6 col-lg-3 col-6 text-center logo-src-payment"><Link><a data-target="#mobile-payment" onClick={e => this.setModal(e)} data-toggle="modal"><img className="img-fluid logo-img-mobile-payment" src={`http://194.58.121.217:5020/files/serviceproviders/${this.getUrl(element.id)}.png`} alt={this.getUrl(element.id) && this.getServiceID(element.id) != "undefined" ? `${this.getUrl(element.id)}-${this.getServiceID(element.id)}`: "Brands"} /><br/><span className="payment-name"></span></a></Link></div>
                                


                                            </>
                            )
                            })}                        
                            </>
                            }

                                </div>
                                </div>
                    </div>
                    </div>

                    <div id="mobile-payment" className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-400">Oplata mobile</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                        </div>
                        <div className="modal-body p-4">
                        <div className="d-flex justify-content-center">
                        <h6 className=""><img className="img-fluid logo-img-mobile-payment" src={`http://194.58.121.217:5020/files/serviceproviders/${this.state.imgUrl}.png`} alt="Brands" /></h6>
                        </div>                        
                            <form id="addCard">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Phone Number</label>
                                <input type="text" className="form-control" data-bv-field="cardnumber" onChange={e => this.handlePhone(e)} value={`+${this.state.phoneNumber}`} id="cardNumber" maxLength="17" pattern="^[0-9]{16}$" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardHolderName">Amount</label>
                                <input type="text" className="form-control" value={this.state.amount} onChange={e => handleAmount(e)} placeholder="Amount" />
                            </div>
                            <a className="btn btn-primary btn-block card-add-f-btn text-white" id="send-money-btn" data-toggle="modal" type="submit">Pay</a>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                        

                </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(CabinetMobilePayment);