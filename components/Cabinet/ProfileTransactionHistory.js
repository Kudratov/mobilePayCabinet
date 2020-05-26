import React from 'react';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from "moment";
import {connect} from 'react-redux';
import axios from 'axios';

import TransactionsHistoryLists from './TransactionsHistoryLists';

import Languages from './../../store/languages.json';

import {addTransactionHistory, addTransactionInfo, addTransactionCardIDs} from './../../store/actions/cartActions';
import {url} from './../../store/urls';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class ProfileTransactionHistory extends React.Component {
    constructor (props) {
        super(props);
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

    render() {
        return (
            <div>
                <h2 className="font-weight-400 mb-3">{Languages.page.cabenet_history.Уз_уз.t1}</h2>
                {/* Filter
                ============================================= */}
                <div className="row">
                <div className="col mb-2">
                    <form id="filterTransactions" method="post">
                    <div className="form-row">
                        {/* Date Range
                        ========================= */}
                        <div className="col-sm-6 col-md-5 form-group">
                        <DateRangePicker 
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={this.state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, 
                            () => {
                                this.setState({realEndDate: moment(this.state.startDate).format("YYYY-DD-MM"), realEndDate: moment(this.state.endDate).format("YYYY-DD-MM")},
                                () => {
                                    
                                    let _urlTran = `${url}transactions-api/v1.0/transactions`;
                                    const headers = {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        Authorization: `Bearer ${this.props.token}`
                                    }
                                    let data = {
                                        from: this.state.realStartDate.split("-")[0] + `-` + this.state.realStartDate.split("-")[2] + `-` + this.state.realStartDate.split("-")[1],
                                        to: this.state.realEndDate.split("-")[0] + `-` + this.state.realEndDate.split("-")[2] + `-` + this.state.realEndDate.split("-")[1],
                                        pageNumber: `1`,
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

                                })
                            })}
                            focusedInput={this.state.focusedInput}                            
                            onFocusChange={focusedInput => this.setState({focusedInput})}
                            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                            showDefaultInputIcon
                            inputIconPosition="after"
                        />
                        {/* <input id="dateRange" type="text" value="11" className="form-control" placeholder="Date Range" /> */}
                        {/* <span className="icon-inside"><i className="fas fa-calendar-alt" /></span>  */}
                        </div>
                        {/* All Filters Link
                        ========================= */}
                        <div className="col-auto d-flex align-items-center mr-auto form-group" data-toggle="collapse"> <a className="btn-link" data-toggle="collapse" href="#allFilters" aria-expanded="false" aria-controls="allFilters">{Languages.page.cabenet_history.Уз_уз.t3}<i className="fas fa-sliders-h text-3 ml-1" /></a> </div>
                        {/* Statements Link
                        ========================= */}
                        <div className="col-auto d-flex align-items-center ml-auto form-group">
                        <div className="dropdown"> <a className="text-muted btn-link" role="button" id="statements" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-file-download text-3 mr-1" />{Languages.page.cabenet_history.Уз_уз.t4}</a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="statements"> <a className="dropdown-item">CSV</a> <a className="dropdown-item" href="#">PDF</a> </div>
                        </div>
                        </div>
                        {/* All Filters collapse
                        ================================ */}
                        <div className="col-12 collapse mb-3" id="allFilters">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="allTransactions" name="allFilters" className="custom-control-input" defaultChecked />
                            <label className="custom-control-label" htmlFor="allTransactions">{Languages.page.cabenet_history.Уз_уз.t2}</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="paymentsSend" name="allFilters" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="paymentsSend">Payments Send</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="paymentsReceived" name="allFilters" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="paymentsReceived">Payments Received</label>
                        </div>
                        </div>
                        {/* All Filters collapse End */}
                    </div>
                    </form>
                </div>
                </div>
                <TransactionsHistoryLists startDate={this.state.realStartDate.split("-")[0] + `-` + this.state.realStartDate.split("-")[2] + `-` + this.state.realStartDate.split("-")[1]} endDate={this.state.realEndDate.split("-")[0] + `-` + this.state.realEndDate.split("-")[2] + `-` + this.state.realEndDate.split("-")[1]} />
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
        cards: state.cards,
        currentPage: state.transactionInfo.split("-")[0],
        transactionHCardIDs: state.transactionHCardIDs
    }
}

export default connect(mapStateToProps)(ProfileTransactionHistory);