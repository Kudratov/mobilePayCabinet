import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileDashboard from '../components/Layouts/ProfileDashboard';

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
