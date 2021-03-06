import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import moment from 'moment';

import Languages from './../../store/languages.json';

import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class Signup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            phoneNumber: this.props.phoneNumber ? this.props.phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5") : '998',
            password: '',
            confirmendPassword: '',
            passPos: true,
            smsCode: ""
        };
        
        this.handleRegisterNext = this.handleRegisterNext.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmedPassword = this.handleConfirmedPassword.bind(this);
        this.handleSmsCode = this.handleSmsCode.bind(this);
        this.handleRegisterSecondPage = this.handleRegisterSecondPage.bind(this);
        this.checkPhoneNumberExists = this.checkPhoneNumberExists.bind(this);
      }

      checkPhoneNumberExists(e){
        e.preventDefault();
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
                            this.props.dispatch(addPhoneNumber(this.state.phoneNumber.replace(/[^\d]/g, "")));
                            Router.push('/login');
                        }
                    })
                    .catch((error) => {
                        if(error){

                        }
                        })
                }                
            });            
        }
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

      handleRegisterNext (e) {
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
                fElementId.classList.remove("display-true-class");
                fElementId.classList.add("display-false-class");
                sElementId.classList.remove("display-false-class");             
                sElementId.classList.add("display-true-class");             
            })
            .catch((error) => {
                console.log(error)
            })
      }

      handleSmsCode (e) {
          let smsCode = e.target.value;
          if(smsCode){
            this.setState({smsCode});
          }
      }

      handleRegisterSecondPage () {
        let data = {
            code: this.state.smsCode,
            password: this.state.confirmendPassword
        }
        let __url = `${url}identity-api/v1.0/users/${this.state.phoneNumber.replace(/[^\d]/g, '')}/verify/`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        axios.put(`${__url}`, JSON.stringify(data), {headers: headers})
            .then((response) => {
                if(response.status === 200){
                    let token = response.data.authToken;
                    this.props.dispatch(addAuthtoken(token));
                    document.cookie = `authtoken=${token}`;
                    document.cookie = `phonenumber=${this.state.phoneNumber.replace(/[^\d]/g, '')};`;
                    document.cookie = `expr=${moment().add(20, "minutes").format('LTS')}`;
                    
                    Router.push('/cabinet-main');
                }
            })
            .catch((error) => {
                console.log(error)
            })
      }
    render() {
        return (
            <div className="col-md-6 d-flex align-items-center">
                <div className="container my-4 display-true-class" id="div-for-register-first-display">
                    <div className="row">
                    <div className="col-11 col-lg-9 col-xl-8 mx-auto setting-shadow">
                        <h3 className="font-weight-400 mb-4">{Languages.page.signup.Уз_уз.t3}</h3>
                        <form id="loginForm" method="post">
                        <div className="form-group">
                            <label htmlFor="fullName">{Languages.page.signup.Уз_уз.t4}</label>
                            <input type="text" className="form-control" id="fullName" required onChange={this.checkPhoneNumberExists} maxLength="17" value={`+${this.state.phoneNumber}`} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailAddress">{Languages.page.signup.Уз_уз.t5}</label>
                            <input type="password" className="form-control" id="emailAddress" onChange={this.handlePassword} minLength='2' required placeholder={Languages.page.signup.Уз_уз.t11} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">{Languages.page.signup.Уз_уз.t5}</label>
                            <input type="password" className="form-control" id="loginPassword" onChange={this.handleConfirmedPassword} required placeholder={Languages.page.signup.Уз_уз.t12} />
                        </div>
                        <a onClick={this.handleRegisterNext} disabled={(this.state.passPos)} className="btn btn-primary btn-block my-4 text-white card-add-f-btn" type="submit">{Languages.page.signup.Уз_уз.t8}</a>
                        </form>
                        <p className="text-3 text-center text-muted">{Languages.page.signup.Уз_уз.t9} <Link href="/login"><a className="btn-link">{Languages.page.signup.Уз_уз.t10}</a></Link></p>
                    </div>
                    </div>
                </div>


                <div className="container my-4 display-false-class" id="div-for-register-second-display">
                    <div className="row">
                    <div className="col-11 col-lg-9 col-xl-8 mx-auto setting-shadow">
                        <h3 className="font-weight-400 mb-4">{Languages.page.signup.Уз_уз.t13}</h3>
                        <form id="loginForm" method="post">
                        <div className="form-group">
                            <label htmlFor="fullName">{Languages.page.signup.Уз_уз.t4}</label>
                            <input type="text" className="form-control" id="fullName" required onChange={this.checkPhoneNumberExists} maxLength="17" value={`+${this.state.phoneNumber}`} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailAddress">{Languages.page.signup.Уз_уз.t14}</label>
                            <input type="text" className="form-control" id="emailAddress" onChange={this.handleSmsCode} minLength='2' required placeholder="Enter SMS Code" />
                        </div>
                        <a onClick={this.handleRegisterSecondPage} className="btn btn-primary btn-block my-4 text-white card-add-f-btn" type="submit">{Languages.page.signup.Уз_уз.t15}</a>
                        </form>
                        <p className="text-3 text-center text-muted">{Languages.page.signup.Уз_уз.t9} <Link href="/login"><a className="btn-link">{Languages.page.signup.Уз_уз.t10}</a></Link></p>
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

export default connect(mapStateToProps)(Signup);