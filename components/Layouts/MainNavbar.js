import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookie from 'js-cookie';
import {connect} from 'react-redux';

// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import "./../../assets/sass/stylesheet.scss";
// import "./../../assets/vendor/font-awesome/css/all.min.css";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Languages from './../../store/languages.json';


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
                        <div className="logo"> <Link href="/"><a className="d-flex" title="mobilePay"><img className="logo-vinn" src="./../../images/logo.png" alt="vinn" /></a></Link> </div>
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
                                <li className={classForMain}><Link href="/cabinet-main"><a>{Languages.page.cabinet_main[this.props.language].t1}</a></Link></li>
                                <li className={classForHistory}><Link href="/cabinet-history">{Languages.page.cabinet_main[this.props.language].t2}</Link></li>
                                <li className={classForPayment}><Link href="/cabinet-payment">{Languages.page.cabinet_main[this.props.language].t3}</Link></li>
                                <li className={classForTransfer}><Link href="/cabinet-send">{Languages.page.cabinet_main[this.props.language].t4}</Link></li>
                                <li className={classForCards}><Link href="/cabinet-cards">{Languages.page.cabinet_main[this.props.language].t5}</Link></li>
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
                            <li className={classForSettings}><Link href="/cabinet-settings">{Languages.page.cabinet_main[this.props.language].t6}</Link> </li>
                            <li className="align-items-center h-auto ml-sm-3"><a onClick={this.handleSignOut} className="btn btn-outline-primary shadow-none d-none d-sm-block card-add-f-btn">{Languages.page.cabinet_main[this.props.language].t7}</a></li>
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

const mapStateToProps = (state)=>{
    return {
        language: state.language
    }
}

export default connect(mapStateToProps)(MainNavbar)