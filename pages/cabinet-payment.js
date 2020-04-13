import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetPayment from '../components/Cabinet/Payment';
import Sideber from '../components/Cabinet/Sideber';

class Payment extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={"payment"}/>
                <CabinetPayment />
            </React.Fragment>
        );
    }
}

export default Payment;
