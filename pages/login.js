import React, { Component } from 'react';
import ProfileLogin from './../components/Layouts/ProfileLogin';
import PreLoader from './../components/Cabinet/Assets/Preloader'

import './../assets/css/css/stylesheet.css';

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <PreLoader /> */}
                <ProfileLogin />
            </React.Fragment>
        );
    }
}

export default Login;
