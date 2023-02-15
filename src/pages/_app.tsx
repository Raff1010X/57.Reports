import '@/styles/reset.css';
import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/Navbar.css';

import type { AppProps } from 'next/app';
import { fontInter } from '@/assets/fonts/fontLoader';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout className={`${fontInter.className} layout`}>
            <Component {...pageProps} />
        </Layout>
    );
}
