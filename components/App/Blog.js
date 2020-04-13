import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    autoplay: true,
    nav: true,
    loop:true,
    mouseDrag: true,
    autoplayHoverPause: true,
    responsiveClass: true,
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
        1200:{
            items:3,
        }
    }
}

class Blog extends React.Component {
    state = { display:false};


    componentDidMount(){ 
        this.setState({ display: true }) 
    }
    render() {
        return (
            <section className="blog-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Latest News</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="row">
                    {this.state.display ? <OwlCarousel 
                            className="blog-slides owl-carousel owl-theme"
                            {...options}
                        >
                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img1.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 23, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Most Popular New Business Apps</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img2.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 16, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Best Marketing Management Tools</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img3.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 14, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Best Marketing Management Tools</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img4.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 06, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Best Marketing Management Tools</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img5.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 04, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Best Marketing Management Tools</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="single-blog-post">
                                    <Link href="#">
                                        <a className="post-image">
                                            <img src={require('../../images/blog-img3.jpg')} alt="blog-image" />
                                        </a>
                                    </Link>

                                    <div className="blog-post-content">
                                        <ul>
                                            <li><i className="icofont-user-male"></i> <Link href="#"><a>Admin</a></Link></li>
                                            <li><i className="icofont-wall-clock"></i> January 26, 2019</li>
                                        </ul>
                                        <h3>
                                            <Link href="#">
                                                <a>The Best Marketing Management Tools</a>
                                            </Link>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, dapibus nec libero vitae.</p>
                                        <Link href="#">
                                            <a className="read-more-btn">Read More <i className="icofont-rounded-double-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel> : ''}
                    </div>
                </div>
            </section>
        );
    }
}

export default Blog;
