import { useRouter } from "next/dist/client/router";
import { PokemonProvider } from "../context/pokemon";
import PokemonLayout from "../layouts/PokemonLayout";

function PokemonPage() {
	const router = useRouter();

	return (
		<PokemonProvider>
			<PokemonLayout query={router.query.name as string} />
		</PokemonProvider>
	);
}

export default PokemonPage;
