import '../assets/css/bootstrap.min.css';
import '../assets/css/icofont.min.css';
import '../assets/css/style.css';

import { Provider } from 'react-redux';
import { Preloader, Placeholder } from 'react-preloading-screen';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/reducers/cartReducer';
import { DefaultSeo } from 'next-seo';
import GoTop from '../components/Shared/GoTop';
import Loader from '../components/Shared/Loader'; 

export default withRedux(initStore)(
    class MyApp extends App {
        
        static async getInitialProps ({ Component, ctx }) {
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
                            site_name: 'Mojosa - React Next Landing Page Templates',
                        }}
                    />
                    <Preloader>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                        <GoTop scrollStepInPx="50" delayInMs="16.66" />
                        <Placeholder>
                            <Loader />
                        </Placeholder>
                    </Preloader>
                </Container>
            );
        }
    }
)