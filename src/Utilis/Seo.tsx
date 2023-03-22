import Head from "next/head";

//Types
interface Props {
    title: string
}

const Seo = ({ title }: Props) => {
    return (
        <Head>
            <meta property="og:title" content={title} />
            <title>{title}</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="author" content="Siam Ahnaf" />
        </Head>
    );
};
export default Seo;