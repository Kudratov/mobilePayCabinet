import React, { Component } from 'react';

class Welcome extends Component {

    render() {
        return (
            <div className="col-md-6">
                <div className="hero-wrap d-flex align-items-center h-100">
                    <div className="hero-mask opacity-8 bg-primary" />
                    <div className="hero-bg hero-bg-scroll" style={{backgroundImage: 'url("./../../images/bg/image-3.jpg")'}} />
                    <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
                    <div className="row no-gutters">
                        <div className="col-10 col-lg-9 mx-auto">
                        <div className="logo mt-5 mb-5 mb-md-0"> <a className="d-flex" href="index.html" title="Payyed - HTML Template"><img src="images/logo-light.png" alt="Payyed" /></a> </div>
                        </div>
                    </div>
                    <div className="row no-gutters my-auto">
                        <div className="col-10 col-lg-9 mx-auto">
                        <h1 className="text-11 text-white mb-4">Welcome back!</h1>
                        <p className="text-4 text-white line-height-4 mb-5">We are glad to see you again! Instant deposits, withdrawals &amp; payouts trusted by millions worldwide.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Welcome;
