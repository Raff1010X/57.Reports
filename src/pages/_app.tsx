import '@/styles/index.sass';

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
