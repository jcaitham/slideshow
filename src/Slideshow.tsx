import React, { useEffect, useRef, useState } from 'react';
import "./Slideshow.scss";


/**
 * Card that goes inside the main slideshow component.  You should flesh out the contents of the card.  Your contents should use width: 100%,
 * rather than hard-coding any specific pixel widths
 * @param props Special children property, plus any style overrides that you might like to apply to the card (such as border-radius)
 */
export const SlideshowCard = ({ children, style, className }: { children: React.ReactNode, style?: React.CSSProperties, className?: string; }) =>
{
	return (
		<article className={"highlightWhite background card shadow " + className} style={{ ...style }} >
			{children}
		</article>
	);
};

/** 
 * A simple slideshow component.  Will show a horizontal list of cards along with scroll arrows to move left & right through the list.  
 * Will size itself to fill its container and will resize if the window resizes 
 * @param props The special children property, the desired width for each card, in pixels, plus any style overrides that you might like to apply to the list (like margins)
 */
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
		const windowWidth = containerRef.current.clientWidth;  // width of the "window" through which we are looking at the card list

		const totalWidth = children.length * (cardWidth + listGap);  // total width required by the list of cards

		setContentRemainingToRight(totalWidth - windowWidth);
		setContentRemainingToLeft(0);
		setScrollOffset(0);
		const distancePerScroll = totalWidth / children.length;

		data.current = { cardWidth, totalWidth, distancePerScroll, windowWidth };
	};

	// on intial component mount, calculate some size-related things, and attach a handler to repeat this operation if the window resizes
	useEffect(() =>
	{
		onMountAndResize();

		window.addEventListener("resize", onMountAndResize);

		return () => window.removeEventListener("resize", onMountAndResize);
	}, []);

	// scroll to the right
	const incrementScroll = () =>
	{
		setScrollOffset(Math.min(data.current.totalWidth - data.current.windowWidth, scrollOffset + data.current.distancePerScroll));
		setContentRemainingToRight(contentRemainingToRight - data.current.distancePerScroll);
		setContentRemainingToLeft(contentRemainingToLeft + data.current.distancePerScroll);
	};

	// scroll to the left
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
						const returnValue = React.cloneElement(child as React.ReactElement, {
							style: { ...child.props.style, width: data.current.cardWidth + "px" }
						});
						return returnValue;
					}
				})}
			</div>
			<div className={"floatingArrow left" + (contentRemainingToLeft <= 0 ? " disabled" : "")} onClick={decrementScroll}><div className="arrow left"></div></div>
			<div className={"floatingArrow right" + (contentRemainingToRight <= 0 ? " disabled" : "")} onClick={incrementScroll}><div className="arrow right"></div></div>
		</div>
	);
};

export default Slideshow;