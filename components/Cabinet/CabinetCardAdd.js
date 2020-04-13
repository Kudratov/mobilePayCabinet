import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

import {addCardCredentails} from './../../store/actions/cartActions';
import {url} from './../../store/urls';

class CabinetCardAdd extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cardType: 'Unknown',
            cardPosition: '',
            cardId: '',
            cardName: '',
            cardNumber: '',
            realCardNumber: '',
            cardExp: '',
            realCardExp: '',
            smsCode: ''
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExp = this.handleCardExp.bind(this);
        this.handleCardName = this.handleCardName.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleSmsCode = this.handleSmsCode.bind(this);
        this.handleSmsValue = this.handleSmsValue.bind(this);
        this.handleShowPhNum = this.handleShowPhNum.bind(this);
    }

    handleDeleteCard (e) {
        console.log("delete");
    }

    handleShowPhNum () {
        let info = this.props.cardCred.split(' ');
        return info[1];
    }

    handleSmsValue (e) {
        let __smsCode = e.target.value;
        if(__smsCode){
            this.setState({smsCode: __smsCode})
        }
    }

    handleSmsCode (e) {
        let __smsCode = this.state.smsCode;
        let elementDisplayFoAddCardDv = document.getElementById("display-for-adding-card-div");
        let elementDisplayFoAddCardFm = document.getElementById("display-for-adding-card-frm");
        let elementDisplayFoSmsSendFm = document.getElementById("id-for-confirm-sms");
        let data = {
            code: __smsCode
        }
        let pNumber1 = this.props.pNumber
        let info = this.props.cardCred.split(' ');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        if(pNumber1){
            let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards/${info[0]}/verify`;
            axios.put(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    elementDisplayFoAddCardFm.classList.remove("display-false-class");
                    elementDisplayFoAddCardDv.classList.remove("display-false-class");
                    elementDisplayFoSmsSendFm.classList.remove("display-true-class");

                    elementDisplayFoAddCardFm.classList.add("display-true-class");
                    elementDisplayFoAddCardDv.classList.add("display-true-class");
                    elementDisplayFoSmsSendFm.classList.add("display-false-class");

                    Router.push('/cabinet-cards');
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    handleAddCard () {
        let elementDisplayFoAddCardDv = document.getElementById("display-for-adding-card-div");
        let elementDisplayFoAddCardFm = document.getElementById("display-for-adding-card-frm");
        let elementDisplayFoSmsSendFm = document.getElementById("id-for-confirm-sms");
        let realN = this.state.realCardNumber;
        let realE = this.state.realCardExp;
        let realT = this.state.cardType;
        let pNumber1 = this.props.pNumber;
        if(realN && realE && realT && pNumber1){
            let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards`;
            let data = {
                cardNumber: realN,
                expiresOn: realE,
                cardProduct: realT
            }
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
                .then((response) => {
                    if(response.status === 201){
                        this.props.dispatch(addCardCredentails(response.data.id, response.data.ownerPhoneNumber));
                        elementDisplayFoAddCardDv.classList.add("display-false-class");
                        elementDisplayFoAddCardFm.classList.add("display-false-class");
                        elementDisplayFoSmsSendFm.classList.remove("display-false-class");
                        elementDisplayFoSmsSendFm.classList.add("display-true-class");
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    handleCardName (e) {
        let cardName = e.target.value;
        this.setState({cardName: cardName});
    }

    handleCardExp (e) {
        let cardExpI = e.target.value;
        if(cardExpI.length === 4){
            this.setState({realCardExp: cardExpI})
            this.setState({cardExp: cardExpI.substring(0,2)  + "/" + cardExpI.substring(2)})
        }
    }

    handleCardNumber (e) {
        e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        let cardNumber1 = e.target.value;
        let cardNumber = e.target.value;
        this.setState({ cardNumber: cardNumber});
        if(cardNumber.length){
            cardNumber1 = cardNumber1.split(' ');
            if(cardNumber1.includes('8600')){
                this.setState({cardType: "UzCard"})
                this.setState({ cardNumber: cardNumber});
            } else if (cardNumber1.includes('9860')){
                this.setState({cardType: "Humo"})
            }
        }
        this.setState({ cardNumber: cardNumber});
        this.setState({realCardNumber: cardNumber.replace(/\s+/g, "")})
    }

    render(){
        return (
            <section className="ptb-1001 container-fluid clearfix">
                <div className="row">                        
                    <div className="col-md-6">
                        <h2>Добавить карту</h2>
                    </div>
                </div>
                <div className="row margin-for-row">                    
                    <div className="card-card-info display-true-class" id="display-for-adding-card-div">
                        <div className="card-in-cards">
                            <div className="card-info-cards d-flex">
                                <span className="card-logo p-2">
                                    {this.state.cardType}
                                </span>
                                <div className="card-card-poz p-2">
                                    <span>{this.state.cardPosition}</span>
                                </div>
                            </div>
                            <div className="card-bank-name-add">{this.state.cardName ? this.state.cardName : "Card Name"}</div>
                            <div className="card-card-credentials d-flex">
                                <div className="card-card-number mr-auto">{this.state.cardNumber ? this.state.cardNumber : "0000 0000 0000 0000"}</div>
                                <div className="card-card-exp ml-auto">{this.state.cardExp}</div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <form className="display-true-class" id="display-for-adding-card-frm">
                        <div className="py-4 px-sm-3 row">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-6 m-auto m-lg-0">
                                        <div className="form-group">
                                            <label htmlFor="number">Номер карты</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text icon-for-card"><i class="far fa-credit-card icon-credit-card-in-span"></i></span>
                                                </div>
                                                <input type="text" className="form-control" maxLength="19" onChange={(e) => this.handleCardNumber(e)} pattern="^[0-9]{16}$" placeholder="0000 0000 0000 0000"/>
                                                <input type="text" className="form-control card-expry-num" maxLength="4" onChange={(e) => this.handleCardExp(e)} placeholder="oy/yil"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-4 m-auto m-lg-0">
                                        <div className="form-group mb-0">
                                            <label htmlFor="name">Название карты</label>
                                            <input className="form-control" maxLength="26" onChange={(e) => this.handleCardName(e)} placeholder="Введите название карты"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-2 m-auto m-lg-0">
                                        <div className="form-group">
                                            <a className="btn-add-card-cards" onClick={this.handleAddCard}>Добавить</a>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="container">
                            <div className="row d-flex justify-content-center" id="id-for-confirm-sms-div">
                                <form className="display-false-class" id="id-for-confirm-sms">
                                    <div className="py-4 px-sm-3 row">
                                        <div className="container-fluid">
                                            <div className="col-sm-12 mx-auto">
                                                <div className="form-group">
                                                    <label htmlFor="code">Insert the sms code</label>
                                                    <div className="input-group">
                                                        <input className="form-control" onChange={this.handleSmsValue} type="text" maxLength="4" placeholder="----" pattern="^[0-9]{4}$" />
                                                    </div>
                                                </div>
                                                <p className="text-center">Sms sent</p>
                                                <p className="text-center">{this.handleShowPhNum()}</p>
                                                <div className="row">
                                                    <div className="col-12 d-flex justify-content-center">
                                                        <a onClick={(e) => this.handleSmsCode(e)} className="btn-add-card-cards mt-30">Confirm</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </section>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        pNumber: state.phoneNumber,
        cardCred: state.cardCred
    }
}

export default connect(mapStateToProps)(CabinetCardAdd);