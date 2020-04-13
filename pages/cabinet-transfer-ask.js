import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetTransferAsk from '../components/Cabinet/TransferAsk';
import Sideber from '../components/Cabinet/Sideber';

class Transfer extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={"transfer"}/>
                <CabinetTransferAsk url={"ask"}/>
            </React.Fragment>
        );
    }
}

export default Transfer;
