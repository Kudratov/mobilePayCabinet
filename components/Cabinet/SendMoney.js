import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';

import ConfirmSendMoney from './ConfirmSendMoney';

import {url} from './../../store/urls';
import {addRecieverInfo, addTransferAmount, addCardIdToTransfer} from './../../store/actions/cartActions';

    import './../../assets/vendor/bootstrap-select/css/bootstrap-select.min.css';


class MoneySend extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cardHolder: '',
            amount: '',
            cardID: ''
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleCardSelect = this.handleCardSelect.bind(this);
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
            axios.get(`${__url}`, {headers: headers})
            .then((response) => {
                let __expiresOn = response.data.expiresOn.substring(4,6) + response.data.expiresOn.substring(2,4);
                this.props.dispatch(addRecieverInfo(`${response.data.cardNumber}-${__expiresOn}-${response.data.cardholderFullName}`));
                this.setState({cardHolder: response.data.cardholderFullName})
            })
            .catch((error) => {
                console.log(error)
                this.setState({cardHolder: ''})
            })
        
    }

    handleAmount (e) {
        let amount = e.target.value;
        this.props.dispatch(addTransferAmount(amount))
        this.setState({amount: amount.toLocaleString().split(',').join(' ')});
    }

    handleCardSelect(e) {
        let cardId = e.target.value;
        this.props.dispatch(addCardIdToTransfer(cardId));
        this.setState({cardID : cardId});
    }

    //.replace(/\s+/g, "")
    handleSend () {
        Router.push("/cabinet-send-money-confirm")
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

                        {/* <div className="form-group">
                            <label htmlFor="edircardNumber">Card Number</label>
                            <div className="input-group">
                            <div className="input-group-prepend"> <span className="input-group-text"><img className="ml-auto" src="./../../images/visa.png" alt="visa" title /></span> </div>
                            <input type="text" className="form-control" data-bv-field="edircardNumber" id="edircardNumber" disabled defaultValue={`11111`} placeholder="Card Number" />
                            <div className="input-group-append"> <span className="input-group-text p-0">
                                <select data-style="custom-select border-0" className=" form-control bg-transparent" required>
                                    <option data-icon="currency-flag currency-flag-usd mr-1" data-subtext="United States dollar" selected="selected" value>USD!#!SADASDASDASDasd</option>
                                    <option data-icon="currency-flag currency-flag-aud mr-1" data-subtext="Australian dollar" value>AUASDASDASDASDASDD</option>
                                    <option data-icon="currency-flag currency-flag-inr mr-1" data-subtext="Indian rupee" value>INasdasdasddASDASDR</option>
                                </select>
                            </span> 
                            </div>
                            </div>
                        </div> */}


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
                        {this.state.cardHolder && <p className="text-muted text-center">CardHolder: <span className="font-weight-500">{this.state.cardHolder}</span></p>}
                        <hr />
                        {this.state.amount && this.state.cardID && 
                            <>
                            
                            <p className="mb-1">Total fees <span className="text-3 float-right">{(Number(this.state.amount) * 0.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                            <p className="font-weight-500">Total To Pay <span className="text-3 float-right">{(Number(this.state.amount) * 1.05).toLocaleString().split(',').join(' ')} UZS</span></p>
                        </>
                        }
                        <a className="btn btn-primary btn-block text-white" disabled={!this.state.cardHolder ? true : false} onClick={this.handleSend}>Continue</a>
                        <a className="display-false-class" id="confirm-money-send" data-dismiss="modal"></a>
                        </form>
                        {/* Send Money Form end */} 
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