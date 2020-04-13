import React, { Component } from 'react';
import Navbar from '../components/Cabinet/Navbar';
import CabinetCardAdd from '../components/Cabinet/CabinetCardAdd';
import Sideber from '../components/Cabinet/Sideber';

class Cards extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Sideber url={"cards"}/>
                <CabinetCardAdd />
            </React.Fragment>
        );
    }
}

export default Cards;
