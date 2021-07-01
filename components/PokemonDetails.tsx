import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { usePokemonContext } from "../context/pokemon";
import useCardTheme from "../utils/useCardTheme";
import { useSpring, animated as a } from "react-spring";
import { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toCapitalize from "../utils/toCapitalize";

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

interface PokeAboutProps {
	pokemon: IPokemon;
}

function PokeAbout({ pokemon }: PokeAboutProps) {
	const [species, setSpecies] = useState<IPokemonSpecies>();
	const [eggGroups, setEggGroups] = useState<any[]>([]);

	const speciesName = useMemo<string>(() => {
		const _name = pokemon.species.name;
		return toCapitalize(_name);
	}, [pokemon.species.name]);

	const height = useMemo<string>(() => {
		return (pokemon.height / 10).toFixed(1) + " m";
	}, [pokemon.height]);

	const weight = useMemo<string>(() => {
		return (pokemon.weight / 10).toFixed(1) + " kg";
	}, [pokemon.weight]);

	const abilities = useMemo<string>(() => {
		return pokemon.abilities
			.map(({ ability }) => {
				const _names = ability.name.split("-");
				return _names
					.map((_name) => {
						return toCapitalize(_name);
					})
					.join(" ");
			})
			.join(", ");
	}, [pokemon.abilities]);

	const genus = useMemo<string>(() => {
		if (species) {
			return species.genera.find(({ language }) => language.name === "en")!.genus;
		}
		return "-";
	}, [species]);

	const eggGroupNames = useMemo<string>(() => {
		return eggGroups.map(({ name }) => name[0].toUpperCase() + name.substr(1)).join(", ") || "-";
	}, [eggGroups]);

	const habitat = useMemo<string>(() => {
		if (species) {
			const _name = species.habitat.name;
			return toCapitalize(_name);
		}
		return "-";
	}, [species]);

	useEffect(() => {
		(async function () {
			setSpecies(undefined);
			const res = await axios(pokemon.species.url);
			setSpecies(res.data);
		})();
	}, [pokemon.species.url]);

	useEffect(() => {
		(async function () {
			setEggGroups([]);
			if (species) {
				const values = await Promise.all(species.egg_groups.map((egg_group) => axios(egg_group.url)));
				setEggGroups(values.map(({ data }) => data));
			}
		})();
	}, [species]);

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={5}>
			<Box>
				<Item label="Species" value={speciesName} />
				<Item label="Height" value={height} />
				<Item label="Weight" value={weight} />
				<Item label="Abilities" value={abilities} />
				<Item label="Genus" value={genus} />
			</Box>
			<Box>
				<Text fontSize={16} fontWeight="bold" mb={5} color="primary.500">
					Breeding
				</Text>
				<Item label="Gender" value={<Gender species={species} />} />
				<Item label="Egg Groups" value={eggGroupNames} />
				<Item label="Habitat" value={habitat} />
			</Box>
		</Grid>
	);
}

interface ItemProps {
	label: string;
	value: string | number | ReactNode | ReactElement | JSX.Element;
}

function Item({ label, value }: ItemProps) {
	return (
		<Flex mb={5} _last={{ mb: 0 }}>
			<Text minW="100px" fontSize={16} mr={5} color="primary.100">
				{label}
			</Text>
			<Text fontSize={16} fontWeight="medium" color="primary.500">
				{value}
			</Text>
		</Flex>
	);
}

interface GenderProps {
	species?: IPokemonSpecies;
}

function Gender({ species }: GenderProps) {
	return (
		<Flex>
			<Flex mr={5}>
				<Image src="venus.svg" fallback={<></>} mr="10px" />
				{species ? <Text>{(species.gender_rate / 8) * 100}%</Text> : <Text>-</Text>}
			</Flex>
			<Flex>
				<Image src="mars.svg" fallback={<></>} mr="10px" />
				{species ? <Text>{(1 - species.gender_rate / 8) * 100}%</Text> : <Text>-</Text>}
			</Flex>
		</Flex>
	);
}

export default PokemonDetails;
