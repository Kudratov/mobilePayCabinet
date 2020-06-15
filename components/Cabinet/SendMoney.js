import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import axios from 'axios';
import Toast from 'light-toast';

import {url} from './../../store/urls';
import {addRecieverInfo, addTransferAmount, addCardIdToTransfer} from './../../store/actions/cartActions';
import Languages from './../../store/languages.json';

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
            cardProduct: ''
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleCardOwnerName = this.handleCardOwnerName.bind(this);
        this.handleCardExp = this.handleCardExp.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(addRecieverInfo(''));
    }

    handleCardOwnerName (e) {
        let recieverName = e.target.value;
        this.setState({receiverFullName: recieverName});
    }

    handleCardExp (e) {
        let __expiresOn = e.target.value;
        this.setState({receiverCardNumberExpiresOn: __expiresOn});
    }

    handleCardNumber (e) {
        e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        let cardNumber = e.target.value;
        if(cardNumber.length){
            let cardNumber1 = cardNumber.split(' ');
            if(cardNumber1.includes('8600')){
                this.setState({cardProduct: "UzCard"})
            } else if (cardNumber1.includes('9860')){
                this.setState({cardProduct: "Humo"})
            } else {
                this.setState({cardProduct: "Visa"})
            }
        }
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            if(this.state.cardProduct === "Visa"){

                //CardType Visa     
                console.log(cardNumber.replace(/\s+/g, ""))
                this.setState({receiverCardNumber: cardNumber.replace(/\s+/g, "")});

            } else if(this.state.cardProduct !== "Visa") {
                let __url = `${url}p2p-api/v1.0/receiverdetails/${cardNumber.replace(/\s+/g, "")}`
                if(cardNumber.length === 19){
                    axios.get(`${__url}`, {headers: headers})
                        .then((response) => {
                            let __expiresOn
                            if(response.data.expiresOn.length === 6){
                                __expiresOn = response.data.expiresOn.substring(4,6) + response.data.expiresOn.substring(2,4);
                            } else if(response.data.expiresOn.length === 4){
                                __expiresOn = response.data.expiresOn;
                            }
                            this.setState({receiverCardNumber: response.data.cardNumber});
                            this.setState({receiverCardNumberExpiresOn: __expiresOn});
                            this.setState({receiverFullName: response.data.cardholderFullName});

                            let tag = document.getElementById("send-money-btn");       
                            if(this.state.amount.length >= 0){
                                tag.classList.remove("disactive");
                            } else {
                                tag.classList.add("disactive");
                            }
                            
                        })
                        .catch((error) => {
                            if(this.state.cardProduct !== "Visa"){
                                Toast.fail("Card not found", 1500);
                                this.setState({receiverFullName: ''})
                            } else {
                                this.setState({receiverCardNumber: cardNumber.replace(/\s+/g, "")});
                            }
                        })
                }
            }
        
    }

    handleAmount (e) {
        e.target.value = e.target.value.toLocaleString().split(',').join(' ');
        let amount = e.target.value;
        let tag = document.getElementById("send-money-btn");        
        if(this.state.receiverFullName && amount.length >= 0){
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
        this.props.dispatch(addRecieverInfo(`${this.state.receiverCardNumber}-${this.state.receiverCardNumberExpiresOn}-${this.state.receiverFullName}-P2P-${this.state.amount}-${this.state.cardProduct}`));
        Router.push("/cabinet-confirm");        
    }

    render() {
        return (
            <div>
                <div id="content" className="py-4">
                <div className="container">
                <h2 className="font-weight-400 text-center mt-3">{Languages.page.cabenet_money_send[this.props.language].t3}</h2>
                <p className="text-4 text-center mb-4">{Languages.page.cabenet_money_send[this.props.language].t4}</p>
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                        <h3 className="text-5 font-weight-400 mb-3">{Languages.page.cabenet_money_send[this.props.language].t5}</h3>
                        {/* Send Money Form
                    ============================================= */}
                        <form id="form-send-money" method="post">

                        <div className="form-group">
                            <label htmlFor="youSend">{Languages.page.cabenet_money_send[this.props.language].t6}</label>
                            <input type="text" className="form-control" maxLength="19" onChange={(e) => this.handleCardNumber(e)} placeholder="0000 0000 0000 0000" />
                        </div>
                        {this.state.cardProduct === 'Visa' ? 
                        <div>
                            <div className="form-group">
                                <label htmlFor="ownerName">{Languages.page.cabenet_money_send[this.props.language].t12}</label>
                                <input type="text" className="form-control" onChange={(e) => this.handleCardOwnerName(e)} placeholder={Languages.page.cabenet_money_send[this.props.language].t12} />
                            </div>
                            <div className="form-row">
                                <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="editexpiryDate">Exp Date</label>
                                    <input id="editexpiryDate" type="text" className="form-control" onChange={e => this.handleCardExp(e)} data-bv-field="editexpiryDate" placeholder="MM/YY" />
                                </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="form-group">
                        {this.state.receiverFullName && <p className="text-muted">{Languages.page.cabenet_money_send[this.props.language].t12}: <span className="font-weight-500">{this.state.receiverFullName}</span></p>}
                        </div>
                        }
                        <div className="form-group">
                            <label htmlFor="youSend">{Languages.page.cabenet_money_send[this.props.language].t7}</label>
                            <div className="input-group">
                            <input type="text" className="form-control" onChange={(e) => this.handleAmount(e)} pattern="^[0-9]{16}$" placeholder={Languages.page.cabenet_money_send[this.props.language].t8}/>
                            <div className="input-group-append"> <span className="input-group-text p-2">
                                {this.state.cardProduct === "Visa" ? "USD" : "UZS"}
                                </span> </div>
                            </div>
                        </div>                        
                        <hr />
                        {this.state.amount &&
                            <>
                            
                            <p className="mb-1">{Languages.page.cabenet_money_send[this.props.language].t10} <span className="text-3 float-right">{(Number(this.state.amount) * 0.05).toLocaleString().split(',').join(' ')} {this.state.cardProduct === "Visa" ? "USD" : "UZS"}</span></p>
                            <p className="mb-1">{Languages.page.cabenet_money_send[this.props.language].t7} <span className="text-3 float-right">{(Number(this.state.amount)).toLocaleString().split(',').join(' ')} {this.state.cardProduct === "Visa" ? "USD" : "UZS"}</span></p>
                            <p className="font-weight-500">{Languages.page.cabenet_money_send[this.props.language].t11} <span className="text-3 float-right">{(Number(this.state.amount) * 1.05).toLocaleString().split(',').join(' ')} {this.state.cardProduct === "Visa" ? "USD" : "UZS"}</span></p>
                        </>
                        }
                        <a className="btn btn-primary btn-block text-white card-add-f-btn disactive" id="send-money-btn" onClick={this.handleSend}>{Languages.page.cabenet_money_send[this.props.language].t9}</a>
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