/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

import React from "react";

import '../css/app.css';
import ReactDOM from "react-dom";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Salut baby');

    const App = () => {
    return <h1> Bonjour Noob </h1>;
    };

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
