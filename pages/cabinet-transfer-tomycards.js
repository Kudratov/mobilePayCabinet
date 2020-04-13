import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetTransferToMyCards from '../components/Cabinet/TransferToMyCards';
import Sideber from '../components/Cabinet/Sideber';

class Transfer extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={"transfer"}/>
                <CabinetTransferToMyCards url={"tomycards"}/>
            </React.Fragment>
        );
    }
}

export default Transfer;
