import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';

import {url} from './../../store/urls';

import {addCardIdToTransfer} from './../../store/actions/cartActions';

class ConfirmSendMoney extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            cardID: '',
            cardHolder: '',
            disable: false
        }
        this.handleTaransfer = this.handleTaransfer.bind(this);
        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    componentDidMount(){
        if(this.props.recieverInfo.length === 0){
            Router.push("/cabinet-send")
        }
    }

    handleCardSelect(e) {
        let cardId = e.target.value;
        this.setState({cardID: cardId});
    }

    handleTaransfer() {
        let btn = document.getElementById("confirm-send-money-btn");
        btn.classList.add("disactive");
        let recieverInf = this.props.recieverInfo.split('-');
        let data = {
            receiverCardNumber: recieverInf[0],
            amout: recieverInf[4] * 1.05,
            cardProduct: 'UzCard',
            receiverCardNumberExpiresOn: recieverInf[1],
            receiverFullName: recieverInf[2]
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
                    this.props.dispatch(addCardIdToTransfer(response.data.debitTransactionId));
                    Router.push("/cabinet-success")
                }
            })
            .catch((error) => {
                
            })
    }

    render() {
        return (
            <div id="content" className="py-4">
                <div className="container">
                <h2 className="font-weight-400 text-center mt-3">Send Money</h2>
                <p className="text-4 text-center mb-4">You are sending money to <span className="font-weight-500">
                    {this.props.recieverInfo.split('-')[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {this.props.recieverInfo.split('-')[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}
                </span></p>
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">                     
                        <form id="form-send-money" method="post">

                        <div className="form-group">
                                    <label>Card Number</label>
                                    <select className="custom-select" onClick={this.handleCardSelect}>

                                    <option>Select card</option>                                    

                                    {this.props.cards && 
                                        <>
                                        {this.props.cards.map((element, i) => {
                                            return (
                                                <>

                                            <option key={element.id} value={element.id}>{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</option>

                                        </>
                                                )
                                        })}                        
                                        </>
                                    }

                                    </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" rows={4} id="description" required placeholder="Payment Description" defaultValue={""} />
                        </div>
                        <h3 className="text-5 font-weight-400 mb-3">Details</h3>
                        <p className="mb-1">Send Amount <span className="text-3 float-right">{(Number(this.props.recieverInfo.split('-')[4])).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <p className="mb-1">Total fees <span className="text-3 float-right">{(Number(this.props.recieverInfo.split('-')[4] * 0.05)).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <hr />
                        <p className="font-weight-500">Total<span className="text-3 float-right">{(Number(this.props.recieverInfo.split('-')[4] * 1.05)).toLocaleString().split(',').join(' ')} UZS</span></p>
                        <a className="btn btn-primary btn-block text-white card-add-f-btn" id="confirm-send-money-btn" onClick={this.handleTaransfer}>Send Money</a>
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
        cardId: state.cardIdToTransfer,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(ConfirmSendMoney)