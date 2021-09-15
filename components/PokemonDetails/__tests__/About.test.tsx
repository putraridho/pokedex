import { render } from "@testing-library/react";
import PokeAbout from "../About";
import { bulbasaur } from "utils/pokemon-test";

describe("<PokeAbout />", () => {
	test("render component", () => {
		render(<PokeAbout pokemon={bulbasaur} />);
	});
});
