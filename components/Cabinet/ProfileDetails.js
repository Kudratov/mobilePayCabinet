import React from 'react';

class ProfileDetails extends React.Component {
    render() {        
        return (            
                <div className="bg-light shadow-sm rounded text-center p-3 mb-4">
                    <div className="profile-thumb mt-3 mb-4"> <img className="rounded-circle" src="./../../images/profile-thumb.jpg" alt="" />
                    <div className="profile-thumb-edit custom-file bg-primary text-white" data-toggle="tooltip" title="Change Profile Picture"> <i className="fas fa-camera position-absolute" />
                        <input type="file" className="custom-file-input" id="customFile" />
                    </div>
                    </div>
                    <p className="text-3 font-weight-500 mb-2">Hello, Smith Rhodes</p>
                    <p className="mb-2"><a href="profile.html" className="text-5 text-light" data-toggle="tooltip" title="Edit Profile"><i className="fas fa-edit" /></a></p>
                </div>            
        );
    }
}

export default ProfileDetails