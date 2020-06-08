/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

import React from "react";
import '../css/app.css';
import '../css/Bootswatch.css'
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import {HashRouter, Route, Switch} from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import InvoicesPage from "./pages/InvoicesPage";


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

const {Footer, Sider, Content} = Layout;

const App = () => {
    return (
        <HashRouter>
            <div className="whiteBackground">
                <Navbar/>
                <Layout>
                    <Sider className="mainSlider"></Sider>
                    <Layout>
                        <Content className="container-fluid mt-5">
                            <Switch>
                                <Route path="/invoices" component={InvoicesPage}/>
                                <Route path="/customers" component={CustomerPage}/>
                                <Route path="/" component={Homepage}/>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        </HashRouter>
    );
};

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);



