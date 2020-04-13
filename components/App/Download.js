import React from 'react';
import Link from 'next/link';

class Download extends React.Component {
    render() {
        return (
            <section className="app-download ptb-100 bg-gray">
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="section-title">
                                <h2>Скачайте приложение и получите больше возможностей</h2>
                                <div className="bar"></div>
                                <p>Приложение с удобным и интуитивно понятным интерфейсом, финансовый консультант и надёжное хранилище Ваших денежных средств прямо в вашем смартфоне. Доступно подключение карт Uzcard и Humo и аналитика расходов в реальном времени.</p>

                                <div className="download-btn">
                                    <Link href="#">
                                        <a><i className="icofont-brand-android-robot"></i> Скачать на <span>Google Store</span></a>
                                    </Link>
                                    <Link href="#">
                                        <a><i className="icofont-brand-apple"></i> Скачать на <span>Apple Store</span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="download-image">
                                <img src={require('../../images/app-img1.png')} alt="image" />
                                <img src={require('../../images/app-img2.png')} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Download;
