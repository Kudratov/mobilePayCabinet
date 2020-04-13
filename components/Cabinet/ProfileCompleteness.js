import React from 'react';

class ProfileCompleteness extends React.Component {
    render() {        
        return (
            <div className="bg-light shadow-sm rounded p-4 mb-4 same-height">
                <h3 className="text-5 font-weight-400 d-flex align-items-center mb-3">Profile Completeness <span className="bg-light-4 text-success rounded px-2 py-1 font-weight-400 text-2 ml-2">50%</span></h3>
                <div className="row profile-completeness">
                <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                    <div className="border rounded p-3 text-center"> <span className="d-block text-10 text-light mt-2 mb-3"><i className="fas fa-mobile-alt" /></span> <span className="text-5 d-block text-success mt-4 mb-3"><i className="fas fa-check-circle" /></span>
                    <p className="mb-0">Mobile Added</p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                    <div className="border rounded p-3 text-center"> <span className="d-block text-10 text-light mt-2 mb-3"><i className="fas fa-envelope" /></span> <span className="text-5 d-block text-success mt-4 mb-3"><i className="fas fa-check-circle" /></span>
                    <p className="mb-0">Email Added</p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3 mb-4 mb-sm-0">
                    <div className="border rounded p-3 text-center"> <span className="d-block text-10 text-light mt-2 mb-3"><i className="fas fa-credit-card" /></span> <span className="text-5 d-block text-light mt-4 mb-3"><i className="far fa-circle " /></span>
                    <p className="mb-0"><a className="btn-link stretched-link" href>Add Card</a></p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3">
                    <div className="border rounded p-3 text-center"> <span className="d-block text-10 text-light mt-2 mb-3"><i className="fas fa-university" /></span> <span className="text-5 d-block text-light mt-4 mb-3"><i className="far fa-circle " /></span>
                    <p className="mb-0"><a className="btn-link stretched-link" href>Add Bank Account</a></p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ProfileCompleteness