import React from 'react';
import SendMoney from './../Cabinet/SendMoney';
import MainFooter from './../Layouts/MainFooter';

class ProfileSendMoney extends React.Component {
    render() {        
        return (
            <div id="main-wrapper">
                <SendMoney />
                <MainFooter />
            </div>
        );
    }
}

export default ProfileSendMoney