import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";

interface IPokemonContext {
	selectedPokemon: IPokemon | null;
	setSelectedPokemon: Dispatch<SetStateAction<IPokemon | null>>;
}

const Context = createContext<IPokemonContext>({
	selectedPokemon: null,
	setSelectedPokemon: () => null,
});

export const PokemonProvider = function ({ children }: { children: ReactNode }) {
	const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);

	const value = useMemo(
		() => ({
			selectedPokemon,
			setSelectedPokemon,
		}),
		[selectedPokemon]
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const usePokemonContext = () => useContext(Context);
