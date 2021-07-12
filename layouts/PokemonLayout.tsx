import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import { usePokemonContext } from "../context/pokemon";

interface PokemonLayoutProps {
	query?: string;
}

function PokemonLayout({ query }: PokemonLayoutProps) {
	const [pokemons, setPokemons] = useState<IPokemonResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [next, setNext] = useState<string | null>(null);
	const { setSelectedPokemon } = usePokemonContext();

	const fetchPokemons = useCallback(async (endpoint: string) => {
		setIsLoading(true);
		const res = await axios(endpoint);

		const { results, next: _next } = res.data;
		setPokemons((curr) => curr.concat(results));
		setNext(_next);
		setIsLoading(false);
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
		if (!next) return;

		fetchPokemons(next);
	}, [fetchPokemons, next]);

	return (
		<Box pt="60px" minH="100vh" backgroundColor="#f2f2f2">
			<Container>
				<PokemonList
					pokemons={pokemons}
					callback={addMorePokemons}
					hasMore={!!next}
					isLoading={isLoading}
				/>
				<PokemonDetails />
			</Container>
		</Box>
	);
}

export default PokemonLayout;
