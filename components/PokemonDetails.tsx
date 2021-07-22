import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { useSpring, animated as a } from "react-spring";
import { usePokemonContext } from "../context/pokemon";
import useCardTheme from "../utils/useCardTheme";
import toCapitalize from "../utils/toCapitalize";
import PokeAbout from "./PokeAbout";

function PokemonDetails(): React.ReactElement {
	const { selectedPokemon } = usePokemonContext();
	const theme = useCardTheme(selectedPokemon?.types[0].type.name);
	return selectedPokemon ? (
		<PokeBox theme={theme}>
			<Box position="relative" p={10} h={`calc(100% - 400px)`}>
				<PokeSprite sprites={selectedPokemon.sprites} />
				<PokeId id={selectedPokemon.id} />
				<PokeName name={selectedPokemon.name} />
			</Box>
			<PokeTabs pokemon={selectedPokemon} />
		</PokeBox>
	) : (
		<></>
	);
}

interface PokeBoxProps {
	theme: ICardTheme;
	children: ReactNode;
}

function PokeBox({ theme, children }: PokeBoxProps) {
	const styles = useSpring({
		backgroundImage: theme.bgGradient,
	});

	return (
		<Box
			position="sticky"
			top="92px"
			color={theme.color}
			h={`calc(100vh - 124px)`}
			borderRadius={40}
			overflow="hidden"
		>
			<a.div
				style={{
					content: "",
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
					width: "100%",
					...styles,
				}}
			>
				{children}
			</a.div>
		</Box>
	);
}

interface PokeIdProps {
	id: number;
}

function PokeId({ id }: PokeIdProps) {
	return (
		<Text position="relative" fontSize={24} fontWeight="medium" lineHeight={28 / 24}>
			#{id < 10 ? "00" + id : id < 100 ? "0" + id : id}
		</Text>
	);
}

interface PokeNameProps {
	name: string;
}

function PokeName({ name }: PokeNameProps) {
	return (
		<Heading position="relative" as="h2" fontSize={36} fontWeight="bold" mt={5} lineHeight={43 / 36}>
			{toCapitalize(name)}
		</Heading>
	);
}

interface PokeSpriteProps {
	sprites: IPokemonSprites;
}

function PokeSprite({ sprites }: PokeSpriteProps) {
	const box = useRef<HTMLDivElement>(null);

	return (
		<Box
			ref={box}
			position="absolute"
			bottom={0}
			left={0}
			h="83%"
			w="100%"
			bgImage="url(bg-pokeball.png)"
			bgSize="auto 100%"
			bgPosition="center"
			bgRepeat="no-repeat"
		>
			<Image
				src={sprites.front_default}
				height="100%"
				width="auto"
				maxWidth="none"
				margin="auto"
				fallback={<></>}
			/>
		</Box>
	);
}

interface PokeTabsProps {
	pokemon: IPokemon;
}

function PokeTabs({ pokemon }: PokeTabsProps) {
	return (
		<Box position="absolute" bottom={0} left={0} h={400} w="100%">
			<Box h={68}></Box>
			<Box bgColor="white" p="40px 60px" h={332} borderRightRadius={40}>
				<PokeAbout pokemon={pokemon} />
			</Box>
		</Box>
	);
}

export default PokemonDetails;
