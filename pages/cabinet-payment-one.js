import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfilePayment from '../components/Layouts/ProfilePayment';

class CabinetPayment extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"payment"} />
                <ProfilePayment />
            </React.Fragment>
        );
    }
}

export default CabinetPayment;
