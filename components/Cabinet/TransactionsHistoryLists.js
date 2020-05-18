import React from 'react';

class TransactionsHistoryLists extends React.Component {

    constructor(props){
        super(props);
        this.handleMonth = this.handleMonth.bind(this);
    }

    handleMonth(pos){
        let monthes = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return monthes[Number(pos) - 1];
    }

    render() {
        console.log(this.props.history)
        return (
            <div className="bg-light shadow-sm rounded py-4 mb-4">
                <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-3">All Transactions</h3>
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

                {this.props.history && 
                        <>
                        {this.props.history.map((element, i) => {
                            return (
                                <>

                                <div className="transaction-item px-4 py-3" data-toggle="modal" data-target={"#text-number-" + i}>
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
                                            <span className="text-nowrap">{element.amount.toLocaleString().split(',').join(' ')}</span> <span className="text-2 text-uppercase">({element.card.currency.code})</span> 
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

        {this.props.history && 
            <>
            {this.props.history.map((element, i) => {
                return (
                    <>

                <div id={"text-number-" + i} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                        <div className="row no-gutters">
                            <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                            <div className="my-auto text-center">
                                <div className="text-17 text-white my-3"><i className="fas fa-building" /></div>
                                <h3 className="text-4 text-white font-weight-400 my-3">{element.paymentPurpose.displayName.toUpperCase()}</h3>
                                <div className="text-8 font-weight-500 text-white my-4">{element.amount.toLocaleString().split(',').join(' ')}</div>
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
                                <li className="mb-2">Payment Amount <span className="float-right text-3">{(element.amount*100/100.5).toLocaleString().split(',').join(' ')}</span></li>
                                <li className="mb-2">Fee <span className="float-right text-3">{(element.amount - element.amount*100/100.5).toLocaleString().split(',').join(' ')}</span></li>
                                </ul>
                                <hr className="mb-2" />
                                <p className="d-flex align-items-center font-weight-500 mb-4">Total Amount <span className="text-3 ml-auto">{(element.amount).toLocaleString().split(',').join(' ')}</span></p>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Paid By:</li>
                                <li className="text-muted">{element.card.cardNumber}</li>
                                </ul>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Transaction ID:</li>
                                <li className="text-muted">{element.id}</li>
                                </ul>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Description:</li>
                                <li className="text-muted">{element.paymentPurpose.description}</li>
                                </ul>
                                <ul className="list-unstyled">
                                <li className="font-weight-500">Status:</li>
                                <li className="text-muted">Completed</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                </>
                                )
                        })}                        
                        </>
                    }

                {/* Transaction Item Details Modal End */}
                {/* Pagination
                    ============================================= */}
                <ul className="pagination justify-content-center mt-4 mb-0">
                    <li className="page-item disabled"> <a className="page-link" href="#" tabIndex={-1}><i className="fas fa-angle-left" /></a> </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active"> <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a> </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item d-flex align-content-center flex-wrap text-muted text-5 mx-1">......</li>
                    <li className="page-item"><a className="page-link" href="#">15</a></li>
                    <li className="page-item"> <a className="page-link" href="#"><i className="fas fa-angle-right" /></a> </li>
                </ul>
                {/* Paginations end */} 
                </div>
        );
    }
}

export default TransactionsHistoryLists