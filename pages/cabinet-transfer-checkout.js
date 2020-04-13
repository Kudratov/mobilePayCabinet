import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetTransferCheckOut from '../components/Cabinet/TransderSendCheckOut';
import Sideber from '../components/Cabinet/Sideber';

class Transfer extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={""}/>
                <CabinetTransferCheckOut url={""}/>
            </React.Fragment>
        );
    }
}

export default Transfer;
