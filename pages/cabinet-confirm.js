import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileSendMoneyConfirm from '../components/Layouts/ProfileSendMoneyConfirm';
import SecondaryMenu from '../components/Layouts/SecondaryMenu';

class CabinetSendMoneyConfirm extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"transfer"} />
                <SecondaryMenu url={"send"} />
                <ProfileSendMoneyConfirm />
            </React.Fragment>
        );
    }
}

export default CabinetSendMoneyConfirm;
