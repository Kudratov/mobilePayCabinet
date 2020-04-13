import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import SideDrawer from './SideDrawer';
import SearchForm from './SearchForm';
import {changeLanguage} from './../../store/actions/cartActions';

class Navbar extends React.Component {
    _isMounted = false;

    state = {
        drawer: false,
        searchForm: false,
        collapsed: true,
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleDrawer = () => {
        this.setState( prevState => {
            return {
                drawer: !prevState.drawer
            };
        });
    }

    handleSearchForm = () => {
        this.setState( prevState => {
            return {
                searchForm: !prevState.searchForm
            };
        });
    }

    handleLanguageChange = (e) => {
        let language = e.target.text;
        this.props.dispatch(changeLanguage(language));
    }

    about = (lan) => {
        if(lan === "O'zbekcha"){
            return 'Biz haqimizda';
        } else if(lan === "Русский"){
            return 'О нас';
        } else if(lan === "English"){
            return "About";
        }
    }

    news = (lan) => {
        if(lan === "O'zbekcha"){
            return 'Yangiliklar';
        } else if(lan === "Русский"){
            return 'Новости';
        } else if(lan === "English"){
            return "News";
        }
    }

    help = (lan) => {
        if(lan === "O'zbekcha"){
            return 'Yordam';
        } else if(lan === "Русский"){
            return 'Помощь';
        } else if(lan === "English"){
            return "Help";
        }
    }

    contact = (lan) => {
        if(lan === "O'zbekcha"){
            return "Bog'lanish";
        } else if(lan === "Русский"){
            return 'Контакт';
        } else if(lan === "English"){
            return "Contact";
        }
    }

    login = (lan) => {
        if(lan === "O'zbekcha"){
            return "Kirish";
        } else if(lan === "Русский"){
            return 'Логин';
        } else if(lan === "English"){
            return "Login";
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { pathname } = this.props.router;
        let { products } = this.props;

        let layOutCls = '';
        let logo = require('../../images/logo.png');
        if (pathname == '/digital-marketing'){
            layOutCls = 'marketing-navbar';
            logo = require('../../images/logo2.png');
        }

        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        
        return (
            <React.Fragment>
                <header id="header-s">
                    <div id="navbar" className={`crake-nav is-sticky ${layOutCls}`}>
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        {/* <img src={logo} alt="logo" /> */}
                                    </a>
                                </Link>

                                <button 
                                    onClick={this.toggleNavbar} 
                                    className={classTwo}
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav nav ml-auto">
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="/about">
                                            <a className="nav-link">{this.about(this.props.language)}</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="/blog">
                                                <a className="nav-link">{this.news(this.props.language)}</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="/services">
                                                <a className="nav-link">{this.help(this.props.language)}</a>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link activeClassName="active" href="#">
                                                <a className="nav-link" onClick={e => {e.preventDefault();this.handleLanguageChange(e);}}>O'zbekcha</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="#">
                                                <a className="nav-link" onClick={e => {e.preventDefault();this.handleLanguageChange(e);}}>Русский</a>
                                            </Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link activeClassName="" href="/login">
                                                <a className="nav-link">Личный кабинет</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div> 
                    </div>
                </header>

                {this.state.drawer ? <SideDrawer onClick={this.handleDrawer} /> : ''}
                {this.state.searchForm ? <SearchForm onClick={this.handleSearchForm} /> : ''}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.addedItems,
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))
