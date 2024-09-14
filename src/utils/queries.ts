// GET all pokemons and allow filter by type
export const getPokemonsQuery = `query GetPokemons ($typeFilter: pokemon_v2_pokemon_bool_exp) {
  pokemon_v2_pokemon(limit: 20, where: $typeFilter) {
    height
    id
    name
    pokemon_species_id
    base_experience
    is_default
    order
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        id
        name
        pokemon_v2_generation {
          name
        }
      }
    }
  }
}
`;

// Filter pokemons by habitats
export const getPokemonsByHabitatsQuery = `query HabitatsQuery($habitatFilter: pokemon_v2_pokemonhabitat_bool_exp) {
  pokemon_v2_pokemonhabitat(where: $habitatFilter) {
    name
    pokemon_v2_pokemonspecies (limit: 20) {
      name
      id
      pokemon_v2_generation {
        name
      }
      pokemon_v2_pokemons {
        weight
      }
    }
  }
}`;

// Display pokemons by evolutions
export const evolutionsQuery = ` query EvolutionsQuery {
  pokemon_v2_evolutionchain(limit: 20) {
    pokemon_v2_pokemonspecies {
      name
      id
      is_baby
      hatch_counter
      pokemon_v2_generation {
        name
      }
      pokemon_v2_pokemonhabitat {
        name
      }
      pokemon_v2_pokemons {
        weight
      }
    }
  }
}`;

// GET all habitats
export const getHabitatsListQuery = `query HabitatsList {
  pokemon_v2_pokemonhabitat {
    name
  }
}`;

// GET all habitats
export const getPokemonTypesQuery = `query GetPokemonTypes($_eq: Int = 5) {
  pokemon_v2_type {
    name
  }
}`;
