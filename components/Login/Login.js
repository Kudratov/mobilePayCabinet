import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import moment from 'moment';
import Toast from 'light-toast';

import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            phoneNumber: this.props.phoneNumber ? this.props.phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5") : '998',
            passwordForLogin: '',
            loginStatus: 'login'
        };
        
        this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.checkPhoneNumberExists = this.checkPhoneNumberExists.bind(this);
      }

      checkPhoneNumberExists(e){
        const phoneNum = e.target.value.replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        if(phoneNum || phoneNum.match(/[+]*[0,9]{12}$/)){
            this.setState(() => {
                return {
                    phoneNumber: phoneNum
                }
            }, () => {
                if(this.state.phoneNumber.replace(/[^\d]/g, "").length === 12 ){
                    let reqUrl = `${url}identity-api/v1.0/auth/${this.state.phoneNumber.replace(/[^\d]/g, "")}`;
                    this.props.dispatch(addPhoneNumber(this.state.phoneNumber.replace(/[^\d]/g, "")));
                    axios({
                        method: 'HEAD',
                        url: reqUrl
                    })
                    .then((resp) => {
                        if(resp.status === 200 && resp.statusText === 'OK'){
                            
                        }
                    })
                    .catch((error) => {
                        if(error){
                            Router.push('/signup');                
                        }
                        })
                }  
            });            
        }
      }

      handleLogin (e) {
        e.preventDefault();
        let __url = `${url}identity-api/v1.0/auth/token`;
        let data = {
            userName: this.state.phoneNumber.replace(/[^\d]/g, ""),
            password: this.state.passwordForLogin
        }
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    document.cookie = `authtoken=${response.data.authToken};`;
                    document.cookie = `phonenumber=${data.userName};`;
                    document.cookie = `expr=${moment().add(20, "minutes").format('LTS')}`;
                    document.cookie = `pathName=/login`;
                    document.cookie = `verifiedCon=not_known`;
                    let token = response.data.authToken;
                    this.props.dispatch(addAuthtoken(token));
                    this.props.dispatch(addPhoneNumber(this.state.phoneNumber.replace(/[^\d]/g, "")));                
                    let __data = {
                        token: token,
                        pNumber: this.state.phoneNumber.replace(/[^\d]/g, "")
                    }
                    
                    Router.push('/cabinet-main');
                }
            })
            .catch((error) => {
                Toast.fail('Wrong password!', 3000);
                Router.push('/login');
            })
      }

      handlePasswordLogin (e) {
        let password = e.target.value;
        this.setState({
            passwordForLogin: password
        });
      }

    render() {
        return (
                <div className="col-md-6 d-flex align-items-center">
                    <div className="container my-4">
                        <div className="row">
                        <div className="col-11 col-lg-9 col-xl-8 mx-auto setting-shadow">
                            <h3 className="font-weight-400 mb-4">Log In</h3>
                            <form id="loginForm" method="post">
                            <div className="form-group">
                                <label htmlFor="emailAddress">Phone Number</label>
                                <input type="text" className="form-control" id="emailAddress" required onChange={this.checkPhoneNumberExists} maxLength="17" value={`+${this.state.phoneNumber}`} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" className="form-control" id="loginPassword" onChange={this.handlePasswordLogin} required placeholder="Enter Password" />
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                <div className="form-check custom-control custom-checkbox">
                                    <input id="remember-me" name="remember" className="custom-control-input" type="checkbox" />
                                    <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                                </div>
                                </div>
                                <div className="col-sm text-right"><a className="btn-link" href="#">Forgot Password ?</a></div>
                            </div>
                            <button className="btn btn-primary btn-block my-4" onClick={(e) => this.handleLogin(e)} type="submit">Login</button>
                            </form>
                            <p className="text-3 text-center text-muted">Don't have an account? <Link href="/signup"><a className="btn-link">Sign Up</a></Link></p>
                        </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        language: state.language,
        phoneNumber: state.phoneNumber,
        loginStatus: state.loginStatus
    }
}

export default connect(mapStateToProps)(Login);
