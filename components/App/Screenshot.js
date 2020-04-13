import React from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop:true,
    nav:true,
    autoplay:true,
    autoplayHoverPause: true,
    mouseDrag: true,
    center: true,
    dots: false,
    navText: [
        "<i class='icofont-bubble-left'></i>",
        "<i class='icofont-bubble-right'></i>"
    ],
    responsive:{
        0:{
            items:1,
        },
        768:{
            items:2,
        },
        1024:{
            items:3,
        },
        1200:{
            items:3,
        }
    }
}

class Screenshot extends React.Component {
    state = { display:false};


    componentDidMount(){ 
        this.setState({ display: true }) 
    }

    render() {
        return (
            <section className="screenshot-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Screenshot</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="screenshot-contain">
                                <img src={require('../../images/mobile.png')} className="mobile-light" alt="mobile" />

                                <div className="row">
                                    {this.state.display ? <OwlCarousel 
                                        className="screenshot-slides owl-carousel owl-theme"
                                        {...options}
                                    >
                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img1.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img4.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img2.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img3.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img4.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img1.png')} alt="screenshot" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="screenshot-item">
                                                <img src={require('../../images/screenshot-img2.png')} alt="screenshot" />
                                            </div>
                                        </div>
                                    </OwlCarousel> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Screenshot;
