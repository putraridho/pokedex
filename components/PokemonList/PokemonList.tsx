import React, { useMemo } from "react";
import { Box, Button } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import CardGrid from "./CardGrid";

interface PokemonListProps {
	pokemons: IPokemonResponse[];
	callback: () => void;
	hasMore?: boolean;
	isLoading?: boolean;
}

function PokemonList({
	pokemons = [],
	callback,
	hasMore = false,
	isLoading = false,
}: PokemonListProps): React.ReactElement {
	const renderPokemons = useMemo(
		() => pokemons.map((pokemon) => <PokemonCard key={pokemon.name} url={pokemon.url} />),
		[pokemons]
	);

	return (
		<Box p={8} maxW="1600px" mx="auto">
			<CardGrid>{renderPokemons}</CardGrid>

			{hasMore && (
				<Box textAlign="center" mt={8}>
					<Button
						colorScheme="primary"
						py={3}
						px={8}
						borderRadius={12}
						fontWeight="medium"
						onClick={callback}
						isLoading={isLoading}
						loadingText="Loading"
					>
						Load More
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default React.memo(PokemonList);
