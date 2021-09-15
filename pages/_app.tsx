import { ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import theme from "utils/theme";

import Header from "components/Header";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

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
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</motion.div>
		</ChakraProvider>
	);
}
export default MyApp;
