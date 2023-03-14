import React from "react";
import { Container } from "semantic-ui-react";
import Head from 'next/head';
import Header from "./Header";

const Layout = (props) => {
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"/>
            </Head>
            <Header/>
            {props.children}
        </Container>
    )
}

export default Layout;