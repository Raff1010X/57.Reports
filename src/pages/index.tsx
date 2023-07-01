import Head from 'next/head';

export default function Home() {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="PDF Report creator"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="page">
                <div className="page-content">
                    Main Page
                </div>
            </main>
        </>
    );
}
