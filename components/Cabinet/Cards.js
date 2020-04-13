import React, { Component, useEffect } from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class CabinetCards extends Component {
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
        this.handleDisplayCase = this.handleDisplayCase.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
    }

    componentDidMount () {
        if(this.props.token && this.props.pNumber){
            let pNumber1 = this.props.pNumber;
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
                        localStorage.removeItem('user-credentials');
                        Router.push('/');
                })
            }
        } else if(!this.props.token && !this.props.pNumber) {
            if(JSON.parse(localStorage.getItem('user-credentials')).token.length && JSON.parse(localStorage.getItem('user-credentials')).pNumber.length){
                this.props.dispatch(addAuthtoken(JSON.parse(localStorage.getItem('user-credentials')).token));
                this.props.dispatch(addPhoneNumber(JSON.parse(localStorage.getItem('user-credentials')).pNumber));
                let pNumber1 = JSON.parse(localStorage.getItem('user-credentials')).pNumber;
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

    handleDeleteCard (e, {id}) {
        let pNumber1 = this.props.pNumber.substring(1);
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        if(pNumber1){
            let __url = `${url}cards-api/v1.0/users/${pNumber1}/cards/${id}`
            axios.delete(`${__url}`, {headers: headers})
            .then((response) => {
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
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    handleDisplayCase () {
        Router.push('/cabinet-card-add');   
    }

    render() {
        return (
            <section className="ptb-1001 container-fluid clearfix">
                <div className="row">                        
                    <div className="col-md-6">
                        <h2>Мои карты</h2>
                        <p>Все карты в одном приложении</p>
                    </div>

                    <div className="col-md-6 d-flex btn-add-card-div justify-content-end" id="no-display-for-adding-card-btn">
                        <a className="btn-add-card" onClick={this.handleDisplayCase}>Добавить карту</a>
                    </div>
                </div>
                <div className="">
                    <div className="card-card-info row margin-for-row" id="no-display-for-adding-card-div">
                    {this.props.cards && 
                        <>
                        {this.props.cards.map((element, i) => {
                            return (
                                <>
                                <div className={`col-md-${this.props.cards.length / 12}`}>
                                    <div className="card-in-cards">
                                        <div className="card-info-cards d-flex">
                                            <span className="card-logo p-2">
                                            {element.cardProduct.name}
                                            </span>
                                            <div className="card-card-poz p-2">
                                                <span>{element.isMainCard ? "Main Card" : "Secondary Card"}</span>
                                            </div>
                                        </div>
                                        <div className="card-balance-str">Balance</div>
                                        <div className="card-balance-num">
                                            {element.balance.toLocaleString().split(',').join(' ')}
                                            <span className="card-currency">so'm</span>
                                        </div>
                                        <div className="card-bank-name">{element.cardProduct.name}</div>
                                        <div className="card-card-credentials d-flex">
                                            <div className="card-card-number mr-auto">{element.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()}</div>
                                            <div className="card-card-exp ml-auto">{element.expiresOn ? element.expiresOn.substring(0,2) + "/" + element.expiresOn.substring(2) : ''}</div>
                                        </div>
                                    </div>
                                    <div className="card-card-settings d-flex py-2">
                                        <a className="d-flex align-items-center p-2 mr-auto mouse-pointer">
                                            <span className="d-block mr-2 fs-24 icon-for-card-settings"><i class="fas fa-cog"></i></span>
                                        </a>
                                        <a className="d-flex align-items-center p-2 mouse-pointer">
                                            <span className="d-block fs-24 icon-for-card-settings"><i class="fas fa-lock"></i></span>
                                        </a>
                                        <a className="d-flex align-items-center p-2 mouse-pointer" onClick={(e) => this.handleDeleteCard(e, element)}>
                                            <span className="d-block fs-24 icon-for-card-settings"><i class="fas fa-trash-alt"></i></span>
                                        </a>
                                    </div>
                                </div>
                                </>
                                )
                        })}                        
                        </>
                    }
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
        cardCred: state.cardCred,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(CabinetCards);