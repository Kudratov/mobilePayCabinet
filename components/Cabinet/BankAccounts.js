import React from 'react';

class BankAccounts extends React.Component {
    render() {        
        return (
            <div className="bg-light shadow-sm rounded p-4 mb-4">
                <h3 className="text-5 font-weight-400 mb-4">Bank Accounts <span className="text-muted text-4">(for withdrawal)</span></h3>
                <div className="row">
                <div className="col-12 col-sm-6">
                    <div className="account-card account-card-primary text-white rounded mb-4 mb-lg-0">
                    <div className="row no-gutters">
                        <div className="col-3 d-flex justify-content-center p-3">
                        <div className="my-auto text-center text-13"> <i className="fas fa-university" />
                            <p className="bg-light text-0 text-body font-weight-500 rounded-pill d-inline-block px-2 line-height-4 opacity-8 mb-0">Primary</p>
                        </div>
                        </div>
                        <div className="col-9 border-left">
                        <div className="py-4 my-2 pl-4">
                            <p className="text-4 font-weight-500 mb-1">HDFC Bank</p>
                            <p className="text-4 opacity-9 mb-1">XXXXXXXXXXXX-9025</p>
                            <p className="m-0">Approved <span className="text-3"><i className="fas fa-check-circle" /></span></p>
                        </div>
                        </div>
                    </div>
                    <div className="account-card-overlay rounded"> <a href="#" data-target="#bank-account-details" data-toggle="modal" className="text-light btn-link mx-2"><span className="mr-1"><i className="fas fa-share" /></span>More Details</a> <a href="#" className="text-light btn-link mx-2"><span className="mr-1"><i className="fas fa-minus-circle" /></span>Delete</a> </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6"> <a href data-target="#add-new-bank-account" data-toggle="modal" className="account-card-new d-flex align-items-center rounded h-100 p-3 mb-4 mb-lg-0">
                    <p className="w-100 text-center line-height-4 m-0"> <span className="text-3"><i className="fas fa-plus-circle" /></span> <span className="d-block text-body text-3">Add New Bank Account</span> </p>
                    </a> </div>
                </div>
            </div>
        );
    }
}

export default BankAccounts