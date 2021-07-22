import { ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";

import theme from "utils/theme";

import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";
import Header from "components/Header";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Header />
			<motion.div
				key={router.route}
				initial="initial"
				animate="animate"
				variants={{
					initial: {
						opacity: 0,
						transform: "scale(1.1)",
					},
					animate: {
						opacity: 1,
						transform: "scale(1)",
					},
				}}
			>
				<Component {...pageProps} />
			</motion.div>
		</ChakraProvider>
	);
}
export default MyApp;
