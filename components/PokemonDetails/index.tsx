import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactNode, useEffect, useRef } from "react";
import { useSpring, animated as a } from "react-spring";
import useCardTheme from "utils/useCardTheme";
import toCapitalize from "utils/toCapitalize";
import PokeAbout from "./About";
import PokeMoves from "./Moves";

interface PokemonDetailsProps {
	pokemon: IPokemon | null;
	prev: IPokemon | null;
	next: IPokemon | null;
}

function PokemonDetails({ pokemon, prev, next }: PokemonDetailsProps): React.ReactElement {
	const theme = useCardTheme(pokemon?.types[0].type.name);

	return (
		<>
			{prev && (
				<Box position="fixed" top="300px" left="20px" zIndex={100}>
					<NextLink href={`/pokemon/${prev.name}`}>
						<Link>Prev</Link>
					</NextLink>
				</Box>
			)}
			<Box p={8}>
				{pokemon ? (
					<>
						<PokeBox theme={theme}>
							<Box position="relative" p={10} h={490}>
								<PokeSprite sprites={pokemon.sprites} />
								<PokeId id={pokemon.id} />
								<PokeName name={pokemon.name} />
							</Box>
							<PokeTabs pokemon={pokemon} />
						</PokeBox>
					</>
				) : (
					<></>
				)}
			</Box>
			{next && (
				<Box position="fixed" top="300px" right="20px" zIndex={100}>
					<NextLink href={`/pokemon/${next.name}`}>
						<Link>Next</Link>
					</NextLink>
				</Box>
			)}
		</>
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
			position="relative"
			color={theme.color}
			borderRadius={40}
			maxW="975px"
			mx="auto"
			boxShadow="0 8px 12px rgba(0, 0, 0, 0.16)"
		>
			<a.div
				style={{
					content: "",
					position: "absolute",
					top: 0,
					left: 0,
					borderRadius: 40,
					height: "100%",
					width: "100%",
					...styles,
				}}
			/>
			{children}
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
			top={70}
			left={0}
			h="420px"
			w="100%"
			bgImage="url(/bg-pokeball.png)"
			bgSize="auto 100%"
			bgPosition="center"
			bgRepeat="no-repeat"
		>
			<Image
				src={sprites.other["official-artwork"].front_default}
				alt="pokemon front"
				height="90%"
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
		<Box position="relative" zIndex={100}>
			<Box h={68}></Box>
			<Box bgColor="white" p="40px 60px" borderRightRadius={40} borderBottomLeftRadius={40}>
				<PokeAbout pokemon={pokemon} />
				{/* <PokeMoves pokemon={pokemon} /> */}
			</Box>
		</Box>
	);
}

export default React.memo(PokemonDetails);
