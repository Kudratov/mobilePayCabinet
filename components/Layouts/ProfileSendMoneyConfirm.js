import React from 'react';
import ConfirmSendMoney from './../Cabinet/ConfirmSendMoney';
import MainFooter from './../Layouts/MainFooter';

class ProfileSendMoneyConfirm extends React.Component {
    render() {        
        return (
            <div id="main-wrapper">
                <ConfirmSendMoney />
                <MainFooter />
            </div>
        );
    }
}

export default ProfileSendMoneyConfirm