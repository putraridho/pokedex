interface INamedAPIResource {
	name: string;
	url: string;
}

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
	move_learn_method: INamedAPIResource;
	version_group: INamedAPIResource;
	level_learned_at: number;
}

interface IPokemonSprites {
	front_default: string;
	front_shiny: string;
	front_female: string;
	front_shiny_female: string;
	back_default: string;
	back_shiny: string;
	back_female: string;
	back_shiny_female: string;
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
