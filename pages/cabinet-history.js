import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileTransactions from '../components/Layouts/ProfileTransactions';

class Payment extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"history"} />
                <ProfileTransactions />
            </React.Fragment>
        );
    }
}

export default Payment;
