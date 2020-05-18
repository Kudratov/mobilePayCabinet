import React from 'react';
import ProfileDetails from './../Cabinet/ProfileDetails';
import AviableBalance from './../Cabinet/AviableBalance';
import AccountSettings from './../Cabinet/AccountSettings';
import MainFooter from './../Layouts/MainFooter';
import PersonalDetails from './../Cabinet/PersonalDetails';
import EmailAddress from './../Cabinet/EmailAddress';
import PhoneNumber from './../Cabinet/PhoneNumber';
import SecurtyPassword from './../Cabinet/SecurtyPassword';

class ProfileSettings extends React.Component {
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
                                <PersonalDetails />
                                <AccountSettings />                          
                                <EmailAddress />                      
                                <PhoneNumber />                
                                <SecurtyPassword />                
                            </div>
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        );
    }
}

export default ProfileSettings