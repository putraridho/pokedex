import { Box } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonDetails from "components/PokemonDetails";
import { useQuery } from "react-query";

interface IStates {
	pokemon: IPokemon | null;
	prevPokemon: IPokemon | null;
	nextPokemon: IPokemon | null;
	isLoading: boolean;
}

function PokemonDetailPage() {
	const { query } = useRouter();

	const { data: pokemon } = useQuery<IPokemon>(
		["fetch pokemon", query.name],
		async () => {
			const { data: response } = await axios(`https://pokeapi.co/api/v2/pokemon/${query.name}`);
			return response;
		},
		{
			enabled: !!query.name,
		}
	);

	return (
		<>
			<Head>
				<title>Pokédex - Pokemon API</title>
				<meta property="og:title" content="Pokedex based on PokeAPI" key="title" />
			</Head>
			<Box pt="60px">
				<PokemonDetails pokemon={pokemon || null} prev={null} next={null} />
			</Box>
		</>
	);
}

export default PokemonDetailPage;
