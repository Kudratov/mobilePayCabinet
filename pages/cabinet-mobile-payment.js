import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileMobilePayment from '../components/Layouts/ProfileMobilePayment';

class CabinetMobilePayment extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"payment"} />
                <ProfileMobilePayment />
            </React.Fragment>
        );
    }
}

export default CabinetMobilePayment;
