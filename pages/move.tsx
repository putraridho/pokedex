import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function MovePage() {
	const [moves, setMoves] = useState<IMoveResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [next, setNext] = useState<string | null>(null);

	const fetchMoves = useCallback(async (endpoint: string) => {
		setIsLoading(true);
		const res = await axios(endpoint);

		const { results, next: _next } = res.data;
		setMoves((curr) => curr.concat(results));
		setNext(_next);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoves("https://pokeapi.co/api/v2/move");
	}, [fetchMoves]);
	return <></>;
}

export default MovePage;
