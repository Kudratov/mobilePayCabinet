import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class LoginBody extends Component {
    constructor (props) {
        super(props);
        this.state = {
            phoneNumber: this.props.phoneNumber ? this.props.phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5") : '998',
            password: '',
            confirmendPassword: '',
            passPos: true,
            smsCode: "",
            passwordForLogin: '',
            loginStatus: 'login'
        };
        
        this.handleRegisterNext = this.handleRegisterNext.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmedPassword = this.handleConfirmedPassword.bind(this);
        this.handleSmsCode = this.handleSmsCode.bind(this);
        this.handleRegisterSecondPage = this.handleRegisterSecondPage.bind(this);
        this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handeLoginPhoneNumber = this.handeLoginPhoneNumber.bind(this);
        this.handeRegisterPhoneNumber = this.handeRegisterPhoneNumber.bind(this);
      }

      componentDidMount () {
          if(this.props.loginStatus === 'register'){
             this.setState({
                 loginStatus: 'register'
             });
          } else {

          }
      }

      handeRegisterPhoneNumber(e){
        const phoneNum = e.target.value.replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        if(phoneNum || phoneNum.match(/[+]*[0,9]{12}$/)){
            this.setState(() => {
                return {
                    phoneNumber: phoneNum
                }
            }, () => {
                if(this.state.phoneNumber.replace(/[^\d]/g, "").length === 12 ){
                    let reqUrl = `${url}identity-api/v1.0/auth/${this.state.phoneNumber.replace(/[^\d]/g, "")}`;
                    axios({
                        method: 'HEAD',
                        url: reqUrl
                    })
                    .then((resp) => {
                        if(resp.status === 200 && resp.statusText === 'OK'){
                            this.setState({
                                loginStatus: 'login'
                            });
                        }
                    })
                    .catch((error) => {
                        if(error){
                            this.setState({
                                loginStatus: 'register'
                            });                      
                        }
                        })
                }                
            });            
        }
      }

      handeLoginPhoneNumber(e){
        const phoneNum = e.target.value.replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        if(phoneNum || phoneNum.match(/[+]*[0,9]{12}$/)){
            this.setState(() => {
                return {
                    phoneNumber: phoneNum
                }
            }, () => {
                if(this.state.phoneNumber.replace(/[^\d]/g, "").length === 12 ){
                    let reqUrl = `${url}identity-api/v1.0/auth/${this.state.phoneNumber.replace(/[^\d]/g, "")}`;
                    axios({
                        method: 'HEAD',
                        url: reqUrl
                    })
                    .then((resp) => {
                        if(resp.status === 200 && resp.statusText === 'OK'){
                            this.setState({
                                loginStatus: 'login'
                            });
                        }
                    })
                    .catch((error) => {
                        if(error){
                            this.setState({
                                loginStatus: 'register'
                            });                      
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
                    let token = response.data.auth_token;
                    this.props.dispatch(addAuthtoken(token));
                    this.props.dispatch(addPhoneNumber(this.state.phoneNumber.replace(/[^\d]/g, "")));                    
                    let __data = {
                        token: token,
                        pNumber: this.state.phoneNumber.replace(/[^\d]/g, "")
                    }

                    localStorage.setItem("user-credentials", JSON.stringify(__data));
                    
                    Router.push('/cabinet-main');
                }
            })
            .catch((error) => {
                Router.push('/login');
            })
      }

      handlePasswordLogin (e) {
        let password = e.target.value;
        this.setState({
            passwordForLogin: password
        });
      }
      
      handlePassword (e) {
        let __pass = e.target.value;
        let __cPass = this.state.confirmendPassword ? this.state.confirmendPassword : '';
        this.setState({ password: __pass });
        if(__cPass === __pass && __cPass.length > 0){
            this.setState({passPos: false})
        } else{
            this.setState({passPos: true})
        }
      }

      handleConfirmedPassword (e) {        
        let __cPass = e.target.value;
        let __pass = this.state.password;
        this.setState({ confirmendPassword: __cPass });
        if(__cPass === __pass && __cPass.length > 0){
            this.setState({passPos: false})
        } else{
            this.setState({passPos: true})
        }
      }

      handleRegisterNext () {
        let data = {
            userName: this.state.phoneNumber.replace(/[^\d]/g, ""),
            password: this.state.confirmendPassword
        }
        let __url = `${url}identity-api/v1.0/users/`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        axios.post(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                let fElementId = document.getElementById("div-for-register-first-display");
                let sElementId = document.getElementById("div-for-register-second-display");
                fElementId.classList.add("display-false-class");
                sElementId.classList.add("display-true-class");                
            })
            .catch((error) => {
                console.log(error)
            })
      }

      handleSmsCode (e) {
          let smsCode = e.target.value;
          if(smsCode.length === 4){
            this.setState({smsCode});
          }
      }

      handleRegisterSecondPage () {
        let data = {
            code: this.state.smsCode,
            password: this.state.confirmendPassword
        }
        let __url = `${url}identity-api/v1.0/users/${this.state.phoneNumber}/verify/`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        axios.put(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    let token = response.data.auth_token;
                    this.props.dispatch(addAuthtoken(token));
                    
                    let __data = {
                        token: token,
                        pNumber: this.state.phoneNumber
                    }

                    localStorage.setItem("user-credentials", JSON.stringify(__data));
                    
                    Router.push('/cabinet-main');
                }
            })
            .catch((error) => {
                console.log(error)
            })
      }

    render() {
        return (
            <section className="login-area ptb-100">
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="login-image">
                                <img src={require('../../images/marketing.png')} alt="image" />
                            </div>
                        </div>
                        {this.state.loginStatus === 'login' && 
                        <div className="col-lg-6 col-md-12">
                            <div className="login-form">
                                <h3>Авторизация</h3>
                                <p>Вход</p>
                                <form>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" onChange={this.handeLoginPhoneNumber} maxLength="17" placeholder="Phone Number" value={`+${this.state.phoneNumber}`}/>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="password" className="form-control" onChange={this.handlePasswordLogin} placeholder="Парол" />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkme" />
                                                <label className="form-check-label" htmlFor="checkme">Доверенное устройство</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 text-right">
                                            <p className="forgot-password">
                                                <Link href="/forgetpassword"><a>Забыли пароль?</a></Link>
                                            </p>
                                        </div>

                                        <div className="col-lg-12">
                                            <a onClick={(e) => this.handleLogin(e)} className="btn btn-primary">Войти!</a>
                                            <br />
                                            {/* <span>New User? <Link href="/signup"><a>Sign Up!</a></Link></span> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        }
                        {this.state.loginStatus !== 'login' &&
                        <div className="col-lg-6 col-md-12">
                            <div className="login-form">
                                <h3>Register</h3>
                                <p>Please create new account.</p>
                                <form>
                                    <div className="row" id="div-for-register-first-display">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Phone Number" onChange={this.handeRegisterPhoneNumber} value={`+${this.state.phoneNumber}`} />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="password" onChange={this.handlePassword} minLength='2' className="form-control" placeholder="Password" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="password" onChange={this.handleConfirmedPassword} className="form-control" placeholder="Confirm Password" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <a onClick={this.handleRegisterNext} disabled={(this.state.passPos)} className="btn btn-primary">Next</a>
                                            <br />
                                            <span>{this.state.passPos ? (this.state.confirmendPassword.length === 0 ? 'Insert the Password' : 'Password is not match') : "Next"}</span>
                                        </div>
                                    </div>

                                    {/* SECOND PAGE */}

                                    <div className="row div-for-register-second-display" id="div-for-register-second-display">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Phone Number" value={`+${this.state.phoneNumber}`} />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" maxLength="4" onChange={this.handleSmsCode} placeholder="SMS code" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <p>Sms has sent</p>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="checkme" />
                                                <label className="form-check-label" htmlFor="checkme">Trusted device</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 text-right">
                                            <p className="forgot-password">
                                                <a>Resend SMS</a>
                                            </p>
                                        </div>

                                        <div className="col-lg-12">
                                            <a type="submit" onClick={this.handleRegisterSecondPage} className="btn btn-primary">Submit</a>
                                            <br />
                                            {/* <span>New User? <Link href="/signup"><a>Sign Up!</a></Link></span> */}
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        }                                           
                    </div>
                </div>
            </section>
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

export default connect(mapStateToProps)(LoginBody);