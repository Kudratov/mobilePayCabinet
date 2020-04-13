import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class AviableBalance extends React.Component {

    constructor (props) {
        super(props);
        this.getBalance = this.getBalance.bind(this);
    }

    componentDidMount () {
        if(this.props.token && this.props.pNumber){
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url = `${url}cards-api/v1.0/cards`;
            axios.get(`${__url}`, {headers: headers})
            .then((response) => {
                this.props.dispatch(addCard(response.data));
            })
            .catch((error) => {
                    localStorage.removeItem('user-credentials');
                    Router.push('/');
            })
        } else if(!this.props.token && !this.props.pNumber) {
            if(JSON.parse(localStorage.getItem('user-credentials')).token.length && JSON.parse(localStorage.getItem('user-credentials')).pNumber.length){
                this.props.dispatch(addAuthtoken(JSON.parse(localStorage.getItem('user-credentials')).token));
                this.props.dispatch(addPhoneNumber(JSON.parse(localStorage.getItem('user-credentials')).pNumber));
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-credentials')).token}`
                }
                let __url = `${url}cards-api/v1.0/cards`;
                axios.get(`${__url}`, {headers: headers})
                .then((response) => {
                    this.props.dispatch(addCard(response.data));
                })
                .catch((error) => {
                    console.log(error)
                })
            } else{
                Router.push('/');
            }
        }
    }

    getBalance () {
        if(!this.props.cards){
            return 0;
        }
        let balance = 0;
        this.props.cards.map((element, i) => {
            balance = balance + element.balance;
            if(this.props.cards.length === i + 1){
                return 11;
            }
        })
        return balance.toLocaleString().split(',').join(' ')
    }

    render() {        
        return (
            <div className="bg-light shadow-sm rounded text-center p-3 mb-4">
                <div className="text-17 text-light my-3"><i className="fas fa-wallet" /></div>
                <h3 className="text-9 font-weight-400">{this.getBalance()}</h3>
                <p className="mb-2 text-muted opacity-8">Available Balance</p>
                <hr className="mx-n3" />
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

export default connect(mapStateToProps)(AviableBalance)