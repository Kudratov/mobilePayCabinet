import React, { Component } from 'react';
import Link from 'next/link';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber, addHistory} from './../../store/actions/cartActions';
import HighchartReact from './HighchartReact';

class CabinetHistory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)), //moment().subtract(20, 'days').calendar().split('/').reverse().join('-'),
            endDate: new Date(),
            realStartDate: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-'),
            realEndDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-'),
            pageNumber: '1',
            pageSize: '50',
            cardIds: [],
            date: 1
        }
        this.handleChangeStrtDate = this.handleChangeStrtDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    componentDidMount() {        
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
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${this.props.token}`
                    }
            
                    let _urlTran = `${url}transactions-api/v1.0/transactions`
            
                        let data = {
                            from: this.state.realStartDate,
                            to: this.state.realEndDate,
                            pageNumber: this.state.pageNumber,
                            pageSize: this.state.pageSize,
                            cardIds: this.state.cardIds
                        }
            
                        if(response.data){
                            this.state.cardIds.length = 0;
                            response.data.map((element) => {
                                this.state.cardIds.push(element.id)
                            })
                            axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                                .then((response) => {
                                    this.props.dispatch(addHistory(response.data.transactions));
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        }             
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
                        
                        let _urlTran = `${url}transactions-api/v1.0/transactions`
            
                        let data = {
                            from: this.state.realStartDate,
                            to: this.state.realEndDate,
                            pageNumber: this.state.pageNumber,
                            pageSize: this.state.pageSize,
                            cardIds: this.state.cardIds
                        }
            
                        if(response.data){
                            this.state.cardIds.length = 0;
                            response.data.map((element) => {
                                this.state.cardIds.push(element.id)
                            })
                            axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                                .then((response) => {
                                    this.props.dispatch(addHistory(response.data.transactions));
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
            } else{
                Router.push('/');
            }
        }
    }

    handleChangeEndDate = date => {
        this.setState({
            endDate: date,
            realEndDate: date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-')
        });
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }

        let _urlTran = `${url}transactions-api/v1.0/transactions`

            let data = {
                from: this.state.realStartDate,
                to: date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-'),
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize,
                cardIds: this.state.cardIds
            }

            if(this.props.cards){
                this.state.cardIds.length = 0;
                this.props.cards.map((element) => {
                    this.state.cardIds.push(element.id)
                })
                axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                    .then((response) => {
                        this.props.dispatch(addHistory(response.data.transactions));
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }        
      };

    handleChangeStrtDate = date => {
        this.setState({
            startDate: date,
            realStartDate: date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-')
        });
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }

        let _urlTran = `${url}transactions-api/v1.0/transactions`

            let data = {
                from: date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0].split('/').reverse().join('-'),
                to: this.state.realEndDate,
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize,
                cardIds: this.state.cardIds
            }

            if(this.props.cards){
                this.state.cardIds.length = 0;
                this.props.cards.map((element) => {
                    this.state.cardIds.push(element.id)
                })
                axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
                    .then((response) => {
                        console.log(response.data.transactions)
                        this.props.dispatch(addHistory(response.data.transactions.reverse()));
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }        
      };

    render() {
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="row">
                        
                        <div className="col-md-6">
                            <h2>Мониторинг платежей</h2>
                            <p>История покупок, переводов и поступлений</p>
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <a className='d-flex btn-add-card-div'>
                                <span className="btn-add-card">График</span>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <HighchartReact />
                    </div>

                    <div className="row padding-top-history">
                        <div className="col-md-2">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                className="format-date"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStrtDate}
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="col-md-2">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                className="format-date"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEndDate}
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="col-md-2">
                            <select className="form-control format-select">
                                <option>Все платежи</option>
                                <option>Поступления</option>
                                <option>Расход</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control format-select">
                                <option>Все карты</option>
                                <option>card1</option>
                                <option>card2</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                        <select className="form-control format-select">
                                <option>Все категории</option>
                                <option>option1</option>
                                <option>option2</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <a className='d-flex'>
                                <span className="btn-add-card format-select">Применить</span>
                            </a>
                        </div>
                    </div>

                    {this.props.history &&
                                
                        
                                <div className="row padding-top-history"> 
                                <div className="display-false-class">{this.date = 1}</div>                               
                                <>
                        {this.props.history.map((element, i) => {                            
                            return (
                            <>
                                    {element.plainDate !== (this.date ? this.date : 1)  &&
                                    <div className="w-100 d-flex justify-content-start">
                                        <div className="col-12">
                                            <h5>{element.transactionDate.split('T')[0]}</h5>
                                            <div className="display-false-class">{this.date = element.plainDate}</div>
                                        </div>
                                    </div>
                                    }

                                    
                                    <div className="row padding-l-r">
                                    <div className="col-12">
                                        <div className="card text-white bg-brand-color mb-3">
                                            <div className="d-flex padding-to-payment">
                                                <span className="d-flex justify-content-start">{element.transactionDate.split('T')[1].split(':')[0]}:{element.transactionDate.split('T')[1].split(':')[1]}</span>
                                                <span className="d-flex ml-auto">P2P</span>
                                            </div>
                                            <img class="card-img-top img-in-history" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png" alt=""></img>
                                            <div className="card-body">
                                                <p className="card-text text-white p-center-text">
                                                    <span>Cardname</span><br/>
                                                    <span>{element.debitCreditIndicator === 2 ? '+' : ''}{element.amount.toLocaleString().split(',').join(' ')} {element.currencyCode}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    
                                    </>
                                )
                        })}                       
                        </>
                                </div>                            
                    }

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
        cards: state.cards,
        history: state.transactionHistory
    }
}

export default connect(mapStateToProps)(CabinetHistory);