import { Pokemon } from "../types";

export function pokemonByTypeOrganiser(pokemons: []) {
  let result = pokemons.map((pokemon: any) => {
    return {
      name: pokemon.name,
      weight: pokemon.weight,
      generationName:
        pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemon_v2_generation
          .name,
    };
  });

  return result as Pokemon[];
}

export function pokemonsEvolutionsOrganiser(pokemons: any) {
  const result: Pokemon[] = [];
  for (let i = 0; i < pokemons.length; i++) {
    const pokemonEvolutions = pokemons[i].pokemon_v2_pokemonspecies;
    result.push({
      name: pokemonEvolutions[0].name,
      weight: pokemonEvolutions[0].pokemon_v2_pokemons[0].weight,
      generationName: pokemonEvolutions[0].pokemon_v2_generation.name,
      evolutions: pokemonEvolutions.map((species: any) => species.name),
    });
  }

  return result as Pokemon[];
}

export function pokemonsByHabitatOrganiser(pokemons: any) {
  const result: Pokemon[] = [];
  for (let i = 0; i < pokemons.length; i++) {
    result.push({
      name: pokemons[i].name,
      weight: pokemons[i].pokemon_v2_pokemons[0].weight,
      generationName: pokemons[i].pokemon_v2_generation.name,
    });
  }

  return result;
}
