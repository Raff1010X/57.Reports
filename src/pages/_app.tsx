import '@/styles/reset.sass';
import '@/styles/colors.sass';
import '@/styles/globals.sass';
import '@/styles/navbar.sass';
import '@/styles/scroll-bar.sass';

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
