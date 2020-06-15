import React from 'react';
import ProfileDetails from './../Cabinet/ProfileDetails';
import AviableBalance from './../Cabinet/AviableBalance';
import ProfileCompleteness from './../Cabinet/ProfileCompleteness';
import RecentActivity from './../Cabinet/RecentActivity';
import MainFooter from './../Layouts/MainFooter';
import CreditCards from './../Cabinet/CreditCards';

class ProfileDashboard extends React.Component {
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
                                <CreditCards />
                                <RecentActivity />                       
                            </div>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }
}

export default ProfileDashboard