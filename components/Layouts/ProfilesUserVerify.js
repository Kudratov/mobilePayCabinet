import React from 'react';
import GotVerified from './../Signup/GotVerified';
import Verify from './../Signup/Verify';

class ProfileUserVerify extends React.Component {
    render() {        
        return (
            <div id="main-wrapper" className="h-100">
                <div className="container-fluid px-0 h-100-class">
                    <div className="row no-gutters h-100">
                        <GotVerified />
                        <Verify />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileUserVerify