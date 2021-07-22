import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import toCapitalize from "utils/toCapitalize";
import Mars from "components/Mars";
import Venus from "components/Venus";

interface PokeAboutProps {
	pokemon: IPokemon;
}

function PokeAbout({ pokemon }: PokeAboutProps) {
	const [species, setSpecies] = useState<IPokemonSpecies>();
	const [eggGroups, setEggGroups] = useState<IPokemonEggGroup[]>([]);

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
		return (
			eggGroups
				.map(({ name }) =>
					name
						.split("-")
						.map((_name) => toCapitalize(_name))
						.join(" ")
				)
				.join(", ") || "-"
		);
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
			{typeof value === "string" || typeof value === "number" ? (
				<Text fontSize={16} fontWeight="medium" color="primary.500">
					{value}
				</Text>
			) : (
				value
			)}
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
				<Mars />
				<Text fontSize={16} fontWeight="medium" color="primary.500" ml="10px">
					{species ? (species.gender_rate / 8) * 100 + "%" : "-"}
				</Text>
			</Flex>
			<Flex>
				<Venus />
				<Text fontSize={16} fontWeight="medium" color="primary.500" ml="10px">
					{species ? (1 - species.gender_rate / 8) * 100 + "%" : "-"}
				</Text>
			</Flex>
		</Flex>
	);
}

export default PokeAbout;
