import '@/styles/global/reset.sass';
import '@/styles/global/colors.sass';
import '@/styles/global/globals.sass';
import '@/styles/animations.sass'

import '@/styles/components/layout.sass';
import '@/styles/components/navbar.sass';
import '@/styles/components/message.sass';
import '@/styles/components/background-video.sass';

import '@/styles/pages/page.sass';

import '@/styles/interface/scroll-bar.sass';
import '@/styles/interface/ms-icons.sass'


import { Provider } from 'react-redux';
import { store } from '../store/store';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import withRedux from "next-redux-wrapper";

function App({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(App);
