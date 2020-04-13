import React from 'react';

class AppWorks extends React.Component {
    render() {
        return (
            <section className="how-app-work ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>How App Works</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="app-mobile">
                                <img src={require('../../images/app-mobile.png')} alt="mobile" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-app-works">
                                <div className="icon">
                                    <i className="icofont-downloaded"></i>
                                </div>
                                <h3>Download</h3>
                                <p>Duis cursus dictum enim dictum venenatis. Orci varius natoque penatibus et magnis dis parturient montes.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-app-works">
                                <div className="icon">
                                    <i className="icofont-settings"></i>
                                </div>
                                <h3>Setup It</h3>
                                <p>Duis cursus dictum enim dictum venenatis. Orci varius natoque penatibus et magnis dis parturient montes.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                            <div className="single-app-works">
                                <div className="icon">
                                    <i className="icofont-thumbs-up"></i>
                                </div>
                                <h3>Enjoy it</h3>
                                <p>Duis cursus dictum enim dictum venenatis. Orci varius natoque penatibus et magnis dis parturient montes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AppWorks;
