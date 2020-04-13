import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetTransferSend from '../components/Cabinet/TransferSend';
import Sideber from '../components/Cabinet/Sideber';

class Transfer extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={"transfer"}/>
                <CabinetTransferSend url={"send"}/>
            </React.Fragment>
        );
    }
}

export default Transfer;
