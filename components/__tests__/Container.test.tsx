import { render } from "@testing-library/react";
import Container from "../Container";

describe("<Container />", () => {
	test("render component", () => {
		const { getByText } = render(<Container>Hi</Container>);
		expect(getByText("Hi")).toBeInTheDocument();
	});
});
