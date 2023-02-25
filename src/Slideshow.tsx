import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import "./Slideshow.scss";

export const SlideshowCard = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties; }) =>
{
	return (
		<article className="highlightWhite background card shadow" style={{ ...style }}>
			{children}
		</article>
	);
};

const Slideshow = ({ children, cardWidth, style }: { children: React.ReactNode[], cardWidth: number, style?: React.CSSProperties; }) =>
{
	const data = useRef({ cardWidth: 0, totalWidth: 0, distancePerScroll: 0, windowWidth: 0 });

	const [contentRemainingToLeft, setContentRemainingToLeft] = useState(0);
	const [contentRemainingToRight, setContentRemainingToRight] = useState(0);

	const [scrollOffset, setScrollOffset] = useState(0);


	const listGap = 20;
	const containerRef = useRef<HTMLDivElement | null>(null);

	const onMountAndResize = () => 
	{
		if (containerRef.current === null)
		{
			return;
		}
		const windowWidth = containerRef.current.clientWidth;

		//const cardWidth = 250;//Math.max(230, windowWidth / 4);

		const totalWidth = children.length * (cardWidth + listGap);

		setContentRemainingToRight(totalWidth - windowWidth);
		setContentRemainingToLeft(0);
		setScrollOffset(0);
		const distancePerScroll = totalWidth / children.length;

		data.current = { cardWidth, totalWidth, distancePerScroll, windowWidth };
	};


	useEffect(() =>
	{
		onMountAndResize();

		window.addEventListener("resize", onMountAndResize);

		return () => window.removeEventListener("resize", onMountAndResize);
	}, []);


	const incrementScroll = () =>
	{
		setScrollOffset(Math.min(data.current.totalWidth - data.current.windowWidth, scrollOffset + data.current.distancePerScroll));
		setContentRemainingToRight(contentRemainingToRight - data.current.distancePerScroll);
		setContentRemainingToLeft(contentRemainingToLeft + data.current.distancePerScroll);
	};

	const decrementScroll = () =>
	{
		setScrollOffset(Math.max(0, scrollOffset - data.current.distancePerScroll));
		setContentRemainingToLeft(contentRemainingToLeft - data.current.distancePerScroll);
		setContentRemainingToRight(contentRemainingToRight + data.current.distancePerScroll);
	};

	return (
		<div className="slideshowWrapper" ref={containerRef} style={{ ...style }}>
			<div className="slideshow" style={{ gap: listGap, left: (-scrollOffset + "px") }}>
				{React.Children.map(children, child =>
				{
					if (React.isValidElement(child))
					{
						return React.cloneElement(child as React.ReactElement, {
							style: { ...child.props.style, width: data.current.cardWidth + "px" }
						});
					}

				})}
				{/* {contents.map((content, index) => <SlideshowCard key={index} style={{ width: data.current.cardWidth + "px" }}>{content}</SlideshowCard>)} */}
			</div>
			<div className={"floatingArrow left" + (contentRemainingToLeft <= 0 ? " disabled" : "")} onClick={decrementScroll}><div className="arrow left"></div></div>
			<div className={"floatingArrow right" + (contentRemainingToRight <= 0 ? " disabled" : "")} onClick={incrementScroll}><div className="arrow right"></div></div>
		</div>
	);
};

export default Slideshow;