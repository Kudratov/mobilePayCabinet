import React, { Component } from 'react';
import Link from 'next/link';

class CabinetTransfer extends Component {
    render() {
        let active_btn_for_send = this.props.url === "send" ? "is-active-button-active" : "";
        let active_btn_for_ask = this.props.url === "ask" ? "is-active-button-active" : "";
        let active_btn_for_tomycards = this.props.url === "tomycards" ? "is-active-button-active" : "";
        return (
            <section className="ptb-1001 container-fluid clearfix">
                    <div className="row">
                        
                        <div className="col-md-6">
                            <h2>Kartadan kartaga pul o'tkazish</h2>
                            <p>Xizmat narxi</p>
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <h2>Aviable list of banks</h2>
                        </div>
                    </div>
                    <div className="container">
                    <div className="row">
                        <div className="col-4 col-xl-4">
                            <Link href="/cabinet-transfer-send">
                                <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_send}`}>Pul otkazish</a>
                            </Link>
                        </div>
                        <div className="col-4 col-xl-4">
                            <Link href="/cabinet-transfer-ask">
                                <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_ask}`}>Pul sorash</a>
                            </Link>
                        </div>
                        <div className="col-4 col-xl-4">
                            <Link href="/cabinet-transfer-tomycards">
                                <a className={`d-flex position-relative align-items-center justify-content-center py-2 py-lg-3 ${active_btn_for_tomycards}`}>Mening kartamga o'tlazish</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container-fluid money-sent">
                    <div className="row">
                        <div className="col-md-12">
                        <div id="carouselExampleIndicators" className="carousel slide slide-for-card-select" data-ride="carousel" data-interval="false">
                            <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.payme.uz/merchants/uzmobile-gsm.png" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.payme.uz/merchants/3a9f50a0737ffe196d5a6268f1fa3ac3858f2013.png" alt="Third slide" />
                            </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon button-for-prev-next" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon button-for-prev-next" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <form className="form-inline">
                                <div className="form-row form-for-ask-money">
                                    <div className="col">
                                        <label>Sorov Summasi</label>
                                        <input type="text" className="form-control form-inline-input"/>
                                    </div>
                                    <div className="col">
                                    <input type="submit" className="form-control form-inline-button-submit"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </section>
        );
    }
}

export default CabinetTransfer;