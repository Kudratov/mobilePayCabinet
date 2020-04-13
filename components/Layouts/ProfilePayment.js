import React from 'react';
import CabinetPayment from './../Cabinet/CaibinetPayment';
import MainFooter from './../Layouts/MainFooter';

class ProfilePayment extends React.Component {
    render() {        
        return (
            <div id="main-wrapper">
                <CabinetPayment />
                <MainFooter />
            </div>
        );
    }
}

export default ProfilePayment