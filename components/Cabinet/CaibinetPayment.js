import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {connect} from 'react-redux';

import Categories from './../../store/categories.json';
import Languages from './../../store/languages.json';
import {url} from './../../store/urls';

class CabinetPayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            categoryList: []
        }
    }

    componentDidMount () {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        }
        axios.get(`${url}payments-api/v1.0/references/paynet/categories`, {headers: headers})
            .then(response => {
                this.setState({categoryList: response.data.categories})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
                <div>
                    <div className="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 className="text-5 font-weight-400 mb-4">{Languages.page.cabenet_payment[this.props.language].t1} <span className="text-muted text-4"></span></h3>
                    <div>
                                <div className="brands-grid separator-border bg-white">
                                <div className="row align-items-center">

                                {this.state.categoryList && 
                                    <>
                                    {this.state.categoryList.map((element, i) => {
                                        return (
                                            <>

                                    <div key={i} className="col-md-4 col-sm-6 col-lg-3 col-6 text-center logo-src-payment"><Link href={Categories.categories.find(categoriesStc => categoriesStc.id === element.id).dir}><a><img className="img-fluid logo-img-payment" src={Categories.categories.find(categoriesStc => categoriesStc.id === element.id).url ? Categories.categories.find(categoriesStc => categoriesStc.id === element.id).url : "./../../images/payment/pay_mobile.png"} alt="Brands" /><br/><span className="payment-name">{element.name}</span></a></Link></div>
                                


                            </>
                            )
                            })}                        
                            </>
                            }

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
        language: state.language
    }
}

export default connect(mapStateToProps)(CabinetPayment);
