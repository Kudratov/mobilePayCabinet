import React from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";

class Funfact extends React.Component {

    state = {
        didViewCountUp: false
    };

    onVisibilityChange = isVisible => {
        if (isVisible) {
            this.setState({ didViewCountUp: true });
        }
    };

    render() {
        return (
            <section className="app-funfacts-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-funfact">
                                <div className="icon">
                                    <i className="icofont-download"></i>
                                </div>
                                <h3>
                                    <span className="count">
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 2
                                                        : 0
                                                }
                                                duration={3}
                                            />
                                        </VisibilitySensor>
                                    </span>
                                    B
                                </h3>
                                <p>Download</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-funfact">
                                <div className="icon">
                                    <i className="icofont-star"></i>
                                </div>
                                <h3>
                                    <span className="count">
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 5
                                                        : 0
                                                }
                                                duration={3}
                                            />
                                        </VisibilitySensor>
                                    </span>
                                </h3>
                                <p>Ratings</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-funfact">
                                <div className="icon">
                                    <i className="icofont-user-suited"></i>
                                </div>
                                <h3>
                                    <span className="count">
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 500
                                                        : 0
                                                }
                                                duration={3}
                                            />
                                        </VisibilitySensor>
                                    </span>
                                    M
                                </h3>
                                <p>Active Users</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-funfact">
                                <div className="icon">
                                    <i className="icofont-thumbs-up"></i>
                                </div>
                                <h3>
                                    <span className="count">
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 13
                                                        : 0
                                                }
                                                duration={3}
                                            />
                                        </VisibilitySensor>
                                    </span>
                                    K
                                </h3>
                                <p>Updates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Funfact;
