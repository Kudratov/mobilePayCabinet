import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux'

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
        console.log(language);
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
                
                <header id="header">
                    <div id="navbar"  className={`crake-nav marketing-navbar navbar-left navbar-cabinet-main is-sticky`} >
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
                                            <Link activeClassName="active" href="/services">
                                                <a className="nav-link">Settings</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="#">
                                                <a className="nav-link">Notification</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="active" href="#">
                                                <a className="nav-link">Help</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link activeClassName="" href="/#">
                                                <a className="nav-link">Sign out</a>
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
                {/* <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <h5 className="my-0 mr-md-auto font-weight-normal">MobilePay</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <a className="p-2 text-dark">nav bar number 1</a>
                        <a className="p-2 text-dark">nav bar number 2</a>
                        <a className="p-2 text-dark">nav bar number 3</a>
                        <a className="p-2 text-dark">nav bar number 4</a>
                    </nav>
                    <a className="btn btn-outline-primary">Sign out</a>
                </div>                 */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))