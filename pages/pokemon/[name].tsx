import { Box } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PokemonDetails from "components/PokemonDetails";

interface IStates {
	pokemon: IPokemon | null;
	prevPokemon: IPokemon | null;
	nextPokemon: IPokemon | null;
	isLoading: boolean;
}

function PokemonDetailPage() {
	const { query } = useRouter();
	const [states, setStates] = useState<IStates>({
		pokemon: null,
		isLoading: true,
		prevPokemon: null,
		nextPokemon: null,
	});

	useEffect(() => {
		if (query.name) {
			(async function () {
				const res = await axios(`https://pokeapi.co/api/v2/pokemon/${query.name}`);
				setStates((curr) => ({ ...curr, pokemon: res.data as IPokemon, isLoading: false }));
			})();
		}
	}, [query.name]);

	useEffect(() => {
		if (states.pokemon) {
			(async function () {
				try {
					const res = await axios(`https://pokeapi.co/api/v2/pokemon/${states.pokemon!.id - 1}`);
					setStates((curr) => ({ ...curr, prevPokemon: res.data as IPokemon }));
				} catch (err) {
					setStates((curr) => ({ ...curr, prevPokemon: null }));
				}
			})();
			(async function () {
				try {
					const res = await axios(`https://pokeapi.co/api/v2/pokemon/${states.pokemon!.id + 1}`);
					setStates((curr) => ({ ...curr, nextPokemon: res.data as IPokemon }));
				} catch (err) {
					setStates((curr) => ({ ...curr, nextPokemon: null }));
				}
			})();
		}
	}, [states.pokemon]);

	return (
		<>
			<Head>
				<title>Pokédex - Pokemon API</title>
				<meta property="og:title" content="Pokedex based on PokeAPI" key="title" />
			</Head>
			<Box pt="60px">
				<PokemonDetails pokemon={states.pokemon} prev={states.prevPokemon} next={states.nextPokemon} />
			</Box>
		</>
	);
}

export default PokemonDetailPage;
