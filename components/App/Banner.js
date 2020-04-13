import React from 'react';
import Link from 'next/link';
import Router, {useRouter} from 'next/router';
import {connect} from 'react-redux';
import axios from 'axios';

import {url} from './../../store/urls';
import {addPhoneNumber, addLoginStatus} from './../../store/actions/cartActions';

class Banner extends React.Component {

    constructor () {
        super();
        this.state = {
            phoneNumber: "+998",
            showModal: false
        };
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    normalize(phone) {
        //normalize string and remove all unnecessary characters
        phone = phone.replace(/[^\d]/g, "");
    
        //check if number length equals to 10
        if (phone) {
            //reformat and return phone number
            return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
        }
    }

    handlePhoneNumber (e) {
        const phoneNum = e.target.value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        if(phoneNum || phoneNum.match(/[+]*[0,9]{12}$/)){
            this.setState(() => {
                return {
                    phoneNumber: phoneNum
                }
            });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        if(this.state.phoneNumber.length){
            this.props.dispatch(addPhoneNumber(this.state.phoneNumber.replace(/[^\d]/g, "")));
            let reqUrl = `${url}identity-api/v1.0/auth/${this.state.phoneNumber.replace(/[^\d]/g, "")}`;
            axios({
                method: 'HEAD',
                url: reqUrl
            })
            .then((resp) => {
                if(resp.status === 200 && resp.statusText === 'OK'){
                    this.props.dispatch(addLoginStatus('login'));
                    Router.push('/login')
                }
            })
            .catch((error) => {
                if(error){
                    Router.push('/login');
                    this.props.dispatch(addLoginStatus('register'));                        
                }
              })
        }
    }

    h1Lan = (lan) => {
        if(lan === "O'zbekcha"){
            return "O'zbekcha";
        } else if(lan === "Русский"){
            return 'Помощь';
        } else if(lan === "English"){
            return "Crake Makes Your Life Very Easier";
        }
    }
    render() {
        
        return (
            <div className="main-banner app-home">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="hero-content">
                                        <h1>Оплата мобильной связи</h1>
                                        <p>В приложении работают любые пластиковые карты, к которым подключено смс-информирование. Карты, к которым смс-информирование не подключено, в приложении не работают.</p>
                                            <form className="d-flex justify-content-start">
                                                <input type="text" placeholder="+998 --- -- --" maxLength="13" className="form-control login-text-main" onChange={this.handlePhoneNumber} value={this.state.phoneNumber}/>
                                                <button type="submit" className="btn btn-primary" onClick={this.handleLogin}><i class="fas fa-sign-in-alt login-icon-main"></i></button>
                                            </form>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-12">
                                    <div className="app-image">
                                        <img src={require('../../images/app-img4.png')} alt="image" />
                                        <img src={require('../../images/app-img2.png')} alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="creative-shape shape-move-middle">
                    <img src={require('../../images/bg3.png')} alt="bg" />
                </div>
                <div className="bg-gray shape-1"></div>
                <div className="shape1">
                    <img src={require('../../images/shape1.png')} alt="img" />
                </div>
                <div className="shape2">
                    <img src={require('../../images/shape2.png')} alt="img" />
                </div>
                <div className="shape3">
                    <img src={require('../../images/shape3.png')} alt="img" />
                </div>
                <div className="shape4 rotateme">
                    <img src={require('../../images/shape4.png')} alt="img" />
                </div>
                <div className="shape6">
                    <img src={require('../../images/shape6.png')} alt="img" />
                </div>
                <div className="shape8 rotateme">
                    <img src={require('../../images/shape8.svg')} alt="shape" />
                </div>
                <div className="shape9">
                    <img src={require('../../images/shape9.svg')} alt="shape" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        phoneNumber: state.phoneNumber
    }
}

export default connect(mapStateToProps)(Banner);
