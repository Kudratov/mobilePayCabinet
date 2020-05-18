import React from 'react';

class PhoneNumber extends React.Component {
    render() {        
        return (
            <div>
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 className="text-5 font-weight-400 mb-3">Phone <a href="#edit-phone" data-toggle="modal" className="float-right text-1 text-uppercase text-muted btn-link"><i className="fas fa-edit mr-1" />Edit</a></h3>
                    <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">Mobile <span className="text-muted font-weight-500">(Primary)</span></p>
                        <p className="col-sm-9">+1 202-555-0125</p>
                    </div>
                    </div>
                    {/* Edit Details Modal
                    ================================== */}
                    <div id="edit-phone" className="modal fade " role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title font-weight-400">Phone</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                        </div>
                        <div className="modal-body p-4">
                            <form id="phone" method="post">
                            <div className="row">
                                <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile <span className="text-muted font-weight-500">(Primary)</span></label>
                                    <input type="text" defaultValue="+1 202-555-0125" className="form-control" data-bv-field="mobilenumber" id="mobileNumber" required placeholder="Mobile Number" />
                                </div>
                                </div>
                            </div>
                            <a className="btn-link text-uppercase d-flex align-items-center text-1 float-right mb-3" href="#"><span className="text-3 mr-1"><i className="fas fa-plus-circle" /></span>Add another Phone</a>
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

export default PhoneNumber