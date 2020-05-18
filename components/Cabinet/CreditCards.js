import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Router from 'next/router';
import Toast from 'light-toast';
import Link from 'next/link';

import {addCardCredentails, addCard, addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';
import {url} from './../../store/urls';

import './../../assets/vendor/font-awesome/css/all.min.css'; 
import './../../assets/css/css/stylesheet.css';

class CreditCards extends React.Component {
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
            smsCode: '',
            cardIsMain: undefined,
            cardN: undefined
        }
        this.handleCardNumber = this.handleCardNumber.bind(this);
        this.handleCardExp = this.handleCardExp.bind(this);
        this.handleCardName = this.handleCardName.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleSmsCode = this.handleSmsCode.bind(this);
        this.handleSmsValue = this.handleSmsValue.bind(this);
        this.handleShowPhNum = this.handleShowPhNum.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);

        this.handleCardPos = this.handleCardPos.bind(this);
        this.setCardName = this.setCardName.bind(this);
        this.handleCardUpdate = this.handleCardUpdate.bind(this);
        this.handleActivateCard = this.handleActivateCard.bind(this);
        this.handleCardIsMain = this.handleCardIsMain.bind(this);
    }

    // componentDidMount () {
    //     Toast.fail('content', 3000)
    // }

    handleCardUpdate(e){
        let id = e.target.id;
        let controllerCaedUpdate = document.getElementById("controller-modal-card-update");
        let data = 
            [
                {
                    op: "replace",
                    path: "/isMainCard",
                    value: this.state.cardIsMain
                },
                {
                    op: "replace",
                    path: "/name",
                    value: this.state.cardN
                }
            ]
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        let __url = `${url}cards-api/v1.0/cards/${id}`;
        axios.patch(`${__url}`, JSON.stringify(data), {headers: headers})
        .then((response) => {
            if(response.status === 204){
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${this.props.token}`
                }
                let __url = `${url}cards-api/v1.0/cards`
                axios.get(`${__url}`, {headers: headers})
                .then((response) => {
                    this.props.dispatch(addCard(response.data));
                })
                .catch((error) => {
                        localStorage.removeItem('user-credentials');
                        console.log(error);
                        Router.push('/');
                });
                controllerCaedUpdate.click();
            }
        })
        .catch((error) => {
            controllerCaedUpdate.click();
        })
    }

    setCardName (e) {
        let cardName = e.target.value;
        this.setState({cardN: cardName});
    }

    handleCardPos (e) {
        let pos = e.target.value;
        if(pos === "true"){
            this.setState({cardIsMain: true});
        } else {
            this.setState({cardIsMain: false});
        }
    }

    handleCardIsMain (isMain, cardName) {
        this.setState({cardIsMain: isMain});
        this.setState({cardN: cardName});
    }

    handleDeleteCard (e, id) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        let __url = `${url}cards-api/v1.0/cards/${id}`
        axios.delete(`${__url}`, {headers: headers})
        .then((response) => {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url = `${url}cards-api/v1.0/cards`
            axios.get(`${__url}`, {headers: headers})
            .then((response) => {
                this.props.dispatch(addCard(response.data));
            })
            .catch((error) => {
                
            });
        })
        .catch((error) => {
            
        });
    }

    handleShowPhNum () {
        if(this.props.cardCred != 'undefined' && this.props.cardCred.length){
            let info = this.props.cardCred.split(' ');
            return `${info[1].replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5").split(' ')[0]} ${info[1].replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5").split(' ')[1]} *** ** ${info[1].replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5").split(' ')[4]}`
        }        
    }

    handleSmsValue (e) {
        let __smsCode = e.target.value;
        if(__smsCode){
            this.setState({smsCode: __smsCode})
        }
    }

    handleSmsCode (e) {
        let controllerAddCardSmsVer = document.getElementById("controller-modal-add-card-sms-verfication");     
        let __smsCode = this.state.smsCode;
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
            let __url = `${url}cards-api/v1.0/cards/${info[0]}/verify`;
            axios.put(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){

                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }
                    let __url = `${url}cards-api/v1.0/cards`
                    axios.get(`${__url}`, {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addCard(response.data));
                    })
                    .catch((error) => {
                            localStorage.removeItem('user-credentials');
                            console.log(error);
                            Router.push('/');
                    });

                    Toast.success('Card successfully added', 3000)
                    controllerAddCardSmsVer.click();
                }
            })
            .catch((error) => {
                Toast.fail('Something went wrong!', 3000);
                controllerAddCardSmsVer.click();
            })
        }
    }

    handleActivateCard (id, ownerPhoneNumber, cardNumber) {
        this.setState({cardNumber})
        this.props.dispatch(addCardCredentails(id, ownerPhoneNumber));
        let controllerAddCard = document.getElementById("controller-modal-add-card");
        controllerAddCard.click();
    }

    handleAddCard () {
        let dismissModal = document.getElementById("controller-modal-add-card-dismiss");
        let controllerAddCard = document.getElementById("controller-modal-add-card");
        let realN = this.state.realCardNumber;
        let realE = this.state.realCardExp;
        let realT = this.state.cardType;
        let realNa = this.state.cardName;
        let pNumber1 = this.props.pNumber;
        if(realN && realE && realT && pNumber1){
            let __url = `${url}cards-api/v1.0/cards`;
            let data = {
                cardNumber: realN,
                expiresOn: realE,
                cardProduct: realT,
                name: realNa
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
                        controllerAddCard.click();

                    }
                })
                .catch((error) => {
                    Toast.fail('Card not found', 3000)
                    dismissModal.click();
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
    render() {
        return (
            <div>
                <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-4">Credit or Debit Cards <span className="text-muted text-4">(for payments)</span></h3>
                <div className="row">

                {this.props.cards && 
                        <>
                        {this.props.cards.map((element, i) => {
                            return (
                                <>

                                    {element.confirmedByOwner &&
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="account-card account-card-primary text-white rounded p-3 mb-4 mb-lg-0">                        
                                                <p className="d-flex align-items-center">
                                                    <span className="text-2 opacity-9 text-white">{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</span>
                                                    <span className="text-2 opacity-9 text-white ml-auto">{element.expiresOn ? element.expiresOn.substring(0,2) + "/" + element.expiresOn.substring(2) : ''}</span>
                                                </p>
                                                <p className="d-flex align-items-center">
                                                <span className="text-4 opacity-9 text-white">{element.balance.toLocaleString().split(',').join(' ')} {element.currencyCode}</span> {element.isMainCard ? <span className="bg-light text-0 text-body font-weight-500 rounded-pill d-inline-block px-2 line-height-4 opacity-8 ml-auto">Primary</span> : ''} </p>
                                                <p className="d-flex align-items-center m-0"> <span className="text-uppercase font-weight-500 text-white">{element.name}</span> <img className="ml-auto" src="./../../images/visa.png" alt="visa" title /> </p>
                                                <div className="account-card-overlay rounded"> <a onClick={e => this.handleCardIsMain(element.isMainCard, element.name)} data-target={`#edit-card-details-${element.id}`} data-toggle="modal" className="text-light btn-link mx-2"><span className="mr-1"><i className="fas fa-edit" /></span>Edit</a> <a href="#" onClick={e=>this.handleDeleteCard(e, `${element.id}`)} className="text-light btn-link mx-2"><span className="mr-1"><i className="fas fa-minus-circle" /></span>Delete</a> </div>
                                            </div>
                                        </div>
                                    }


                                    </>
                                )
                        })}                        
                        </>
                    }


                    {this.props.cards && 
                        <>
                        {this.props.cards.map((element, i) => {
                            return (
                                <>

                                    {element.confirmedByOwner === false &&
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="account-card text-white rounded p-3 mb-4 mb-lg-0">
                                                <p className="text-4">{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</p>
                                                <p className="d-flex align-items-center"> <span className="account-card-expire text-uppercase d-inline-block opacity-6 mr-2">Valid<br />
                                                    thru<br />
                                                </span> <span className="text-2 opacity-9">{element.expiresOn ? element.expiresOn.substring(0,2) + "/" + element.expiresOn.substring(2) : ''}</span> </p>
                                                <p className="d-flex align-items-center m-0"> <span className="text-uppercase font-weight-500">{element.name}</span> <img className="ml-auto" src="./../../images/mastercard.png" alt="mastercard" title /> </p>
                                                <div className="account-card-overlay rounded"> <a href="#" data-target="#edit-card-details" onClick={e => this.handleActivateCard(element.id, element.ownerPhoneNumber, element.cardNumber)} data-toggle="modal" className="text-light btn-link mx-2"><span className="mr-1"><i className="fas fa-chevron-up" /></span>Activate</a> <a href="#" className="text-light btn-link mx-2" onClick={e => this.handleDeleteCard(e, element.id)}><span className="mr-1"><i className="fas fa-minus-circle" /></span>Delete</a> </div>
                                            </div>
                                        </div>
                                    }


                                    </>
                                )
                        })}                        
                        </>
                    }                    

                    <div className="col-12 col-sm-6 col-lg-4"> <a data-target="#add-new-card-details" data-toggle="modal" className="account-card-new d-flex align-items-center rounded h-100 p-3 mb-4 mb-lg-0">
                        <p className="w-100 text-center line-height-4 m-0"> <span className="text-3"><i className="fas fa-plus-circle" /></span> <span className="d-block text-body text-3">Add New Card</span> </p>
                    </a> </div>
                </div>
                </div>
                {/* Edit Card Details Modal
                ================================== */}

                {this.props.cards && 
                        <>
                        {this.props.cards.map((element, i) => {
                            return (
                                <>


                                    <div id={`edit-card-details-${element.id}`} className="modal fade" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title font-weight-400">Update Card</h5>
                                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                                        </div>
                                        <div className="modal-body p-4">
                                            <form id="updateCard" method="post">
                                            <div className="form-group">
                                                <label htmlFor="edircardNumber">Card Number</label>
                                                <div className="input-group">
                                                <div className="input-group-prepend"> <span className="input-group-text"><img className="ml-auto" src="./../../images/visa.png" alt="visa" title /></span> </div>
                                                <input type="text" className="form-control" data-bv-field="edircardNumber" id="edircardNumber" disabled defaultValue={`${element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** ${element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}`} placeholder="Card Number" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="editexpiryDate">Expiry Date</label>
                                                    <input id="editexpiryDate" type="text" className="form-control" data-bv-field="editexpiryDate" disabled defaultValue={`${element.expiresOn ? element.expiresOn.substring(0,2) + "/" + element.expiresOn.substring(2) : ''}`} placeholder="MM/YY" />
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-lg-6">
                                                    <div className="form-check custom-control custom-checkbox">
                                                        <input className="custom-control-input" type="checkbox" id="remember" name="remember-1" onChange={this.handleCardPos} value="true" checked={this.state.cardIsMain} />
                                                        <label className="custom-control-label" htmlFor="remember">Main Card</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 pb-2">
                                                    <div className="form-check custom-control custom-checkbox">
                                                        <input className="custom-control-input" type="checkbox" id="remember-me" name="remember" onChange={this.handleCardPos} value="false" checked={!this.state.cardIsMain} />
                                                        <label className="custom-control-label" htmlFor="remember-me">Secondary Card</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="editcardHolderName">Card Holder Name</label>
                                                <input type="text" className="form-control" data-bv-field="editcardHolderName" id="editcardHolderName" onChange={this.setCardName} value={this.state.cardN} placeholder="Card Holder Name" />
                                            </div>
                                            <a className="btn btn-primary btn-block text-white card-add-f-btn" id={`${element.id}`} onClick={this.handleCardUpdate} type="submit">Update Card</a>
                                            <a className="display-false-class" id="controller-modal-card-update" data-dismiss="modal"></a>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    </>
                                )
                        })}                        
                        </>
                    }

                {/* Add New Card Details Modal
                ================================== */}


                <div id="add-new-card-details" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-400">Add a Card</h5>
                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                    </div>
                    <div className="modal-body p-4">
                        <form id="addCard" method="post">
                        <div className="btn-group d-flex btn-group-toggle mb-3" data-toggle="buttons">
                            <label className="btn btn-outline-secondary btn-sm shadow-none w-100 active">
                            <input type="radio" name="options" id="option1" defaultChecked />
                            Debit </label>
                            <label className="btn btn-outline-secondary btn-sm shadow-none w-100">
                            <input type="radio" name="options" id="option2" />
                            Credit </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardType">Card Type</label>
                            <select id="cardType" className="custom-select">
                            <option value>{this.state.cardType}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" required maxLength="19" onChange={(e) => this.handleCardNumber(e)} pattern="^[0-9]{16}$" placeholder="Card Number" />
                        </div>
                        <div className="form-row">
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input id="expiryDate" type="text" className="form-control" data-bv-field="expiryDate" maxLength="4" onChange={(e) => this.handleCardExp(e)} required placeholder="MM/YY" />
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolderName">Card Holder Name</label>
                            <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" maxLength="26" onChange={(e) => this.handleCardName(e)} placeholder="Card Holder Name" />
                        </div>
                        <a className="btn btn-primary btn-block card-add-f-btn text-white" onClick={this.handleAddCard} data-toggle="modal" type="submit">Add Card</a>
                        <a className="display-false-class" id="controller-modal-add-card" data-dismiss="modal" data-target="#add-new-card-sms-verfication" data-toggle="modal"></a>
                        <a className="display-false-class" id="controller-modal-add-card-dismiss" data-dismiss="modal"></a>
                        </form>
                    </div>
                    </div>
                </div>
                </div>

                <div id="add-new-card-sms-verfication" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title font-weight-400">SMS Verification</h5>
                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                    </div>
                    <div className="modal-body p-4">
                        <form id="addCard" method="post">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" value={`${this.state.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** ${this.state.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}`} disabled="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">SMS Sent Number</label>
                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" disabled="true" value={this.handleShowPhNum()}/>
                        </div>
                        <div className="form-row">
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="expiryDate">SMS Code</label>
                                <input id="expiryDate" type="text" onChange={this.handleSmsValue} className="form-control" maxLength="4" placeholder="----" pattern="^[0-9]{4}$" />
                            </div>
                            </div>
                        </div>
                        <a className="btn btn-primary btn-block card-add-f-btn text-white" onClick={(e) => this.handleSmsCode(e)} type="submit">Confirm</a>
                        <a className="display-false-class" id="controller-modal-add-card-sms-verfication" data-dismiss="modal"></a>
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
        pNumber: state.phoneNumber,
        cardCred: state.cardCred,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(CreditCards)