import React from 'react';
import SuccessSendMoney from './../Cabinet/SuccessSendMoney';
import MainFooter from './../Layouts/MainFooter';

class ProfileSendMoneySuccess extends React.Component {
    render() {        
        return (
            <div id="main-wrapper">
                <SuccessSendMoney />
                <MainFooter />
            </div>
        );
    }
}

export default ProfileSendMoneySuccess