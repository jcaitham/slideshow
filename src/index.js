import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Slideshow, { SlideshowCard } from "./Slideshow.js";
import reportWebVitals from './reportWebVitals.js';
import img from "./littleLemonSmaller.png";
const contents = [
    React.createElement("div", { style: { display: "flex", flexDirection: "column", width: "100%" } },
        React.createElement("img", { src: img, width: "100%" }),
        React.createElement("div", null,
            React.createElement("h1", null, "Title"),
            React.createElement("p", null, "This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  "))),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", width: "100%" } },
        React.createElement("img", { src: img, width: "100%" }),
        React.createElement("div", null,
            React.createElement("h1", null, "Title"),
            React.createElement("p", null, "This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  "))),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", width: "100%" } },
        React.createElement("img", { src: img, width: "100%" }),
        React.createElement("div", null,
            React.createElement("h1", null, "Title"),
            React.createElement("p", null, "This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  "))),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", width: "100%" } },
        React.createElement("img", { src: img, width: "100%" }),
        React.createElement("div", null,
            React.createElement("h1", null, "Title"),
            React.createElement("p", null, "This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  "))),
];
const root = ReactDOM.createRoot(document.getElementById('root'));
const cards = contents.map((card, index) => React.createElement(SlideshowCard, { key: index }, card));
root.render(React.createElement(React.Fragment, null,
    React.createElement(Slideshow, { cardWidth: 100 }, cards),
    React.createElement(Slideshow, { cardWidth: 500 }, cards)));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
