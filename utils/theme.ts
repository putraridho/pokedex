import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";

const global = {
	body: {
		width: "100%",
		overflowX: "hidden",
	},
};

const config = {
	initialColorMode: "light",
} as ThemeConfig;

const colors = {
	header: "#EA3434",
	primary: {
		500: "#1C1F35",
		300: "#3D4056",
		100: "#666982",
	},
};

const fonts = {
	heading: "Rubik, sans-serif",
	body: "Rubik, sans-serif",
};

const theme = extendTheme({ styles: { global }, config, colors, fonts });

export default theme;
