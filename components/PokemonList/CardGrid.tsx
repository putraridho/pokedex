import { Grid } from "@chakra-ui/react";

interface CardGridProps {
	children: React.ReactNode;
}

function CardGrid({ children }: CardGridProps): React.ReactElement {
	return (
		<Grid
			templateColumns={{
				base: "repeat(1, 1fr)",
				lg: "repeat(2, 1fr)",
				xl: "repeat(3, 1fr)",
			}}
			gap={8}
		>
			{children}
		</Grid>
	);
}

export default CardGrid;
