import { useRouter } from "next/dist/client/router";
import PokemonLayout from "../layouts/PokemonLayout";

function PokemonPage() {
	const router = useRouter();

	return <PokemonLayout query={router.query.name as string} />;
}

export default PokemonPage;
