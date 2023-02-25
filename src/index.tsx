import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Slideshow, { SlideshowCard } from "./Slideshow.js";
import reportWebVitals from './reportWebVitals.js';
import img from "./littleLemonSmaller.png";

const contents = [
	<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
		<img src={img} width="100%"></img>
		<div>
			<h1>Title</h1>
			<p>This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  </p>
		</div>
	</div>,
	<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
		<img src={img} width="100%" ></img>
		<div>
			<h1>Title</h1>
			<p>This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  </p>
		</div>
	</div>,
	<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
		<img src={img} width="100%"></img>
		<div>
			<h1>Title</h1>
			<p>This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  </p>
		</div>
	</div>,
	<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
		<img src={img} width="100%"></img>
		<div>
			<h1>Title</h1>
			<p>This is a few paragraphs of description text for this slideshow card.  Hopefully it wraps at least a couple times.  </p>
		</div>
	</div>,
];

const root = ReactDOM.createRoot(document.getElementById('root') as any);

const cards = contents.map((card, index) => <SlideshowCard key={index}>{card}</SlideshowCard>);
root.render(
	<>
		<Slideshow cardWidth={100}>{cards}</Slideshow>
		<Slideshow cardWidth={500}>{cards}</Slideshow>
	</>

);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
