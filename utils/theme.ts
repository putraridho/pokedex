import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config = {
	initialColorMode: "light",
} as ThemeConfig;

const colors = {
	header: "#EA3434",
	primary: {
		500: "#1C1F35",
		300: "#3D4056",
	},
};

const fonts = {
	heading: "Rubik, sans-serif",
	body: "Rubik, sans-serif",
};

const theme = extendTheme({ config, colors, fonts });

export default theme;
