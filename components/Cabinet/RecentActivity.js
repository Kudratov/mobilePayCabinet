import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';

import {addHistory, addFavoriteTransaction, addRecieverInfo} from './../../store/actions/cartActions';
import {url} from './../../store/urls';

class RecentActivity extends React.Component {

    constructor(props){
        super(props);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleRecieverCard = this.handleRecieverCard.bind(this);
        this.handleDeleteFavoriteTransaction = this.handleDeleteFavoriteTransaction.bind(this);
        this.handleRePay = this.handleRePay.bind(this);
    }

    handleRePay (info) {
        let conroller_btn = document.getElementById("controller-for-exit-modal");
        this.props.dispatch(addRecieverInfo(info));
        conroller_btn.click();
        Router.push("/cabinet-confirm");
    }

    handleDeleteFavoriteTransaction (id) {
        let conroller_btn = document.getElementById("controller-for-exit-modal");
        let delete_url = `${url}transactions-api/v1.0/favouritetransactions/${id}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        axios.delete(delete_url,{headers: headers})
            .then(response => {
                if(response.status === 204){
                    let __url_favorite_transaction = `${url}transactions-api/v1.0/favouritetransactions/`;
                    axios.get(`${__url_favorite_transaction}`, {headers: headers})
                        .then((response) => {
                            this.props.dispatch(addFavoriteTransaction(response.data.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
                            conroller_btn.click();
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleMonth(pos){
        let monthes = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return monthes[Number(pos) - 1];
    }

    handleRecieverCard (cardNumber) {
        if(cardNumber.length === 0){
            return ''
        } else if(cardNumber == 'undefined'){
            return ''
        } else {
            return `${cardNumber.split('')[0]}${cardNumber.split('')[1]}${cardNumber.split('')[2]}${cardNumber.split('')[3]} **** **** ${cardNumber.split('')[12]}${cardNumber.split('')[13]}${cardNumber.split('')[14]}${cardNumber.split('')[15]}`
        }
    }

    render() {
        return (
            <div className="bg-light shadow-sm rounded py-4 mb-4">
            <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-3">Favorite Transactions</h3>
            {/* Title
                =============================== */}
            <div className="transaction-title py-2 px-4">
            <div className="row">
                <div className="col-2 col-sm-1 text-center"><span className>Date</span></div>
                <div className="col col-sm-7">Description</div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center">Status</div>
                <div className="col-3 col-sm-2 text-right">Amount</div>
            </div>
            </div>
            {/* Title End */}
            {/* Transaction List
                =============================== */}
            <div className="transaction-list">
            
            {this.props.fTransactions && 
                        <>
                        {this.props.fTransactions.map((element, i) => {
                            return (
                                <>

                                    {i < 7 ? 
                                    
                                        <div key={i} className="transaction-item px-4 py-3" data-toggle="modal" data-target={"#text-number-" + i}>
                                            <div className="row align-items-center flex-row">
                                                <div className="col-2 col-sm-1 text-center"> 
                                                    <span className="d-block text-4 font-weight-300">{element.transactionDate.split("-")[2].split("T")[0]}</span> 
                                                    <span className="d-block text-1 font-weight-300 text-uppercase">{this.handleMonth(element.transactionDate.split("-")[1])}</span> 
                                                </div>
                                                <div className="col col-sm-7"> 
                                                    <span className="d-block text-4">{element.card.name}</span> 
                                                    <span className="text-muted">{element.paymentPurpose.description}</span> 
                                                </div>
                                                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> 
                                                    <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle" /></span> 
                                                </div>
                                                <div className="col-3 col-sm-2 text-right text-4"> 
                                                    <span className="text-nowrap">{(element.amount/100).toLocaleString().split(',').join(' ')}</span> <span className="text-2 text-uppercase">({element.card.currency.code})</span> 
                                                </div>
                                            </div>
                                        </div>

                                     : ''}      

                                </>
                                )
                        })}                        
                        </>
                    }

            </div>
            {/* Transaction List End */}
            {/* Transaction Item Details Modal
                =========================================== */}
            
                {this.props.fTransactions && 
            <>
            {this.props.fTransactions.map((element, i) => {
                return (
                    <>

                        {i < 7 ? 
                        
                            <div key={i} id={"text-number-" + i} className="modal fade" role="dialog" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                    <div className="row no-gutters">
                                        <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                                        <div className="my-auto text-center">
                                            <div className="text-17 text-white my-3"><i className="fas fa-building" /></div>
                                            <h3 className="text-4 text-white font-weight-400 my-3">{element.paymentPurpose.displayName.toUpperCase()}</h3>
                                            <div className="text-8 font-weight-500 text-white my-4">{(element.amount/100).toLocaleString().split(',').join(' ')}</div>
                                            <p className="text-white">{element.transactionDate.split("-")[2].split("T")[0]} {this.handleMonth(element.transactionDate.split("-")[1])} {element.transactionDate.split("-")[0]}</p>
                                        </div>
                                        </div>
                                        <div className="col-sm-7">
                                        <h5 className="text-5 font-weight-400 m-3">Favorite Transaction
                                            <button id="controller-for-exit-modal" type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                                        </h5>
                                        <hr />
                                        <div className="px-3">
                                            <ul className="list-unstyled">
                                            <li className="mb-2">Payment Amount <span className="float-right text-3">{((element.amount/100)*100/105).toLocaleString().split(',').join(' ')}</span></li>
                                            <li className="mb-2">Fee <span className="float-right text-3">{((element.amount/100) - (element.amount/100)*100/105).toLocaleString().split(',').join(' ')}</span></li>
                                            </ul>
                                            <hr className="mb-2" />
                                            <p className="d-flex align-items-center font-weight-500 mb-4">Total Amount <span className="text-3 ml-auto">{((element.amount/100)).toLocaleString().split(',').join(' ')}</span></p>
                                            <ul className="list-unstyled">
                                            <li className="font-weight-500">Paid By:</li>
                                            <li className="text-muted">{element.card.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.card.cardNumber.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</li>
                                            </ul>
                                            <ul className="list-unstyled">
                                            <li className="font-weight-500">Recieved By:</li>
                                            <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</li>
                                            </ul>
                                            <ul className="list-unstyled">
                                            <li className="font-weight-500">Reciever Name:</li>
                                            <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_name"})].value}</li>
                                            </ul>
                                            <ul className="list-unstyled">
                                            <li className="font-weight-500">Status:</li>
                                            <li className="text-muted">Completed</li>
                                            </ul>
                                            <ul className="list-unstyled pb-2">
                                            <li className="pb-4">
                                                <span className="float-left"><a onClick={e => this.handleDeleteFavoriteTransaction(`${element.id}`)} className="btn btn-outline-primary btn-sm shadow-none d-none d-sm-block card-add-f-btn">Delete</a></span>
                                                <span className="float-right"><a onClick={e => this.handleRePay(`${element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_card_number"})].value}-${element.properties[element.properties.findIndex(function(obj){return obj.key === "card_expiration_date"})].value}-${element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_name"})].value}-${element.transactionType.name}-${Math.abs((element.amount/100)*100/105)}`)} className="btn btn-outline-primary btn-sm shadow-none d-none d-sm-block card-add-f-btn">Pay</a></span>
                                            </li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        
                        : ''}                    

                    </>
                                )
                        })}                        
                        </>
                    }

            {/* Transaction Item Details Modal End */}
            {/* View all Link
                =============================== */}
            <div className="text-center mt-4"><Link href="/cabinet-history"><a className="btn-link text-3">View all<i className="fas fa-chevron-right text-2 ml-2" /></a></Link></div>
        </div> 
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        pNumber: state.phoneNumber,
        fTransactions: state.favoriteTransactions
    }
}

export default connect(mapStateToProps)(RecentActivity)