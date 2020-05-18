import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import moment from 'moment';
import Cookie from 'js-cookie';

import {url} from './../../store/urls';
import {addAuthtoken, addPhoneNumber} from './../../store/actions/cartActions';

class Verify extends Component {
    constructor (props) {
        super(props);
        this.state = {
            phoneNumber: Cookie.get('phonenumber').replace(/[^\d]/g, "").replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5"),
            smsCode: "",
            passwordForLogin: ''
        };
        this.handleUserVerify = this.handleUserVerify.bind(this);
        this.handleSmsCode = this.handleSmsCode.bind(this);
        this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
      }

      handlePasswordLogin (e) {
        let password = e.target.value;
        this.setState({
            passwordForLogin: password
        });
      }

      handleSmsCode (e) {
          let smsCode = e.target.value;
          this.setState({smsCode})
      }

      handleUserVerify () {
        let data = {
            code: this.state.smsCode,
            password: this.state.passwordForLogin
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
                    
                    Cookie.set('verifiedCon', 'known');
                    
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

                <div className="container my-4">
                    <div className="row">
                    <div className="col-11 col-lg-9 col-xl-8 mx-auto setting-shadow">
                        <h3 className="font-weight-400 mb-4">User Verfication</h3>
                        <form id="loginForm" method="post">
                        <div className="form-group">
                            <label htmlFor="fullName">Phone Number</label>
                            <input type="text" className="form-control" id="fullName" defaultValue={`+${this.state.phoneNumber.split(' ')[0]} ${this.state.phoneNumber.split(' ')[1]} *** ** ${this.state.phoneNumber.split(' ')[4]}`} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" id="loginPassword" onChange={this.handlePasswordLogin} required placeholder="Enter Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailAddress">SMS Code</label>
                            <input type="text" className="form-control" id="emailAddress" onChange={this.handleSmsCode} minLength='2' required placeholder="Enter SMS Code" />
                        </div>
                        <a onClick={this.handleUserVerify} className="btn btn-primary btn-block my-4 text-white card-add-f-btn" type="submit">Sign up</a>
                        </form>
                        <p className="text-3 text-center text-muted">Already have an account? <Link href="/login"><a className="btn-link">Log In</a></Link></p>
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

export default connect(mapStateToProps)(Verify);