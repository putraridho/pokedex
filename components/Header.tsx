import { Box, Flex, Heading, Link, Image } from "@chakra-ui/react";
import NextLink from "next/link";

function Header() {
	return (
		<header data-testid="header">
			<Flex
				background="header"
				position="fixed"
				w="100%"
				height="60px"
				top={0}
				left={0}
				px={8}
				alignItems="center"
				zIndex={10}
			>
				<NextLink href="/pokemon">
					<Link
						display="flex"
						alignItems="center"
						_hover={{
							textDecor: "none",
						}}
					>
						<Image
							src="/pokeball.png"
							height={10}
							width={10}
							mr={3}
							htmlHeight={40}
							htmlWidth={40}
							fallback={<Box h={10} w={10} mr={3} />}
							alt="pokeball"
						/>
						<Heading as="h1" color="white" fontSize="2xl" fontWeight="500">
							Pokédex
						</Heading>
					</Link>
				</NextLink>
			</Flex>
		</header>
	);
}
export default Header;
