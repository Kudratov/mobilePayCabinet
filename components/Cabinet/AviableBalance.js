import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import moment from "moment";
import Cookie from 'js-cookie';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber, addRecieverInfo, addCardIdToTransfer, addFavoriteTransaction, addTransactionHistory, addTransactionInfo, addTransactionCardIDs} from './../../store/actions/cartActions';

class AviableBalance extends React.Component {

    constructor (props) {
        super(props);
        this.getBalance = this.getBalance.bind(this);
        this.state = {
            startDate: moment().subtract(20, 'days'),
            endDate: moment(),
            realStartDate: moment().subtract(20, 'days').calendar().split('/').reverse().join('-'),
            realEndDate: moment().format('L').split('/').reverse().join('-'),
            pageNumber: '1',
            pageSize: '7',
            cardIds: [],
            date: 1,
            transactionHistory: [],
            currentPageSize: '',
            currentPageNumber: ''
        }
    }

    componentDidMount () {
        this.props.dispatch(addRecieverInfo(''));
        this.props.dispatch(addCardIdToTransfer(''));
        if(this.props.token && this.props.pNumber){
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url_card = `${url}cards-api/v1.0/cards`;
            axios.get(`${__url_card}`, {headers: headers})
                .then((response) => {
                    this.props.dispatch(addCard(response.data));

                    let _urlTran = `${url}transactions-api/v1.0/transactions`;

                    let data = {
                        from: this.state.realStartDate.split("-")[0] + `-` + this.state.realStartDate.split("-")[2] + `-` + this.state.realStartDate.split("-")[1],
                        to: this.state.realEndDate.split("-")[0] + `-` + this.state.realEndDate.split("-")[2] + `-` + this.state.realEndDate.split("-")[1],
                        pageNumber: this.props.currentPage,
                        pageSize: this.state.pageSize,
                        cardIds: this.state.cardIds
                    }
                    
                    this.state.cardIds.length = 0;
                    response.data.map((element) => {
                        this.state.cardIds.push(element.id);
                    })
                    axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                        .then((response) => {
                            this.props.dispatch(addTransactionCardIDs(data.cardIds))
                            this.props.dispatch(addTransactionInfo(`${response.data.currentPage}-${Math.ceil(response.data.totalCount/response.data.currentPage)}-${response.data.hasMore}`));
                            this.props.dispatch(addTransactionHistory(response.data.transactions.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
                        })
                        .catch((error) => {
                            
                        })

                })
                .catch((error) => {
                        Router.push('/');
                })
            let __url_favorite_transaction = `${url}transactions-api/v1.0/favouritetransactions/`;
            axios.get(`${__url_favorite_transaction}`, {headers: headers})
                .then((response) => {
                    this.props.dispatch(addFavoriteTransaction(response.data.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
                })
                .catch((error) => {
                    console.log(error)
                })
        } else if(!this.props.token && !this.props.pNumber) {
            if(true){
                this.props.dispatch(addAuthtoken(Cookie.get('authtoken')));
                this.props.dispatch(addPhoneNumber(Cookie.get('phonenumber')));
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Cookie.get('authtoken')}`
                }
                let __url_card = `${url}cards-api/v1.0/cards`;
                axios.get(`${__url_card}`, {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addCard(response.data));

                        let _urlTran = `${url}transactions-api/v1.0/transactions`;

                        let data = {
                            from: this.state.realStartDate.split("-")[0] + `-` + this.state.realStartDate.split("-")[2] + `-` + this.state.realStartDate.split("-")[1],
                            to: this.state.realEndDate.split("-")[0] + `-` + this.state.realEndDate.split("-")[2] + `-` + this.state.realEndDate.split("-")[1],
                            pageNumber: this.props.currentPage,
                            pageSize: this.state.pageSize,
                            cardIds: this.state.cardIds
                        }
                        
                        this.state.cardIds.length = 0;
                        response.data.map((element) => {
                            this.state.cardIds.push(element.id);
                        })
                        axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                            .then((response) => {
                                this.props.dispatch(addTransactionCardIDs(data.cardIds))
                                this.props.dispatch(addTransactionInfo(`${response.data.currentPage}-${Math.ceil(response.data.totalCount/response.data.currentPage)}-${response.data.hasMore}`));
                                this.props.dispatch(addTransactionHistory(response.data.transactions.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
                            })
                            .catch((error) => {
                                
                            })

                    })
                    .catch((error) => {
                            Router.push('/');
                    })
                let __url_favorite_transaction = `${url}transactions-api/v1.0/favouritetransactions/`;
                axios.get(`${__url_favorite_transaction}`, {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addFavoriteTransaction(response.data.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
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
            if(element.confirmedByOwner === true){
                balance = balance + element.balance;
            }            
            // if(this.props.cards.length === i + 1){
            //     return 11;
            // }
        })
        return balance.toLocaleString().split(',').join(' ')
    }

    render() {        
        return (
            <div className="bg-light shadow-sm rounded text-center p-3 mb-4">
                <div className="text-17 text-light my-3"><i className="fas fa-wallet" /></div>
                <h3 className="text-9 font-weight-400">{this.getBalance()} UZS</h3>
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
        cards: state.cards,
        currentPage: state.transactionInfo.split("-")[0]
    }
}

export default connect(mapStateToProps)(AviableBalance)