import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PokemonList from "components/PokemonList/PokemonList";

function PokemonPage() {
	const [states, setStates] = useState<{
		pokemons: IPokemonResponse[];
		isLoading: boolean;
		next: string | null;
	}>({
		pokemons: [],
		isLoading: true,
		next: null,
	});

	const fetchPokemons = useCallback(async (endpoint: string) => {
		setStates((curr) => ({ ...curr, isLoading: true }));
		const res = await axios(endpoint);

		const { results, next: _next } = res.data;
		setStates((curr) => {
			return {
				pokemons: curr.pokemons.concat(results),
				next: _next,
				isLoading: false,
			};
		});
	}, []);

	useEffect(() => {
		fetchPokemons("https://pokeapi.co/api/v2/pokemon?limit=12");
	}, [fetchPokemons]);

	const addMorePokemons = useCallback(() => {
		if (!states.next) return;

		fetchPokemons(states.next);
	}, [fetchPokemons, states.next]);

	return (
		<Box pt="60px" minH="100vh" backgroundColor="#f2f2f2">
			<PokemonList
				pokemons={states.pokemons}
				callback={addMorePokemons}
				hasMore={!!states.next}
				isLoading={states.isLoading}
			/>
		</Box>
	);
}

export default PokemonPage;
