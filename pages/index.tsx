import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import PokemonList from "../components/PokemonList";

function Home() {
	const [pokemons, setPokemons] = useState<IPokemonResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [next, setNext] = useState<string | null>(null);

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

	const addMorePokemons = useCallback(() => {
		if (!next) return;

		fetchPokemons(next);
	}, [fetchPokemons, next]);

	return (
		<Box pt="60px" minH="100vh" backgroundColor="#f2f2f2">
			<Header />
			<Container>
				<PokemonList
					pokemons={pokemons}
					callback={addMorePokemons}
					hasMore={!!next}
					isLoading={isLoading}
				/>
			</Container>
		</Box>
	);
}

export default Home;
