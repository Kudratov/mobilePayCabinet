import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';
import Toast from 'light-toast';

import ConfirmSendMoney from './ConfirmSendMoney';

import {url} from './../../store/urls';
import {addRecieverInfo, addTransferAmount, addCardIdToTransfer} from './../../store/actions/cartActions';

    import './../../assets/vendor/bootstrap-select/css/bootstrap-select.min.css';


class MoneySend extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            amount: "",
            cardID: '',
            nextPos: false,
            receiverCardNumber: '',
            receiverCardNumberExpiresOn: '',
            receiverFullName: '',
            cardProduct: 'UzCard'
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleCardSelect = this.handleCardSelect.bind(this);
        this.handleTaransfer = this.handleTaransfer.bind(this);    
        this.handleSendAgain = this.handleSendAgain.bind(this);    
    }

    handleCardNumber (e) {
        e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        let cardNumber = e.target.value;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url = `${url}p2p-api/v1.0/receiverdetails/${cardNumber.replace(/\s+/g, "")}`
            if(cardNumber.length === 19){
                axios.get(`${__url}`, {headers: headers})
                    .then((response) => {
                        let __expiresOn = response.data.expiresOn.substring(4,6) + response.data.expiresOn.substring(2,4);
                        this.setState({receiverCardNumber: response.data.cardNumber});
                        this.setState({receiverCardNumberExpiresOn: __expiresOn});
                        this.setState({receiverFullName: response.data.cardholderFullName});
                    })
                    .catch((error) => {
                        Toast.fail("Card not found", 3000);
                    })
            }
        
    }

    handleAmount (e) {
        e.target.value = e.target.value.toLocaleString().split(',').join(' ');
        let amount = e.target.value;
        let tag = document.getElementById("send-money-btn");        
        if(this.state.cardID && this.state.receiverFullName && amount.length >= 4){
            tag.classList.remove("disactive");
        } else {
            tag.classList.add("disactive");
        }
        this.setState({amount: amount});
    }

    handleCardSelect(e) {
        let cardId = e.target.value;
        this.setState({cardID: cardId});
    }

    handleSend () {
        let controllerSendMoneyConfirm = document.getElementById("controller-money-send-modal");
        controllerSendMoneyConfirm.click();
        
    }

    handleTaransfer () {
        let tag = document.getElementById("controller-money-send-modal-success");
        let data = {
            receiverCardNumber: this.state.receiverCardNumber,
            amout: this.state.amount * 1.05,
            cardProduct: this.state.cardProduct,
            receiverCardNumberExpiresOn: this.state.receiverCardNumberExpiresOn,
            receiverFullName: this.state.receiverFullName
        }
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        let __url = `${url}p2p-api/v1.0/cards/${this.state.cardID}/fundstransfer`;
            axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    tag.click();
                }
            })
            .catch((error) => {
                
            })
        }

        handleSendAgain () {
         let tag = document.getElementById("controller-modal-close-send-money-success");
         tag.click();   
        }

    render() {
        return (
            <div>
                <div id="content" className="py-4">
                <div className="container">
                <h2 className="font-weight-400 text-center mt-3">Send Money</h2>
                <p className="text-4 text-center mb-4">Send your money on anytime, anywhere in the world.</p>
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                        <h3 className="text-5 font-weight-400 mb-3">Personal Details</h3>
                        {/* Send Money Form
                    ============================================= */}
                        <form id="form-send-money" method="post">

                        <div className="form-group">
                            <label htmlFor="recipientGets">Card Number</label>
                            <div className=""> <span className="input-group-text p-0">
                            <div className="input-group-prepend"> <span className="input-group-text"><img className="ml-auto" src="./../../images/visa.png" alt="visa" title /></span> </div>

                            

                                <select data-style="custom-select border-0" onClick={this.handleCardSelect} className=" form-control bg-transparent" required>

                                <option selected="selected">Select the card</option>

                                    {this.props.cards && 
                                        <>
                                        {this.props.cards.map((element, i) => {
                                            return (
                                                <>

                                                    <option data-icon="currency-flag currency-flag-inr mr-1" data-subtext="Indian rupee" value={element.id}>{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()}</option>

                                                    </>
                                                )
                                        })}                        
                                        </>
                                    }

                                </select>


                            </span> 
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="youSend">Recipient</label>
                            <input type="text" className="form-control" maxLength="19" onChange={(e) => this.handleCardNumber(e)} placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="youSend">You Send</label>
                            <div className="input-group">
                            <input type="number" className="form-control" onChange={(e) => this.handleAmount(e)} pattern="^[0-9]{16}$" placeholder="Enter The Amount"/>
                            <div className="input-group-append"> <span className="input-group-text p-2">
                                UZS
                                </span> </div>
                            </div>
                        </div>
                        {this.state.receiverFullName && <p className="text-muted text-center">CardHolder: <span className="font-weight-500">{this.state.receiverFullName}</span></p>}
                        <hr />
                        {this.state.amount && this.state.cardID && 
                            <>
                            
                            <p className="mb-1">Total fees <span className="text-3 float-right">{(Number(this.state.amount) * 0.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                            <p className="mb-1">Send Amount <span className="text-3 float-right">{(Number(this.state.amount)).toLocaleString().split(',').join(' ')} UZS</span></p>
                            <p className="font-weight-500">Total To Pay <span className="text-3 float-right">{(Number(this.state.amount) * 1.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                        </>
                        }
                        <a className="btn btn-primary btn-block text-white card-add-f-btn disactive" id="send-money-btn" onClick={this.handleSend}>Continue</a>
                        <a className="display-false-class" id="controller-money-send-modal" data-dismiss="modal" data-target="#money-send-modal" data-toggle="modal"></a>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* SEND MONEY CONFIRM */}

            <div id="money-send-modal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-400">Send Money</h5>
                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                    </div>
                    <div className="modal-body p-4">
                        <form id="moneySend" method="post">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" rows={4} id="description" required placeholder="Payment Description" defaultValue={""} />
                        </div>
                        
                        <h3 className="text-5 font-weight-400 mb-3">Details</h3>
                        <p className="mb-1">Reciever Info <span className="text-3 float-right">{this.state.receiverFullName}</span></p>
                        <p className="mb-1">Send Amount <span className="text-3 float-right">{(Number(this.state.amount)).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <p className="mb-1">Total fees <span className="text-3 float-right">{(Number(this.state.amount) * 0.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <hr />
                        <p className="font-weight-500">Total<span className="text-3 float-right">{(Number(this.state.amount) * 1.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <a className="btn btn-primary btn-block text-white card-add-f-btn" onClick={this.handleTaransfer}>Send Money</a>

                        <a className="display-false-class" id="controller-money-send-modal-success" data-dismiss="modal" data-target="#money-send-modal-success" data-toggle="modal"></a>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            {/* SEND MONEY SUCCESS */}

            <div id="money-send-modal-success" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-400">Send Money</h5>
                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                    </div>
                    <div className="modal-body p-4">
                        <form id="moneySend" method="post">
                        <div className="text-center my-5">
                            <p className="text-center text-success text-20 line-height-07"><i className="fas fa-check-circle" /></p>
                            <p className="text-center text-success text-8 line-height-07">Success!</p>
                            <p className="text-center text-4">Transactions Complete</p>
                        </div>
                        
                        <p className="text-center text-3 mb-4">You've Succesfully sent <span className="text-4 font-weight-500">{(Number(this.state.amount)).toLocaleString().split(',').join(' ')} UZS</span> to <span className="font-weight-500">{this.state.receiverCardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()}</span>, See transaction details under <a href="#">Activity</a>.</p>
                        <a className="btn btn-primary btn-block text-white card-add-f-btn" onClick={this.handleSendAgain} >Send Money Again</a>
                        <button className="btn btn-link btn-block"><i className="fas fa-print" /> Print</button>

                        <a className="display-false-class" id="controller-modal-close-send-money-success" data-dismiss="modal"></a>
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
        language: state.language,
        token: state.authToken,
        transferAmount: state.transferAmount,
        recieverInfo: state.recieverInfo,
        cardCred: state.cardCred,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(MoneySend)