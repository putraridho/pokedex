import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
}

function Container({ children }: ContainerProps): React.ReactElement {
	return (
		<Grid px={8} pt={5} templateColumns="repeat(2, 1fr)" gap={8} h="100%">
			{children}
		</Grid>
	);
}

export default Container;
