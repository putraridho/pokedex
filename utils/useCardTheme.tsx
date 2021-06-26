import { useCallback, useEffect, useState } from "react";

function useCardTheme(type?: string): ICardTheme {
	const [bgGradient, setBgGradient] = useState<string>("linear-gradient( #DFE0E8, #DFE0E8)");
	const [color, setColor] = useState<string>("primary.300");

	const setTheme = useCallback((_type: string) => {
		switch (_type) {
			case "normal":
				setBgGradient("linear-gradient( #B8B8B8, #E2E2E2)");
				setColor("primary.300");
				break;
			case "grass":
				setBgGradient("linear-gradient( #3FD432, #0BEBB5)");
				setColor("white");
				break;
			case "fire":
				setBgGradient("linear-gradient( #F36251, #FF8D4D)");
				setColor("white");
				break;
			case "water":
				setBgGradient("linear-gradient( #24B6F4, #3269F6)");
				setColor("white");
				break;
			case "bug":
				setBgGradient("linear-gradient( #9EDD4E, #D7DA47)");
				setColor("white");
				break;
			case "dark":
				setBgGradient("linear-gradient( #040706, #5A5979)");
				setColor("white");
				break;
			case "dragon":
				setBgGradient("linear-gradient( #ECBB0C, #F1F141)");
				setColor("white");
				break;
			case "electric":
				setBgGradient("linear-gradient( #FBFB72, #E3E32B)");
				setColor("primary.300");
				break;
			case "fairy":
				setBgGradient("linear-gradient( #E810AB, #F176E5)");
				setColor("white");
				break;
			case "fighting":
				setBgGradient("linear-gradient( #994025, #EF6138)");
				setColor("white");
				break;
			case "ice":
				setBgGradient("linear-gradient( #32CCE1, #9CFDF7)");
				setColor("primary.300");
				break;
			case "flying":
				setBgGradient("linear-gradient( #4A677D, #93B2C7)");
				setColor("white");
				break;
			case "ghost":
				setBgGradient("linear-gradient( #33336B, #906790)");
				setColor("white");
				break;
			case "ground":
				setBgGradient("linear-gradient( #A9702C, #824808)");
				setColor("white");
				break;
			case "poison":
				setBgGradient("linear-gradient( #6208AE, #A061EF)");
				setColor("white");
				break;
			case "psychic":
				setBgGradient("linear-gradient( #B70564, #F81C91)");
				setColor("white");
				break;
			case "rock":
				setBgGradient("linear-gradient( #723829, #BC6F52)");
				setColor("white");
				break;
			case "steel":
				setBgGradient("linear-gradient( #5F756D, #CBE2DA)");
				setColor("white");
				break;
			default:
				setBgGradient("linear-gradient( #DFE0E8, #DFE0E8)");
				setColor("black");
				break;
		}
	}, []);

	useEffect(() => {
		if (type) {
			setTheme(type);
		}
	}, [setTheme, type]);

	return {
		bgGradient,
		color,
		setTheme,
	};
}

export default useCardTheme;
