import { render } from "@testing-library/react";
import PokemonDetails from "..";
import { bulbasaur, ivysaur, venusaur } from "utils/pokemon-test";

describe("<PokemonDetails />", () => {
	test("render component", () => {
		render(<PokemonDetails pokemon={ivysaur} prev={bulbasaur} next={venusaur} />);
	});
});
