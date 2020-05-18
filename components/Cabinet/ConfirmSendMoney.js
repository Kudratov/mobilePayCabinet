import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';

import {url} from './../../store/urls';


class ConfirmSendMoney extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            cardHolder: ''
        }
        this.handleTaransfer = this.handleTaransfer.bind(this);
    }

    componentDidMount(){
        if(!this.props.recieverInfo && this.props.cardId && this.props.transferAmount){
            Router.push("/cabinet-send")
        }
    }

    handleTaransfer() {
        let id = this.props.cardId;
        let recieverInf = this.props.recieverInfo.split('-');
        let __amout = this.props.transferAmount;
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
        console.log(data)
        let __url = `${url}p2p-api/v1.0/cards/${id}/fundstransfer`;
            axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    Router.push("/cabinet-send-money-success")
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
                    {this.props.recieverInfo.split('-')[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                </span></p>
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">                     
                        <form id="form-send-money" method="post">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" rows={4} id="description" required placeholder="Payment Description" defaultValue={""} />
                        </div>
                        <h3 className="text-5 font-weight-400 mb-3">Details</h3>
                        <p className="mb-1">Send Amount <span className="text-3 float-right">{this.props.transferAmount} UZS</span></p>
                        <p className="mb-1">Total fees <span className="text-3 float-right">{this.props.transferAmount * 0.05} UZS</span></p>
                        <hr />
                        <p className="font-weight-500">Total<span className="text-3 float-right">{this.props.transferAmount * 1.05} UZS</span></p>
                        <a className="btn btn-primary btn-block text-white card-add-f-btn" onClick={this.handleTaransfer}>Send Money</a>
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
        cardId: state.cardIdToTransfer
    }
}

export default connect(mapStateToProps)(ConfirmSendMoney)