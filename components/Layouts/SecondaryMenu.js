import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import cookies from 'next-cookies';
import Cookie from 'js-cookie';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';


class SecondaryMenu extends React.Component {
    componentDidMount () {
        if(this.props.token && this.props.pNumber){
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
            let __url = `${url}cards-api/v1.0/cards`;
            axios.get(`${__url}`, {headers: headers})
            .then((response) => {
                this.props.dispatch(addCard(response.data));
            })
            .catch((error) => {
                    localStorage.removeItem('user-credentials');
                    Router.push('/');
            })
        } else if(!this.props.token && !this.props.pNumber) {
            if(true){
                this.props.dispatch(addAuthtoken(Cookie.get('authtoken')));
                this.props.dispatch(addPhoneNumber(Cookie.get('phonenumber')));
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Cookie.get('authtoken')}`
                }
                let __url = `${url}cards-api/v1.0/cards`;
                axios.get(`${__url}`, {headers: headers})
                .then((response) => {
                    Cookie.set('verifiedCon', 'known');
                    this.props.dispatch(addCard(response.data));
                })
                .catch((error) => {
                    console.log(error)
                })
            } else{
                Router.push('/');
            }
        }
    }
    render() {
        const send = (this.props.url === 'send') ? 'active' : '';
        const request = (this.props.url === 'request') ? 'active' : '';
        return (
            <div id="main-wrapper">
                <div className="bg-primary">
                    <div className="container d-flex justify-content-center">
                    <ul className="nav secondary-nav">
                        <li className="nav-item"> <a className={`nav-link ${send}`} href="/cabinet-sned">Send</a></li>
                        <li className="nav-item"> <a className={`nav-link ${request}`} href="/cabinet-request">Request</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        pNumber: state.phoneNumber,
        cardCred: state.cardCred,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(SecondaryMenu)