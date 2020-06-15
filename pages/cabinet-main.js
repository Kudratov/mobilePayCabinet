import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileDashboard from '../components/Layouts/ProfileDashboard';

import './../assets/css/css/stylesheet.css';
// import './../assets/vendor/font-awesome/css/all.min.css'; 

class CabinetMain extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"main"} />
                <ProfileDashboard />
            </React.Fragment>
        );
    }
}

export default CabinetMain;
