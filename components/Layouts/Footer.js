import Link from 'next/link';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-area ptb-100 pb-0 bg-image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <Link href="#">
                                    <a className="logo">
                                        <img src={require('../../images/logo2.png')} alt="logo2" />
                                    </a>
                                </Link>
                                <p>Plan ahead by day, week, or month, and see project status at a glance. Search and filter to focus in on anything form a single project individual.</p>

                                <ul className="social-list">
                                    <li>
                                        <Link href="#">
                                            <a><i className="icofont-facebook"></i></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a><i className="icofont-twitter"></i></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a><i className="icofont-instagram"></i></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a><i className="icofont-linkedin"></i></a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget pl-5">
                                <h3>Company</h3>

                                <ul className="list">
                                    <li>
                                        <Link href="#">
                                            <a>About</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Carrers</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Awards</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>User Program</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a href="#">Locations</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Login</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Products</h3>

                                <ul className="list">
                                    <li>
                                        <Link href="#">
                                            <a>Integrations</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>API</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Pricing</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Documentation</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Sign Up</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Release Notes</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Support</h3>

                                <ul className="list">
                                    <li>
                                        <Link href="#">
                                            <a>About</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>FAQ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Press</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className="container">
                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <p>Copyright @ 2019 Crake. All rights reserved</p>
                            </div>
                            
                            <div className="col-lg-6 col-md-6">
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <a>Terms & Conditions</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
