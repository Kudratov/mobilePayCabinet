import React from 'react';
import Link from 'next/link';

class SaasTools extends React.Component {

    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        evt.currentTarget.className += "current";
    }

    render() {
        return (
            <section className="saas-tools ptb-100 bg-gray">
                <div className="container">
                    <div className="section-title">
                        <h2>Tools for Everyone</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="tab">
                                <ul className="tabs active">
                                    <li
                                        className="current"
                                        onClick={(e) => this.openTabSection(e, 'tab1')}
                                    >
                                        <Link href="#">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <i className="icofont-dashboard-web"></i>
                                                <br />
                                                Dashboard
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        onClick={(e) => this.openTabSection(e, 'tab2')}
                                    >
                                        <Link href="#">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <i className="icofont-inbox"></i>
                                                <br />
                                                Inbox
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        onClick={(e) => this.openTabSection(e, 'tab3')}
                                    >
                                        <Link href="#">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <i className="icofont-ui-calendar"></i>
                                                <br />
                                                Calendar
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        onClick={(e) => this.openTabSection(e, 'tab4')}
                                    >
                                        <Link href="#">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <i className="icofont-copy-invert"></i>
                                                <br />
                                                Invoicing
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        onClick={(e) => this.openTabSection(e, 'tab5')}
                                    >
                                        <Link href="#">
                                            <a onClick={(e) => e.preventDefault()}>
                                                <i className="icofont-wrench"></i>
                                                <br />
                                                Reporting
                                            </a>
                                        </Link>
                                    </li>
                                </ul>

                                <div className="tab_content">
                                    <div id="tab1" className="tabs_item">
                                        <div className="row h-100 justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_content mt-0">
                                                    <h3>Dashboard</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                                    <ul>
                                                        <li><i className="icofont-ui-check"></i> Creative Design</li>
                                                        <li><i className="icofont-ui-check"></i> Retina Ready</li>
                                                        <li><i className="icofont-ui-check"></i> Modern Design</li>
                                                        <li><i className="icofont-ui-check"></i> Digital Marketing & Branding</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_img">
                                                    <img src={require('../../images/features-img1.png')} alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tab2" className="tabs_item">
                                        <div className="row h-100 justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_img">
                                                    <img src={require('../../images/features-img1.png')} alt="img" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_content mb-0">
                                                    <h3>Inbox</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                                    <ul>
                                                        <li><i className="icofont-ui-check"></i> Creative Design</li>
                                                        <li><i className="icofont-ui-check"></i> Retina Ready</li>
                                                        <li><i className="icofont-ui-check"></i> Modern Design</li>
                                                        <li><i className="icofont-ui-check"></i> Digital Marketing & Branding</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tab3" className="tabs_item">
                                        <div className="row h-100 justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_content mt-0">
                                                    <h3>Calendar</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                                    <ul>
                                                        <li><i className="icofont-ui-check"></i> Creative Design</li>
                                                        <li><i className="icofont-ui-check"></i> Retina Ready</li>
                                                        <li><i className="icofont-ui-check"></i> Modern Design</li>
                                                        <li><i className="icofont-ui-check"></i> Digital Marketing & Branding</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_img">
                                                    <img src={require('../../images/features-img1.png')} alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div id="tab4" className="tabs_item">
                                        <div className="row h-100 justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_img">
                                                    <img src={require('../../images/features-img1.png')} alt="img" />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_content mb-0">
                                                    <h3>Invoicing</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                                    <ul>
                                                        <li><i className="icofont-ui-check"></i> Creative Design</li>
                                                        <li><i className="icofont-ui-check"></i> Retina Ready</li>
                                                        <li><i className="icofont-ui-check"></i> Modern Design</li>
                                                        <li><i className="icofont-ui-check"></i> Digital Marketing & Branding</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div id="tab5" className="tabs_item">
                                        <div className="row h-100 justify-content-center align-items-center">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_content mt-0">
                                                    <h3>Reporting</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                                    <ul>
                                                        <li><i className="icofont-ui-check"></i> Creative Design</li>
                                                        <li><i className="icofont-ui-check"></i> Retina Ready</li>
                                                        <li><i className="icofont-ui-check"></i> Modern Design</li>
                                                        <li><i className="icofont-ui-check"></i> Digital Marketing & Branding</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="tabs_item_img">
                                                    <img src={require('../../images/features-img1.png')} alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shape1">
                    <img src={require('../../images/shape1.png')} alt="img" />

                </div>
                <div className="shape2">
                    <img src={require('../../images/shape2.png')} alt="img" />

                </div>
                <div className="shape3">
                    <img src={require('../../images/shape3.png')} alt="img" />

                </div>
                <div className="shape6">
                    <img src={require('../../images/shape6.png')} alt="img" />

                </div>
                <div className="shape8 rotateme">
                    <img src={require('../../images/shape8.svg')} alt="shape" />

                </div>
            </section>
        );
    }
}

export default SaasTools;
