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
				gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
				gridGap={4}
			>
				{moves.map(({ move }) => (
					<ListItem
						key={move.name}
						px={4}
						py={2}
						backgroundColor="#f2f2f2"
						color="primary.500"
						border="2px solid transparent"
						boxSizing="border-box"
						borderRadius="40"
						overflow="hidden"
						transition=".2s all linear"
						_hover={{
							borderColor: "primary.100",
							color: "primary.100",
						}}
					>
						<Text
							fontSize={14}
							fontWeight="medium"
							overflow="hidden"
							whiteSpace="nowrap"
							textOverflow="ellipsis"
						>
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
