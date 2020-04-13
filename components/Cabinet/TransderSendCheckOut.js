import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';

class CabinetTransferCheckOut extends Component {
    constructor (props) {
        super(props);
        this.state = {
            transferStatus: 'fa-clock',
            cardId: ''
        }
        this.handleSend = this.handleSend.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleCardId = this.handleCardId.bind(this);
    }

    componentDidMount () {
        if(this.props.token && this.props.pNumber){
            let pNumber1 = this.props.pNumber.substring(1);
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            if(pNumber1){
                let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards`
                axios.get(`${__url}`, {headers: headers})
                .then((response) => {
                    this.props.dispatch(addCard(response.data));
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        } else if(!this.props.token && !this.props.pNumber) {
            if(JSON.parse(localStorage.getItem('user-credentials')).token.length && JSON.parse(localStorage.getItem('user-credentials')).pNumber.length){
                this.props.dispatch(addAuthtoken(JSON.parse(localStorage.getItem('user-credentials')).token));
                this.props.dispatch(addPhoneNumber(JSON.parse(localStorage.getItem('user-credentials')).pNumber));
                let pNumber1 = JSON.parse(localStorage.getItem('user-credentials')).pNumber.substring(1);
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-credentials')).token}`
                }
                if(pNumber1){
                    let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards`
                    axios.get(`${__url}`, {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addCard(response.data));
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            } else{
                Router.push('/');
            }
        }
    }

    handleCardId({id}){
        console.log(this.state.cardId);
        this.setState({cardId: id});
        console.log(this.state.cardId);
    }

    handleGoBack() {
        Router.push('/cabinet-transfer-send');
    }

    getCardOwenerCardNum() {
        let recieverInf = this.props.recieverInfo.split('-');
        return recieverInf[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    getCardOwenerName () {
        let recieverInf = this.props.recieverInfo.split('-');
        return recieverInf[2];
    }

    handleSend (e) {
        let elementId = document.getElementsByClassName('carousel-background-color active');
        let id = elementId[0].id;
        let recieverInf = this.props.recieverInfo.split('-');
        let __amout = this.props.transferAmount;
        let transferBtn = document.getElementById("transfer-button");
        let goBackBtn = document.getElementById("display-success-error");
        let data = {
            receiverCardNumber: recieverInf[0],
            amout: __amout.replace(/\s+/g, ""),
            cardProduct: 'UzCard',
            receiverCardNumberExpiresOn: recieverInf[1],
            receiverFullName: recieverInf[2]
        }
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        let __url = `${url}p2p-api/v1.0/cards/${id}/fundstransfer`;
            axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                transferBtn.classList.remove("display-true-class");        
                goBackBtn.classList.remove("display-false-class");

                transferBtn.classList.add("display-false-class");        
                goBackBtn.classList.add("display-true-class");  
                let pNumber1 = this.props.pNumber.substring(1);
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${this.props.token}`
                }
                if(pNumber1){
                    let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards`
                    axios.get(`${__url}`, {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addCard(response.data));
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
                this.setState({transferStatus: "fa-check"});
            })
            .catch((error) => {
                transferBtn.classList.remove("display-true-class");        
                goBackBtn.classList.remove("display-false-class");

                transferBtn.classList.add("display-false-class");        
                goBackBtn.classList.add("display-true-class");
                this.setState({transferStatus: "fa-times"});
            })
    }

    render() {
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="container">
                        <div className="row align-items-center carousel-background">
                            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 p-3 p-sm-5 mx-auto mr-lg-0 shadow-dark bg-color checkout-info">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="d-flex justify-content-center mx-auto">
                                        <div className="logo"></div>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <span className="font-color-light text-white">Bankname</span>
                                </div>
                                <div className="d-flex pb-2">
                                    <span></span>
                                </div>
                                <div className="d-flex">
                                    <span className="mr-auto pr-2 text-truncate">
                                        <p className="text-decoration-none text-white">Карта получателя:</p>
                                    </span>
                                    <span className="ml-auto text-right text-truncate">
                                        <p className="text-decoration-none text-white">{this.getCardOwenerCardNum()}</p>
                                    </span>
                                </div>
                                <div className="d-flex">
                                    <span className="mr-auto pr-2 text-truncate">
                                        <p className="text-decoration-none text-white">Получатель:</p>
                                    </span>
                                    <span className="ml-auto text-right text-truncate">
                                        <p className="text-decoration-none text-white">{this.getCardOwenerName()}</p>
                                    </span>
                                </div>
                                <div className="d-flex align-items-center mt-2 pt-2 bt">
                                    <span className="mr-auto pr-2 text-white">Стоимость услуги:</span>
                                    <span className="pr-2 text-white">0</span>
                                    <span className="text-white">som</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="mr-auto pr-2 text-white">Сумма платежа:</span>
                                    <span className="pr-2 fs-20 font-weight-semibold text-white">{this.props.transferAmount}</span>
                                    <span className="text-white">som</span>
                                </div>
                                <div className="d-flex align-items-center mt-2 pt-2 bt transfer-for-case" id="transfersucces-case">
                                    <span className="mr-auto pr-2 text-white">Transfer status</span>
                                    <span className="pr-2 text-white"><i class={`fas ${this.state.transferStatus}`}></i></span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center col-sm-10 col-md-8 col-lg-6 col-xl-5 px-0 pt-4 pt-lg-5 pb-5 mx-auto ml-lg-0 card-bg card-bg-13">
                                <div className="w-100">
                                    <div>
                                        <h4 className="d-none d-sm-block mb-4 text-center text-white">Карта для оплаты</h4>

                                        <div id="carouselExampleIndicators" className="carousel slide slide-for-card-select" data-ride="carousel" data-interval="false">
                                        {/* Begin Loop */}

                                        {this.props.cards && 
                                            <>
                                            {this.props.cards.map((element, i) => {
                                                return (<>

                                            <ol key={element.id} className="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to={i} className={i === 0 ? "active" : ""} />
                                            </ol>

                                            </>)
                                            })}                        
                                        </>}
                                            <div className="carousel-inner">

                                            {this.props.cards && 
                                            <>
                                            {this.props.cards.map((element, i) => {
                                                return (<>
                                                    
                                                <div key={element.id} id={element.id} className={element.isMainCard ? `carousel-item carousel-background-color active` : `carousel-item carousel-background-color`}>
                                                    <div className="d-flex flex-column mx-auto px-3 py-2 px-sm-4 py-sm-3 text-white text-shadow card-item shadow-card card-in-cards-chekout">
                                                        <div className="d-flex align-items-center mb-2 mb-sm-3">
                                                            <span className="card-logo p-2">{element.cardProduct.name}</span>
                                                            <div className="card-card-poz p-2">
                                                                <span>{element.isMainCard ? "Основная карта" : "Secondary Card"}</span>
                                                            </div>                                                        
                                                        </div>
                                                        <div className="text-truncate d-flex justify-content-start">Баланс</div>
                                                        <div className="mt-auto font-weight-light fs-29 d-flex justify-content-start">{element.balance}
                                                            <span className="fs-12">sum</span>
                                                        </div>
                                                        <div className="mt-auto text-truncate d-flex justify-content-start">{element.cardProduct.name}</div>
                                                        <div className="d-flex">
                                                            <div className="mr-auto">{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()}</div>
                                                            <div>{element.expiresOn ? element.expiresOn.substring(0,2) + "/" + element.expiresOn.substring(2) : ''}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                    </>)
                                                })}                        
                                            </>}

                                            </div>

                                            

                                            {/* End Loop */}

                                        {this.props.cards &&
                                            <>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon button-for-prev-next" aria-hidden="true" />
                                                <span className="sr-only carousel-control-prev-icon">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon button-for-prev-next" aria-hidden="true" />
                                                <span className="sr-only">Next</span>
                                            </a>
                                            </>}
                                        </div>

                                        <div className="mx-4 mx-sm-5 d-flex justify-content-center checkout-button">
                                            <a onClick={e => this.handleSend(e)} className="text-white checkout-button-a display-true-class" id="transfer-button">Оплатить</a>
                                            <a onClick={this.handleGoBack} className="text-white checkout-button-a display-false-class" id="display-success-error">Go back</a>
                                        </div>

                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        pNumber: state.phoneNumber,
        cards: state.cards,
        recieverInfo: state.recieverInfo,
        transferAmount: state.transferAmount
    }
}


export default connect(mapStateToProps)(CabinetTransferCheckOut);