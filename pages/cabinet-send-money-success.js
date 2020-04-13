import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileSendMoneySuccess from '../components/Layouts/ProfileSendMoneySuccess';
import SecondaryMenu from '../components/Layouts/SecondaryMenu';

class CabinetSendMoneySuccess extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"transfer"} />
                <SecondaryMenu url={"send"} />
                <ProfileSendMoneySuccess />
            </React.Fragment>
        );
    }
}

export default CabinetSendMoneySuccess;
