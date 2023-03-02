import '@/styles/global/reset.sass';
import '@/styles/global/colors.sass';
import '@/styles/global/globals.sass';
import '@/styles/animations.sass';

import '@/styles/components/layout.sass';
import '@/styles/components/navbar.sass';
import '@/styles/components/message.sass';
import '@/styles/components/background-video.sass';

import '@/styles/pages/page.sass';

import '@/styles/interface/scroll-bar.sass';
import '@/styles/interface/ms-icons.sass';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { wrapper } from '@/store/store';

const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    );
};

export default App;
