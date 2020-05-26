import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Cookie from 'js-cookie';
import Link from 'next/link';

import {addCard} from './../../store/actions/cartActions';
import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

import Languages from './../../store/languages.json';

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
                        <li className="nav-item"> <Link href="/cabinet-sned"><a className={`nav-link ${send} card-add-f-btn`}>{Languages.page.cabenet_money_send.Уз_уз.t1}</a></Link></li>
                        <li className="nav-item"> <Link href="/cabinet-request"><a className={`nav-link ${request} card-add-f-btn`}>{Languages.page.cabenet_money_send.Уз_уз.t2}</a></Link></li>
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