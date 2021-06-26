import { Box, Heading, ListItem, Progress, Text, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSpring, animated as a } from "react-spring";
import useCardTheme from "../utils/useCardTheme";

interface PokemonCardProps {
	url: string;
}

export default function PokemonCard({ url }: PokemonCardProps): React.ReactElement {
	const [pokemon, setPokemon] = useState<IPokemon | null>(null);

	const theme = useCardTheme(pokemon?.types[0].type.name);

	useEffect(() => {
		(async function () {
			const res = await axios(url);
			const { data } = res;
			setTimeout(() => {
				setPokemon(data);
			}, 200);
		})();
	}, [url]);

	const typeMouseOverHandler = useCallback(
		(type: string) => {
			theme.setTheme(type);
		},
		[theme]
	);

	return pokemon ? (
		<PokeBox theme={theme}>
			<PokeSprite sprites={pokemon.sprites} />
			<PokeName name={pokemon.name} />
			<Box position="absolute" zIndex={1} top={6} right={8}>
				<PokeId id={pokemon.id} />
			</Box>
			<UnorderedList position="relative" zIndex={1} display="flex" listStyleType="none" m={0} p={0}>
				<PokeTypes types={pokemon.types} onMouseOver={typeMouseOverHandler} />
			</UnorderedList>
		</PokeBox>
	) : (
		<LoadingBox />
	);
}

function LoadingBox() {
	return (
		<Box
			position="relative"
			pt={(249 / 442) * 100 + "%"}
			borderRadius={12}
			boxShadow="0 8px 12px rgba(0, 0, 0, 0.16)"
		>
			<Progress
				position="absolute"
				top="0"
				left="0"
				w="100%"
				h="100%"
				borderRadius={12}
				isIndeterminate
				colorScheme="whiteAlpha"
				bgColor="#DFE0E8"
			/>
		</Box>
	);
}

interface PokeBoxProps {
	theme: ICardTheme;
	children: React.ReactNode;
}

function PokeBox({ theme, children }: PokeBoxProps) {
	const styles = useSpring({
		backgroundImage: theme.bgGradient,
	});

	return (
		<Box
			position="relative"
			pt={(249 / 442) * 100 + "%"}
			borderRadius={12}
			boxShadow="0 8px 12px rgba(0, 0, 0, 0.16)"
			overflow="hidden"
			color={theme.color}
			cursor="pointer"
			transition=".2s all linear"
			_hover={{
				boxShadow: "0 0 0 rgba(0, 0, 0, 0.16)",
				transform: "translateY(4px)",
			}}
			_before={{
				content: '""',
				position: "absolute",
				top: 0,
				left: 0,
				h: "100%",
				w: "100%",
				backgroundImage: "url(bg-pokeball.png)",
				backgroundSize: `auto ${(220 / 249) * 100}%`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: `19px 380%`,
			}}
			_after={{
				content: '""',
				position: "absolute",
				top: 0,
				left: 0,
				h: "100%",
				w: "100%",
				backgroundImage: "url(outline-vector.png)",
				backgroundSize: `auto`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: `calc(100% - 32px) 50%`,
			}}
		>
			<a.div
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					top: 0,
					left: 0,
					padding: "24px 32px",
					zIndex: 1,
					...styles,
				}}
			>
				{children}
			</a.div>
		</Box>
	);
}

interface PokeNameProps {
	name: string;
}

function PokeName({ name }: PokeNameProps) {
	return (
		<Heading position="relative" as="h2" fontSize={24} mb={3}>
			{name
				.split(" ")
				.map((s) => s[0].toUpperCase() + s.substring(1))
				.join(" ")}
		</Heading>
	);
}

interface PokeIdProps {
	id: number;
}

function PokeId({ id }: PokeIdProps) {
	return (
		<Text fontSize={16} fontWeight="medium">
			#{("00" + id).substr(-3)}
		</Text>
	);
}

interface IPokeTypesProps {
	types: IPokemonType[];
	onMouseOver: (type: string) => void;
}

function PokeTypes({ types, onMouseOver }: IPokeTypesProps) {
	return (
		<>
			{types.map(({ type }) => (
				<ListItem
					key={type.name}
					mr={2}
					backgroundColor="rgba(255, 255, 255, .25)"
					borderRadius={12}
					fontSize="14px"
					fontWeight="medium"
					lineHeight="17px"
					padding="4px 12px"
					_last={{
						mr: 0,
					}}
					onMouseOver={() => onMouseOver(type.name)}
				>
					{type.name[0].toUpperCase() + type.name.substring(1)}
				</ListItem>
			))}
		</>
	);
}

interface IPokeSpriteProps {
	sprites: IPokemonSprites;
}

function PokeSprite({ sprites }: IPokeSpriteProps) {
	return (
		<Box
			position="absolute"
			top={0}
			right={0}
			h="100%"
			w="100%"
			bgImage={sprites.front_default}
			bgSize="auto 100%"
			bgRepeat="no-repeat"
			bgPosition="right top"
			zIndex={1}
		/>
	);
}
