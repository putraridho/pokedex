import { Grid } from "@chakra-ui/react";

interface CardGridProps {
	children: React.ReactNode;
}

function CardGrid({ children }: CardGridProps): React.ReactElement {
	return (
		<Grid templateColumns="repeat(3, 1fr)" gap={8}>
			{children}
		</Grid>
	);
}

export default CardGrid;
