import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>PDF Report creator</title>
                <meta name="description" content="PDF Report creator" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <main className="page">
                <div className="page-content">Main Page</div>
            </main>
        </>
    );
}
