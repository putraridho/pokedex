import { render } from "@testing-library/react";
import PokeMoves from "../Moves";
import { bulbasaur } from "utils/pokemon-test";

describe("<PokeMoves />", () => {
	test("render component", () => {
		render(<PokeMoves pokemon={bulbasaur} />);
	});
});
