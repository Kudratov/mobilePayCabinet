import React from 'react';
import moment from "moment";
import {connect} from 'react-redux';
import axios from 'axios';

import {url} from './../../store/urls';
import {addTransactionHistory, addTransactionInfo, addTransactionCardIDs} from './../../store/actions/cartActions';

import Languages from './../../store/languages.json';

class TransactionsHistoryLists extends React.Component {

    constructor(props){
        super(props);
        this.handleMonth = this.handleMonth.bind(this);
        this.handlePrevAndNext = this.handlePrevAndNext.bind(this);
    }

    handleMonth(pos){
        let monthes = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return monthes[Number(pos) - 1];
    }

    handlePrevAndNext (page) {
        let _urlTran = `${url}transactions-api/v1.0/transactions`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        let data = {
            from: this.props.startDate,
            to: this.props.endDate,
            pageNumber: `${page}`,
            pageSize: '7',
            cardIds: this.props.transactionHCardIDs
        }
        axios.post(`${_urlTran}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                this.props.dispatch(addTransactionInfo(`${response.data.currentPage}-${Math.ceil(response.data.totalCount/response.data.pageSize)}-${response.data.hasMore}`));
                this.props.dispatch(addTransactionHistory(response.data.transactions.sort(function(a, b){return new Date(b.transactionDate) - new Date(a.transactionDate)})));
            })
            .catch((error) => {
                
            })
    }

    render() {
        const prev_btn = this.props.currentPage < 2 ? 'disabled' : '';
        const next_btn = this.props.hasMore === 'true' ? '' : 'disabled';
        return (
            <div className="bg-light shadow-sm rounded py-4 mb-4">
                <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-3">{Languages.page.cabenet_history[this.props.language].t2}</h3>
                {/* Title
                    =============================== */}
                <div className="transaction-title py-2 px-4">
                    <div className="row">
                    <div className="col-2 col-sm-1 text-center"><span className>{Languages.page.cabenet_history[this.props.language].t5}</span></div>
                    <div className="col col-sm-7">{Languages.page.cabenet_history[this.props.language].t9}</div>
                    <div className="col-auto col-sm-2 d-none d-sm-block text-center">{Languages.page.cabenet_history[this.props.language].t6}</div>
                    <div className="col-3 col-sm-2 text-right">{Languages.page.cabenet_history[this.props.language].t7}</div>
                    </div>
                </div>
                {/* Title End */}
                {/* Transaction List
                    =============================== */}
                <div className="transaction-list">

                {this.props.transactionHistory && 
                        <>
                        {this.props.transactionHistory.map((element, i) => {
                            return (
                                <>

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
                                            <span className="text-nowrap">{element.paymentPurpose.code === "transfer" ? element.card.cardProduct.name === "UzCard" && element.amount > 0 ? `+${(element.amount/100).toLocaleString().split(',').join(' ')}` : `${(element.amount).toLocaleString().split(',').join(' ')}`  : `${(element.amount).toLocaleString().split(',').join(' ')}`}</span><br/> <span className="text-2 text-uppercase">{element.card.cardProduct.name === "UzCard" || element.card.cardProduct.name === "Humo" ? "(UZS)" : "(USD)"}</span> 
                                        </div>
                                    </div>
                                </div>

                    </>
                                )
                        })}                        
                        </>
                    }

                </div>
                {/* Transaction List End */}
                {/* Transaction Item Details Modal
                    =========================================== */}

        {this.props.transactionHistory && 
            <>
            {this.props.transactionHistory.map((element, i) => {            
                return (
                <>

                    {element.amount > 0 ? 
                    
                        <div key={i} id={"text-number-" + i} className="modal fade" role="dialog" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                <div className="row no-gutters">
                                    <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                                    <div className="my-auto text-center">
                                        <div className="text-17 text-white my-3"><i className="fas fa-building" /></div>
                                        <h3 className="text-4 text-white font-weight-400 my-3">{element.paymentPurpose.displayName.toUpperCase()}</h3>
                                        <div className="text-8 font-weight-500 text-white my-4">+{element.card.cardProduct.name === "UzCard" ? `${(element.amount/100*0.995).toLocaleString().split(',').join(' ')}` : `${(element.amount*0.995).toLocaleString().split(',').join(' ')}`}</div>
                                        <p className="text-white">{element.transactionDate.split("-")[2].split("T")[0]} {this.handleMonth(element.transactionDate.split("-")[1])} {element.transactionDate.split("-")[0]}</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-7">
                                    <h5 className="text-5 font-weight-400 m-3">Transaction Details
                                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                                    </h5>
                                    <hr />
                                    <div className="px-3">
                                        <ul className="list-unstyled">
                                        <li className="mb-2 font-weight-500">Total Amount <span className="float-right text-3 font-weight-500">+{element.card.cardProduct.name === "UzCard" ? `${(element.amount/100*0.995).toLocaleString().split(',').join(' ')}` : `${(element.amount*0.995).toLocaleString().split(',').join(' ')}`}</span></li>
                                        {/* <li className="mb-2">Fee <span className="float-right text-3">{((element.amount/100) - (element.amount/100)*100/100.5).toLocaleString().split(',').join(' ')}</span></li> */}
                                        </ul>
                                        <hr className="mb-2" />
                                        {/* <p className="d-flex align-items-center font-weight-500 mb-4">Total Amount <span className="text-3 ml-auto">{((element.amount/100)).toLocaleString().split(',').join(' ')}</span></p> */}
                                        <ul className="list-unstyled">
                                        <li className="font-weight-500">Recieved By:</li>
                                        <li className="text-muted">{element.card.cardNumber.split("")[0]}{element.card.cardNumber.split("")[1]}{element.card.cardNumber.split("")[2]}{element.card.cardNumber.split("")[3]} **** **** {element.card.cardNumber.split("")[12]}{element.card.cardNumber.split("")[13]}{element.card.cardNumber.split("")[14]}{element.card.cardNumber.split("")[15]}</li>
                                        </ul>
                                        {/* <ul className="list-unstyled">
                                        <li className="font-weight-500">Sent By:</li>
                                        <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "sender_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.properties[element.properties.findIndex(function(obj){return obj.key === "sender_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</li>
                                        </ul>
                                        <ul className="list-unstyled">
                                        <li className="font-weight-500">Sender Name:</li>
                                        <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "sender_name"})].value}</li>
                                        </ul> */}
                                        <ul className="list-unstyled">
                                        <li className="font-weight-500">Status: <span className="text-muted float-right">Completed</span></li>
                                        <li className="font-weight-500 pt-1">Time: <span className="text-muted float-right">{element.transactionDate.split("T")[1]}</span></li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                    : 
                    
                    <div id={"text-number-" + i} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                        <div className="row no-gutters">
                            <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                            <div className="my-auto text-center">
                                <div className="text-17 text-white my-3"><i className="fas fa-building" /></div>
                                <h3 className="text-4 text-white font-weight-400 my-3">{element.paymentPurpose.displayName.toUpperCase()}</h3>
                                <div className="text-8 font-weight-500 text-white my-4">{element.paymentPurpose.code === "transfer" ? element.card.cardProduct.name === "UzCard" ? `${(element.amount/100).toLocaleString().split(',').join(' ')}` : `${(element.amount).toLocaleString().split(',').join(' ')}`  : `${(element.amount).toLocaleString().split(',').join(' ')}`}</div>
                                <p className="text-white">{element.transactionDate.split("-")[2].split("T")[0]} {this.handleMonth(element.transactionDate.split("-")[1])} {element.transactionDate.split("-")[0]}</p>
                            </div>
                            </div>
                            <div className="col-sm-7">
                            <h5 className="text-5 font-weight-400 m-3">Transaction Details
                                <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                            </h5>
                            <hr />
                            <div className="px-3">
                                {element.paymentPurpose.code === "transfer" &&
                                <ul className="list-unstyled">
                                <li className="mb-2">Payment Amount <span className="float-right text-3">{element.card.cardProduct.name === "UzCard" ? `${(element.amount/100 * 0.995).toLocaleString().split(',').join(' ')}` : `${(element.amount * 0.995).toLocaleString().split(',').join(' ')}`}</span></li>
                                <li className="mb-2">Fee <span className="float-right text-3">{element.card.cardProduct.name === "UzCard" ? `${(element.amount/100 * 0.005).toLocaleString().split(',').join(' ')}` : `${(element.amount * 0.005).toLocaleString().split(',').join(' ')}`}</span></li>
                                </ul>
                                }
                                <hr className="mb-2" />
                                <p className="d-flex align-items-center font-weight-500 mb-4">Total Amount <span className="text-3 ml-auto">{element.paymentPurpose.code === "transfer" ? element.card.cardProduct.name === "UzCard" ? `${(element.amount/100).toLocaleString().split(',').join(' ')}` : `${(element.amount).toLocaleString().split(',').join(' ')}`  : `${(element.amount).toLocaleString().split(',').join(' ')}`}</span></p>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Paid By:</li>
                                <li className="text-muted">{element.card.cardNumber.split("")[0]}{element.card.cardNumber.split("")[1]}{element.card.cardNumber.split("")[2]}{element.card.cardNumber.split("")[3]} **** **** {element.card.cardNumber.split("")[12]}{element.card.cardNumber.split("")[13]}{element.card.cardNumber.split("")[14]}{element.card.cardNumber.split("")[15]}</li>
                                </ul>
                                {/* <ul className="list-unstyled">
                                <li className="font-weight-500">Recieved By:</li>
                                <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_card_number"})].value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</li>
                                </ul>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Reciever Name:</li>
                                <li className="text-muted">{element.properties[element.properties.findIndex(function(obj){return obj.key === "receiver_name"})].value}</li>
                                </ul> */}
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Status: <span className="text-muted float-right">Completed</span></li>
                                <li className="font-weight-500 pt-1">Time: <span className="text-muted float-right">{element.transactionDate.split("T")[1]}</span></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                    }

                </>
                                )
                        })}                        
                        </>
                    }

                {/* Transaction Item Details Modal End */}
                {/* Pagination
                    ============================================= */}
                <ul className="pagination justify-content-center mt-4 mb-0">
                    <li className={`page-item ${prev_btn}`}> <a onClick={e => this.handlePrevAndNext(Number(this.props.currentPage) - 1)} className="page-link"><i className="fas fa-angle-left" /> {Languages.page.cabenet_history[this.props.language].t10}</a> </li>
                    <li className={`page-item ${next_btn}`}> <a onClick={e => this.handlePrevAndNext(Number(this.props.currentPage) + 1)} className="page-link">{Languages.page.cabenet_history[this.props.language].t11} <i className="fas fa-angle-right" /></a> </li>
                </ul>
                {/* Paginations end */} 
                </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        transactionHCardIDs: state.transactionHCardIDs,
        currentPage: state.transactionInfo.split("-")[0],
        lastPage: state.transactionInfo.split("-")[1],
        hasMore: state.transactionInfo.split("-")[2],
        transactionHistory: state.transactionHistory
    }
}

export default connect(mapStateToProps)(TransactionsHistoryLists);