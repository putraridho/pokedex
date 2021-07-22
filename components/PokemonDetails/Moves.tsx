import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

interface PokeMovesProps {
	pokemon: IPokemon;
}

function PokeMoves({ pokemon: { moves } }: PokeMovesProps) {
	return (
		<>
			<Text color="primary.500" mb={4} fontSize={16} fontWeight="medium">
				Move List
			</Text>
			<UnorderedList
				listStyleType="none"
				p={0}
				m={0}
				display="grid"
				gridTemplateColumns="repeat(2, 1fr)"
				gridGap={4}
			>
				{moves.map(({ move }) => (
					<ListItem key={move.name}>
						<Text color="primary.500">
							{move.name
								.split("-")
								.map((s) => s[0].toUpperCase() + s.substr(1))
								.join(" ")}
						</Text>
					</ListItem>
				))}
			</UnorderedList>
		</>
	);
}

export default React.memo(PokeMoves);
