import { Pokemon } from "../types";

export const pokemonAlphabeticSort = (pokemons: Pokemon[], desc: boolean) => {
  // alphabetic order A - Z
  let result = pokemons.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // alphabetic order Z - A
  if (desc) {
    result = result.reverse();
  }
  return result;
};

export const pokemonWeightNumericSort = (
  pokemons: Pokemon[],
  desc: boolean
) => {
  // numeric order LOW - HIGH
  let result = pokemons.sort(function (a, b) {
    if (a.weight < b.weight) {
      return -1;
    }
    if (a.weight > b.weight) {
      return 1;
    }
    return 0;
  });

  // numeric order HIGH - LOW
  if (desc) {
    result = result.reverse();
  }
  return result;
};
