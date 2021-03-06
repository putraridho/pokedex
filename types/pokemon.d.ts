interface IPokemonResponse extends INamedAPIResource {}

interface IPokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: IPokemonAbility[];
	forms: INamedAPIResource[];
	game_indices: IVersionGameIndex[];
	held_items: IPokemonHeldItem[];
	location_area_encounters: string;
	moves: IPokemonMove[];
	sprites: IPokemonSprites;
	species: INamedAPIResource;
	stats: IPokemonStat[];
	types: IPokemonType[];
	past_types: any[];
}

interface IPokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: INamedAPIResource;
}

interface IVersionGameIndex {
	game_index: number;
	version: INamedAPIResource;
}

interface IPokemonHeldItem {
	item: INamedAPIResource;
	version_details: IPokemonHeldItemVersion;
}

interface IPokemonHeldItemVersion {
	version: INamedAPIResource;
	rarity: number;
}

interface IPokemonMove {
	move: IMoveResponse;
	version_group_details: IPokemonMoveVersion[];
}

interface IPokemonMoveVersion {
	move_learn_method: INamedAPIResource;
	version_group: INamedAPIResource;
	level_learned_at: number;
}

interface IPokemonSprites {
	front_default: string;
	front_shiny: string;
	front_female: string | null;
	front_shiny_female: string | null;
	back_default: string;
	back_shiny: string;
	back_female: string | null;
	back_shiny_female: string | null;
	other: {
		dream_world: {
			front_default: string;
			front_female: string | null;
		};
		"official-artwork": {
			front_default: string;
		};
	};
	versions: any;
}

interface IPokemonStat {
	stat: INamedAPIResource;
	effort: number;
	base_stat: number;
}

interface IPokemonType {
	slot: number;
	type: INamedAPIResource;
}
