// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Meta from "../components/Meta";

class AppDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return {...initialProps}
	}

	render() {
		return (
			<Html lang="it">
				<Head>
					<Meta/>
				</Head>
				<body>
					<Main/>
					<NextScript/>

					<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}/>
					<script dangerouslySetInnerHTML={{__html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                    `}}/>

				</body>
			</Html>
		)
	}
}

export default AppDocument
