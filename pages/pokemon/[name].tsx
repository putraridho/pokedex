import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import PokemonDetails from "components/PokemonDetails/PokemonDetails";

interface IStates {
	pokemon: IPokemon | null;
	isLoading: boolean;
}

function PokemonDetailPage() {
	const { query } = useRouter();
	const [states, setStates] = useState<IStates>({ pokemon: null, isLoading: true });

	useEffect(() => {
		if (query.name) {
			(async function () {
				const res = await axios(`https://pokeapi.co/api/v2/pokemon/${query.name}`);
				setStates({ pokemon: res.data as IPokemon, isLoading: false });
			})();
		}
	}, [query.name]);

	return (
		<Box pt="60px">
			<PokemonDetails pokemon={states.pokemon} />
		</Box>
	);
}

export default PokemonDetailPage;
