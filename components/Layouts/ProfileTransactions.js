import React from 'react';
import CabinetPayment from './../Cabinet/CaibinetPayment';
import MainFooter from './../Layouts/MainFooter';
import ProfileDetails from './../Cabinet/ProfileDetails';
import AviableBalance from './../Cabinet/AviableBalance';
import ProfileTransactionHistory from './../Cabinet/ProfileTransactionHistory';

class ProfileTransactions extends React.Component {
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
                                <ProfileTransactionHistory />                            
                            </div>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }
}

export default ProfileTransactions