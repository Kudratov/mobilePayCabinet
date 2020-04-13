import React, { Component } from 'react';
import ProfileSignup from './../components/Layouts/ProfileSignup';
import PreLoader from './../components/Cabinet/Assets/Preloader'

class Signup extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <PreLoader /> */}
                <ProfileSignup />
            </React.Fragment>
        );
    }
}

export default Signup;
