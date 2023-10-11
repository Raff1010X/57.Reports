import '@/styles/index.sass';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { wrapper } from '@/store/store';
import { NextUIProvider } from "@nextui-org/react";

const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <NextUIProvider>
                <Layout>
                    <Component {...props.pageProps} />
                </Layout>
            </NextUIProvider>
        </Provider>
    );
};

export default App;
