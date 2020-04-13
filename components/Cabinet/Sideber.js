import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import Router from 'next/router';

import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        if(this.props.token && this.props.pNumber){
            //Everything is fine
        } else {
            if(JSON.parse(localStorage.getItem('user-credentials')).token.length && JSON.parse(localStorage.getItem('user-credentials')).pNumber.length){
                this.props.dispatch(addAuthtoken(JSON.parse(localStorage.getItem('user-credentials')).token));
                this.props.dispatch(addPhoneNumber(JSON.parse(localStorage.getItem('user-credentials')).pNumber));
            } else{
                Router.push('/');
            }
        }
    }
    render() {
        const classForMain = (this.props.url === 'main') ? 'add-white' : '';
        const classForTransfer = (this.props.url === 'transfer') ? 'add-white' : '';
        const classForPayment = (this.props.url === 'payment') ? 'add-white' : '';
        const classForHistory = (this.props.url === 'history') ? 'add-white' : '';
        const classForCards = (this.props.url === 'cards') ? 'add-white' : '';

        return (
            <Fragment>
            <div className="sidebar sidebar-left">
                <Link href="/cabinet-main">
                    <nav className={`row-siderbar ${classForMain}`}>                    
                        <a className="a-icon-text">
                            <span className="sidebar-logo icon-menu"><i class="fas fa-home"></i></span>
                            <span className={`sidebar-str ${classForMain}`}>Главная</span>
                        </a>                    
                    </nav>
                </Link>
                <Link href="/cabinet-transfer-send">
                    <nav className={`row-siderbar ${classForTransfer}`}>                    
                        <a className="a-icon-text">
                            <span className="sidebar-logo"><i class="fas fa-exchange-alt"></i></span>
                            <span className={`sidebar-str ${classForTransfer}`}>Перевод</span>
                        </a>
                    </nav>
                </Link>
                <Link href="/cabinet-payment">
                    <nav className={`row-siderbar ${classForPayment}`}>                    
                        <a className="a-icon-text">
                            <span className="sidebar-logo"><i class="fas fa-wallet"></i></span>
                            <span className={`sidebar-str ${classForPayment}`}>Оплата</span>
                        </a>                    
                    </nav>
                </Link>
                <Link href="/cabinet-history">
                    <nav className={`row-siderbar ${classForHistory}`}>                    
                        <a className="a-icon-text">
                            <span className="sidebar-logo"><i class="fas fa-history"></i></span>
                            <span className={`sidebar-str ${classForHistory}`}>Мониторинг</span>
                        </a>                    
                    </nav>
                </Link>
                <Link href="/cabinet-cards">
                    <nav className={`row-siderbar ${classForCards}`}>                    
                        <a className="a-icon-text">
                            <span className="sidebar-logo"><i class="fas fa-credit-card"></i></span>
                            <span className={`sidebar-str ${classForCards}`}>Мои карты</span>
                        </a>                    
                    </nav>
                </Link>
            </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        token: state.authToken,
        pNumber: state.phoneNumber
    }
}

export default connect(mapStateToProps)(Sidebar);
