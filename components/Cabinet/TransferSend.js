import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';

import {addRecieverInfo, addTransferAmount} from './../../store/actions/cartActions';

import {url} from './../../store/urls';

class CabinetTransfer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cardHolder: '',
            amount: ''
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleCardNumber (e) {
        e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        let cardNumber = e.target.value;
        if(cardNumber.length === 19) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url = `${url}p2p-api/v1.0/receiverdetails/${cardNumber.replace(/\s+/g, "")}`
            axios.get(`${__url}`, {headers: headers})
            .then((response) => {
                let __expiresOn = response.data.expiresOn.substring(4,6) + response.data.expiresOn.substring(2,4);
                this.props.dispatch(addRecieverInfo(`${response.data.cardNumber}-${__expiresOn}-${response.data.cardholderFullName}`));
                this.setState({cardHolder: response.data.cardholderFullName})
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    handleAmount (e) {
        let amount = e.target.value;
        this.props.dispatch(addTransferAmount(amount))
        this.setState({amount: amount.replace(/\s+/g, "")})
    }

    handleSend () {
        Router.push('/cabinet-transfer-checkout');
    }

    render() {
        let active_btn_for_send = this.props.url === "send" ? "is-active-button-active" : "";
        let active_btn_for_ask = this.props.url === "ask" ? "is-active-button-active" : "";
        let active_btn_for_tomycards = this.props.url === "tomycards" ? "is-active-button-active" : "";
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="row">                        
                        <div className="col-md-6">
                            <h2>Перевод с карты на карту</h2>
                            <p>Стоимость услуги 0%</p>
                        </div>

                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-4 col-xl-4">
                                <Link href="/cabinet-transfer-send">
                                    <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_send}`}>Перевести деньги</a>
                                </Link>
                            </div>
                            <div className="col-4 col-xl-4">
                                <Link href="/cabinet-transfer-ask">
                                    <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_ask}`}>Запросить деньги</a>
                                </Link>
                            </div>
                            <div className="col-4 col-xl-4">
                                <Link href="/cabinet-transfer-tomycards">
                                    <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_tomycards}`}>Перевод на мою карту</a>
                                </Link>
                            </div>
                        </div>
                    </div>                    
                <div className="money-sent">
                <div className="py-4 px-sm-3 row">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-5 m-auto m-lg-0">
                                        <div className="form-group">
                                            <label htmlFor="number">Номер карты</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text icon-for-card"><i class="far fa-credit-card icon-credit-card-in-span"></i></span>
                                                </div>
                                                <input type="text" className="form-control" maxLength="19" onChange={(e) => this.handleCardNumber(e)} pattern="^[0-9]{16}$" placeholder="0000 0000 0000 0000"/>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text icon-for-card"><i class="fas fa-id-card icon-credit-card-in-span"></i></span>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-5 m-auto m-lg-0">
                                        <div className="form-group">
                                            <label htmlFor="number">Сумма перевода</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text icon-for-card"><i class="fas fa-paper-plane icon-credit-card-in-span"></i></span>
                                                </div>
                                                <input type="text" className="form-control" maxLength="19" onChange={(e) => this.handleAmount(e)} pattern="^[0-9]{16}$" placeholder="Введите сумму"/>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text icon-for-card-text">сум</span>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-10 col-md-2 m-auto m-lg-0">
                                        <div className="form-group">
                                            <a className="btn-add-card-cards" onClick={this.handleSend}>Перевести</a>
                                        </div>                                        
                                    </div>
                                    {this.state.cardHolder && 
                                        <div className="col-12 col-sm-10 col-md-5 m-auto m-lg-0">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex">
                                                <span>Владелец:</span>
                                                <span className="pl-2 text-truncate">{this.state.cardHolder}</span>
                                            </div>
                                        </div>
                                    </div>
                                    }
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
        token: state.authToken
    }
}

export default connect(mapStateToProps)(CabinetTransfer);