import React from 'react';

class SecurtyPassword extends React.Component {
    render() {        
        return (
            <div>
                <div>
                    <div className="bg-light shadow-sm rounded p-4">
                        <h3 className="text-5 font-weight-400 mb-3">Security <a href="#change-password" data-toggle="modal" className="float-right text-1 text-uppercase text-muted btn-link"><i className="fas fa-edit mr-1" />Edit</a></h3>
                        <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                            <label className="col-form-label">Password</label>
                        </p>
                        <p className="col-sm-9">
                            <input type="password" className="form-control-plaintext" data-bv-field="password" id="password" defaultValue="EnterPassword" />
                        </p>
                        </div>
                    </div>
                    {/* Edit Details Modal
                        ================================== */}
                    <div id="change-password" className="modal fade " role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title font-weight-400">Change Password</h5>
                            <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                            </div>
                            <div className="modal-body p-4">
                            <form id="changePassword" method="post">
                                <div className="form-group">
                                <label htmlFor="existingPassword">Confirm Current Password</label>
                                <input type="text" className="form-control" data-bv-field="existingpassword" id="existingPassword" required placeholder="Enter Current Password" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="text" className="form-control" data-bv-field="newpassword" id="newPassword" required placeholder="Enter New Password" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input type="text" className="form-control" data-bv-field="confirmgpassword" id="confirmPassword" required placeholder="Enter Confirm New Password" />
                                </div>
                                <button className="btn btn-primary btn-block mt-4" type="submit">Update Password</button>
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

export default SecurtyPassword