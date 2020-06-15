import React from 'react';
import CabinetHomePayment from './../Cabinet/CabinetHomePayment';
import ProfileDetails from './../Cabinet/ProfileDetails';
import AviableBalance from './../Cabinet/AviableBalance';
import MainFooter from './../Layouts/MainFooter';

class ProfileHomePayment extends React.Component {
    render() {        
        return (
            <div id="main-wrapper">
                <div id="content" className="py-4">
                    <div className="container">
                        <div className="row">
                            <aside className="col-lg-3">
                                <ProfileDetails />
                                <AviableBalance />                                
                            </aside>
                            <div className="col-lg-9">
                                <CabinetHomePayment />                              
                            </div>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }
}

export default ProfileHomePayment