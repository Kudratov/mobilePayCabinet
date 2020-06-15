import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {connect} from 'react-redux';

import HomePayment from './../../store/homepayment.json';
import Languages from './../../store/languages.json';
import {url} from './../../store/urls';

class CabinetHomePayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            providerList: [],
            serviceList: [],
            merchantList: []
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
                    return element.categoryId === '2'
                })
                this.setState({providerList: mobileP})
                this.state.providerList.length = 5;
                console.log(mobileP)
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(`${url}payments-api/v1.0/references/paynet/services`, {headers: headers})
                .then(response => {
                    let mobileS = response.data.services.filter(element => {
                        return element.categoryId === '2' && (element.name === 'Оплата' || element.name === 'GSM - Оплата')
                    })
                    this.setState({serviceList: mobileS})
                    // console.log(mobileS)     
                })
                .catch(error => {
                    console.log(error)
                })
            axios.get(`${url}payments-api/v1.0/references/paynet/merchants`, {headers: headers})
                .then(response => {
                    let mobileM = response.data.merchants.filter(element => {
                        return element.categoryId === '2'
                    })
                    this.setState({merchantList: mobileM})
                    // console.log(mobileM)
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

    render() {
        return (
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 className="text-5 font-weight-400 mb-4">{Languages.page.cabenet_payment[this.props.language].t1} <span className="text-muted text-4"></span></h3>
                    <div>
                                <div className="brands-grid separator-border bg-white">
                                <div className="row align-items-center">

                                {HomePayment.categories && 
                                    <>
                                    {HomePayment.categories.map((element, i) => {
                                        return (
                                            <>

                                    <div key={i} className="col-md-4 col-sm-6 col-lg-3 col-6 text-center logo-src-payment"><Link><a href><img className="img-fluid logo-img-payment" src={element.img ? element.img : "./../../images/mobilePayments/beeline.png"} alt="Brands" /><br/><span className="payment-name">{element.name}</span></a></Link></div>
                                


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

const mapStateToProps = (state)=>{
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(CabinetHomePayment);