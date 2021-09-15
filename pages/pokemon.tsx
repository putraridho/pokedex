import { Box } from "@chakra-ui/react";
import axios from "axios";
import PokemonList from "components/PokemonList";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";

function PokemonPage() {
	const [pokemonList, setPokemonLists] = useState<IPokemonResponse[]>([]);
	const [endpoint, setEndpoint] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=12");

	const { data: states, isLoading } = useQuery<{
		results: IPokemonResponse[];
		previous: string | null;
		next: string | null;
		count: number;
	}>(
		["fetch pokemon", endpoint],
		async () => {
			const res = await axios(endpoint);

			return res.data;
		},
		{
			onSuccess(data) {
				const newPokemon: IPokemonResponse[] = [];

				data.results.forEach((pokemon) => {
					const exist = pokemonList.some(({ name }) => name === pokemon.name);
					if (!exist) {
						newPokemon.push(pokemon);
					}
				});
				setPokemonLists((curr) => [...curr, ...newPokemon]);
			},
		}
	);

	const addMorePokemons = useCallback(() => {
		if (states?.next) {
			setEndpoint(states.next);
		}
	}, [states?.next]);

	return (
		<>
			<Head>
				<title>Pokédex - Pokemon API</title>
				<meta property="og:title" content="Pokedex based on PokeAPI" key="title" />
			</Head>
			<Box pt="60px" minH="100vh" backgroundColor="#f2f2f2">
				<PokemonList
					pokemons={pokemonList}
					callback={addMorePokemons}
					hasMore={!!states?.next}
					isLoading={isLoading}
				/>
			</Box>
		</>
	);
}

export default PokemonPage;
