import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
                    <link rel="icon" type="image/png" href={require("../images/logo.png")}></link>
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i' type='text/css'></link>                                  
                    {/* <link rel="stylesheet" type="text/css" href="./assets/css/style.css" />         */}
                    {/* <link rel="stylesheet" type="text/css" href="./../../../assets/sass/stylesheet.scss" /> */}
                    {/* <link rel="stylesheet" type="text/css" href="./../assets/vendor/font-awesome/css/all.min.css" /> */}
                    <link rel="stylesheet" type="text/css" href="./../_next/static/css/styles.chunk.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument;