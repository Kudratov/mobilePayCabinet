import React from 'react';

class EmailAddress extends React.Component {
    render() {        
        return (
            <div>
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                        <h3 className="text-5 font-weight-400 mb-3">Email Addresses <a href="#edit-email" data-toggle="modal" className="float-right text-1 text-uppercase text-muted btn-link"><i className="fas fa-edit mr-1" />Edit</a></h3>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">Email ID <span className="text-muted font-weight-500">(Primary)</span></p>
                        <p className="col-sm-9">smithrhodes1982@gmail.com</p>
                        </div>
                    </div>
                    {/* Edit Details Modal
                        ================================== */}
                    <div id="edit-email" className="modal fade " role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title font-weight-400">Email Addresses</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                            </div>
                            <div className="modal-body p-4">
                            <form id="emailAddresses" method="post">
                                <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                    <label htmlFor="emailID">Email ID <span className="text-muted font-weight-500">(Primary)</span></label>
                                    <input type="text" defaultValue="smithrhodes1982@gmail.com" className="form-control" data-bv-field="emailid" id="emailID" required placeholder="Email ID" />
                                    </div>
                                </div>
                                </div>
                                <a className="btn-link text-uppercase d-flex align-items-center text-1 float-right mb-3" href="#"><span className="text-3 mr-1"><i className="fas fa-plus-circle" /></span>Add another email</a>
                                <button className="btn btn-primary btn-block" type="submit">Save Changes</button>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
        );
    }
}

export default EmailAddress