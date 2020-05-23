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
    }

    componentDidMount () {
        this.props.dispatch(addRecieverInfo(''));
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
        if(this.state.receiverFullName && amount.length >= 4){
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
        this.props.dispatch(addRecieverInfo(`${this.state.receiverCardNumber}-${this.state.receiverCardNumberExpiresOn}-${this.state.receiverFullName}-P2P-${this.state.amount}`));
        Router.push("/cabinet-confirm");        
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
                        {this.state.amount &&
                            <>
                            
                            <p className="mb-1">Total fees <span className="text-3 float-right">{(Number(this.state.amount) * 0.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                            <p className="mb-1">Send Amount <span className="text-3 float-right">{(Number(this.state.amount)).toLocaleString().split(',').join(' ')} UZS</span></p>
                            <p className="font-weight-500">Total To Pay <span className="text-3 float-right">{(Number(this.state.amount) * 1.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                        </>
                        }
                        <a className="btn btn-primary btn-block text-white card-add-f-btn disactive" id="send-money-btn" onClick={this.handleSend}>Continue</a>
                        </form>
                    </div>
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