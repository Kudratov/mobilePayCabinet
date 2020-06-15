import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileHomePayment from '../components/Layouts/ProfileHomePayment';

class CabinetHomephonePayment extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"payment"} />
                <ProfileHomePayment />
            </React.Fragment>
        );
    }
}

export default CabinetHomephonePayment;
