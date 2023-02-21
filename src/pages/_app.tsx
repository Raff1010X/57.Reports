import '@/styles/global/reset.sass';
import '@/styles/global/colors.sass';
import '@/styles/global/globals.sass';

import '@/styles/components/layout.sass';
import '@/styles/components/navbar.sass';
import '@/styles/components/message.sass';

import '@/styles/pages/page.sass';

import '@/styles/interface/scroll-bar.sass';
import '@/styles/interface/ms-icons.css'


import { Provider } from 'react-redux';
import { store } from '../store/store';
import type { AppProps } from 'next/app';
import { fontInter } from '@/assets/fonts/fontLoader';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <Layout className={`${fontInter.className} layout`}>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
