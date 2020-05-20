import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookie from 'js-cookie';

// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import "./../../assets/sass/stylesheet.scss";
import "./../../assets/vendor/font-awesome/css/all.min.css";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class MainNavbar extends React.Component {

    constructor(props){
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(){
        Cookie.remove("authtoken");
        Cookie.remove("phonenumber");
        Cookie.remove("expr");
        Cookie.remove("pathName");
        Cookie.remove("verifiedCon");

        Router.push("/login")
    }
    
    render() {
        const classForMain = (this.props.url === 'main') ? 'active' : '';
        const classForTransfer = (this.props.url === 'transfer') ? 'active' : '';
        const classForPayment = (this.props.url === 'payment') ? 'active' : '';
        const classForHistory = (this.props.url === 'history') ? 'active' : '';
        const classForCards = (this.props.url === 'cards') ? 'active' : '';   
        const classForSettings = (this.props.url === 'settings') ? 'active' : '';   
        return (
            <div id="main-wrapper">
                <header id="header">
                    <div className="container maim-navbar-container">
                    <div className="header-row">
                        <div className="header-column justify-content-start"> 
                        {/* Logo
                    ============================= */}
                        <div className="logo"> <a className="d-flex" href="index.html" title="Payyed - HTML Template"><img src="./../../images/logo.png" alt="Payyed" /></a> </div>
                        {/* Logo end */} 
                        {/* Collapse Button
                    ============================== */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-nav"> <span /> <span /> <span /> </button>
                        {/* Collapse Button end */} 
                        {/* Primary Navigation
                    ============================== */}
                        <nav className="primary-menu navbar navbar-expand-lg">
                            <div id="header-nav" className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className={classForMain}><Link href="/cabinet-main"><a>Dashboard</a></Link></li>
                                <li className={classForHistory}><Link href="/cabinet-history">Transactions</Link></li>
                                <li className={classForPayment}><Link href="/cabinet-payment">Payment</Link></li>
                                <li className={classForTransfer}><Link href="/cabinet-send">Send/Request</Link></li>
                                <li className={classForCards}><Link href="/cabinet-cards">Cards</Link></li>
                            </ul>
                            </div>
                        </nav>
                        {/* Primary Navigation end */} 
                        </div>
                        <div className="header-column justify-content-end"> 
                        {/* Login & Signup Link
                    ============================== */}
                        <nav className="login-signup navbar navbar-expand">
                            <ul className="navbar-nav">
                            <li className={classForSettings}><Link href="/cabinet-settings">Settings</Link> </li>
                            <li className="align-items-center h-auto ml-sm-3"><a onClick={this.handleSignOut} className="btn btn-outline-primary shadow-none d-none d-sm-block card-add-f-btn" href>Sign out</a></li>
                            </ul>
                        </nav>
                        {/* Login & Signup Link end */} 
                        </div>
                    </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default MainNavbar