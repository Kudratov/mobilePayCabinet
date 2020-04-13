import React, { Component } from 'react';
import Navbar from '../components/Layouts/MainNavbar';
import ProfileSendMoney from '../components/Layouts/ProfileSendMoney';
import SecondaryMenu from '../components/Layouts/SecondaryMenu';

class Cards extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar url={"transfer"} />
                <SecondaryMenu url={"send"} />
                <ProfileSendMoney />
            </React.Fragment>
        );
    }
}

export default Cards;
