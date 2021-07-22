import { Box } from "@chakra-ui/react";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import { usePokemonContext } from "../context/pokemon";

interface PokemonLayoutProps {
	query?: string;
}

function PokemonLayout({ query }: PokemonLayoutProps) {
	const [states, setStates] = useState<{
		pokemons: IPokemonResponse[];
		isLoading: boolean;
		next: string | null;
	}>({
		pokemons: [],
		isLoading: true,
		next: null,
	});
	const { setSelectedPokemon } = usePokemonContext();

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
		fetchPokemons("https://pokeapi.co/api/v2/pokemon");
	}, [fetchPokemons]);

	useEffect(() => {
		if (query) {
			axios("https://pokeapi.co/api/v2/pokemon/" + query).then((res) => {
				const pokemon = res.data as IPokemon;
				setSelectedPokemon(pokemon);
			});
		}
	}, [query, setSelectedPokemon]);

	const addMorePokemons = useCallback(() => {
		if (!states.next) return;

		fetchPokemons(states.next);
	}, [fetchPokemons, states.next]);

	return (
		<Box pt="60px" minH="100vh" backgroundColor="#f2f2f2">
			<Container>
				<PokemonList
					pokemons={states.pokemons}
					callback={addMorePokemons}
					hasMore={!!states.next}
					isLoading={states.isLoading}
				/>
				<PokemonDetails />
			</Container>
		</Box>
	);
}

export default memo(PokemonLayout);
