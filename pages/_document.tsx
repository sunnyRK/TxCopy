import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';

export default function Document() {
    return (
        <Html lang="en">
            <script src="https://cdn.tailwindcss.com"></script>
            <title>DefiLens</title>
            <link rel = "icon" href ="/logo.png" type="image/x-icon"></link>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
