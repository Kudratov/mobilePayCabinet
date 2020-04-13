import React from 'react';
import GotVerified from './../Signup/GotVerified';
import Signup from './../Signup/Signup';

import './../../assets/vendor/font-awesome/css/all.min.css';
import './../../assets/sass/stylesheet.scss';

class ProfileSignup extends React.Component {
    render() {        
        return (
            <div id="main-wrapper" className="h-100">
                <div className="container-fluid px-0 h-100-class">
                    <div className="row no-gutters h-100">
                        <GotVerified />
                        <Signup />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileSignup