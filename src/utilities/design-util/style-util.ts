export function getDarkenBackground (imgUrl: string) {
	const backgroundStyle = {
		backgroundImage: `linear-gradient(to right,
	        rgba(20, 20, 20, .9),
	        rgba(30, 30, 30, .85),
	        rgba(30, 30, 30, .75),
	         rgba(35, 35, 35, .6),
	         rgba(230, 230, 230, .2),
	         rgba(35, 35, 35, .6),
	        rgba(30, 30, 30, .75),
	        rgba(30, 30, 30, .85),
	         rgba(20, 20, 20, .9)),
	           url(${imgUrl})`
	};

	return backgroundStyle;
}
