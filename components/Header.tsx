import { Flex, Heading, Image } from "@chakra-ui/react";

function Header() {
	return (
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
			<Image
				src="pokeball.png"
				height={10}
				width={10}
				mr={3}
				htmlHeight={40}
				htmlWidth={40}
				fallback={<></>}
			/>
			<Heading as="h1" color="white" fontSize="2xl" fontWeight="500">
				Pokédex
			</Heading>
		</Flex>
	);
}
export default Header;
