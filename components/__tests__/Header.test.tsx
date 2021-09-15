import { render } from "@testing-library/react";
import Header from "../Header";

describe("<Header />", () => {
	test("render component", () => {
		const { getByText } = render(<Header />);
		expect(getByText("Pokédex")).toBeInTheDocument();
	});
});
