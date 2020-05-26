import './../assets/css/bootstrap.min.css';
import './../assets/css/icofont.min.css';
import './../assets/css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


import { Provider } from 'react-redux';
import cookies from 'next-cookies';
import { Preloader, Placeholder } from 'react-preloading-screen';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/reducers/cartReducer';
import { DefaultSeo } from 'next-seo';
import Loader from '../components/Cabinet/Assets/Preloader';
import axios from 'axios';
import Redirect from './../assets/js/RedirectsTo';
import Cookie from 'js-cookie';

import {url} from './../store/urls';

export default withRedux(initStore)(
    class MyApp extends App {
        
        static async getInitialProps ({ Component, res, ctx }) {
            
            let pageProps = {};
            const c = cookies(ctx);

            if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
            }
            
            if(typeof c.authtoken == 'undefined') {
                if(ctx.pathname == "/login" || ctx.pathname == "/forgot-password" || ctx.pathname == "/signup") return {pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}};
                //if we are on any other page, redirect to the login page
                else Redirect('/login', { res: ctx.res, status: 301 })
            }

            else {
                if(!c.authtoken.length){
                    Redirect('/login', { res: ctx.res, status: 301 })
                } else {
                    if(Cookie.get("verifiedCon") === "not_known"){
                        let __url = `${url}identity-api/v1.0/users/${Cookie.get('phonenumber')}/verify/`;
                        const headers = {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${Cookie.get('authtoken')}`
                        }
                        axios.post(`${__url}`, {headers: headers})
                            .then((response) => {
                                if(response.status === 204){
                                    Redirect('/user-verify', { res: ctx.res, status: 301 })
                                }
                            })
                            .catch((error) => {
                                if(error.message.split(' ')[5] === '400'){
                                    Cookie.set('verifiedCon', 'known');
                                }
                            })
                    }
                }
                // if(ctx.pathname == "/login") {
                //     //shouldn't show the login page is we are already logged in
                //     if(c.authtoken) { Redirect('/cabinet-main', { res: ctx.res, status: 301 });  }
          
                //     //if it wasn't successful, stay where we are
                //     else return {...pageProps, ...{authtoken: c.authtoken}};
          
                //   }
                //   else {
                //     // Redirect('/login', { res: ctx.res, status: 301 });
                //   }
            }

            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            }
        }

        render () {
            const { Component, pageProps, store } = this.props

            return (
                <Container>
                    <DefaultSeo
                        title="Мобильный платежный сервис"
                        description="mobilePay"
                        openGraph={{
                            type: 'website',
                            locale: 'en_IE',
                            url: 'https://mobilePay.uz/',
                            site_name: 'mobilePayment',
                        }}
                    />
                    <Preloader>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                        <Placeholder>
                            <Loader />
                        </Placeholder>
                    </Preloader>
                </Container>
            );
        }
    }
)