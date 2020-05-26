import React, { Component } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';    
import Router from 'next/router';
import Toast from 'light-toast';

import {url} from './../../store/urls';
import Languages from './../../store/languages.json';

class SuccessSendMoney extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            cardHolder: ''
        }
        this.goToMoneySend = this.goToMoneySend.bind(this);
        this.handleSaveTransaction = this.handleSaveTransaction.bind(this);
    }

    componentDidMount(){
        if(this.props.recieverInfo.length === 0 && this.props.transferId.length === 0){
            Router.push("/cabinet-send")
        }
    }

    goToMoneySend() {
        Router.push("/cabinet-send");
    }

    handleSaveTransaction () {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        
        let __url = `${url}transactions-api/v1.0/favouritetransactions/${this.props.transferId}/`;
        fetch(__url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
        })
            .then((res) => {
                if(res.status === 201){
                    Toast.success("Saved", 3000);
                    Router.push("/cabinet-main");
                }
            })
            .catch((err) => {
                Router.push("/cabinet-main");
            })
    }
    
    render() {
        return (
            <div id="content" className="py-4">
                <div className="container">
                <h2 className="font-weight-400 text-center mt-3 mb-4">{Languages.page.cabenet_money_send.Уз_уз.t3}</h2>
                <div className="row">
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                    {/* Send Money Success
                ============================================= */}
                    <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                        <div className="text-center my-5">
                        <p className="text-center brand-color text-20 line-height-07"><i className="fas fa-check-circle" /></p>
                        <p className="text-center brand-color text-8 line-height-07">Success!</p>
                        <p className="text-center text-4">Transactions Complete</p>
                        </div>
                        <p className="text-center text-3 mb-4">You've Succesfully sent <span className="text-4 font-weight-500">{(Number(this.props.recieverInfo.split('-')[4])).toLocaleString().split(',').join(' ')} UZS</span> to <span className="font-weight-500">{this.props.recieverInfo.split('-')[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[0]} **** **** {this.props.recieverInfo.split('-')[0].replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().split(" ")[3]}</span>, See transaction details under <Link href="/cabinet-history"><a>Monitoring</a></Link>.</p>
                        <a className="btn btn-primary btn-block text-white card-add-f-btn" onClick={this.goToMoneySend}>Send Money Again</a>
                        <a className="btn btn-link btn-block" onClick={this.handleSaveTransaction} ><i className="fas fa-save" /> Save</a> 
                    </div>
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
        token: state.authToken,
        recieverInfo: state.recieverInfo,
        transferId: state.cardIdToTransfer
    }
}

export default connect(mapStateToProps)(SuccessSendMoney)