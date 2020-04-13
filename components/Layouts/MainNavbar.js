import React from 'react';
import Link from 'next/link';

import "./../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "./../../assets/vendor/font-awesome/css/all.min.css";
import "./../../assets/sass/stylesheet.scss";


class MainNavbar extends React.Component {
    
    render() {
        const classForMain = (this.props.url === 'main') ? 'active' : '';
        const classForTransfer = (this.props.url === 'transfer') ? 'active' : '';
        const classForPayment = (this.props.url === 'payment') ? 'active' : '';
        const classForHistory = (this.props.url === 'history') ? 'active' : '';
        const classForCards = (this.props.url === 'cards') ? 'active' : '';      
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
                                <li className={classForPayment}><Link href="/cabinet-payment-one">Payment</Link></li>
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
                            <li><a href="profile.html">Settings</a> </li>
                            <li className="align-items-center h-auto ml-sm-3"><a className="btn btn-outline-primary shadow-none d-none d-sm-block" href>Sign out</a></li>
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