import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileCards from '../components/Layouts/ProfileCards';

class CabinetCards extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"cards"} />
                <ProfileCards />
            </React.Fragment>
        );
    }
}

export default CabinetCards;
