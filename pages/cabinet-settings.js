import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileSettings from '../components/Layouts/ProfileSettings';

class CabinetMain extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"settings"} />
                <ProfileSettings />
            </React.Fragment>
        );
    }
}

export default CabinetMain;
