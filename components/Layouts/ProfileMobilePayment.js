import React from 'react';
import CabinetMobilePayment from './../Cabinet/CabinetMobilePayment';
import ProfileDetails from './../Cabinet/ProfileDetails';
import AviableBalance from './../Cabinet/AviableBalance';
import MainFooter from './../Layouts/MainFooter';

class ProfileMobilePayment extends React.Component {
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
                                <CabinetMobilePayment />                              
                            </div>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }
}

export default ProfileMobilePayment