import { useState, useEffect } from "react";

import Header from "./components/Header";
import SidebarFilters from "./components/SidebarFilters";
import Table from "./components/Table";
import {
  evolutionsQuery,
  getPokemonsQuery,
  getPokemonsByHabitatsQuery,
  getHabitatsListQuery,
  getPokemonTypesQuery,
} from "./utils/queries";
import { API } from "./utils/api";
import {
  pokemonByTypeOrganiser,
  pokemonsByHabitatOrganiser,
  pokemonsEvolutionsOrganiser,
} from "./utils/query-responses-organiser";
import { Pokemon } from "./types";
import {
  pokemonAlphabeticSort,
  pokemonWeightNumericSort,
} from "./utils/table-sorting-helpers";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [habitats, setHabitats] = useState<String[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<String[]>([]);
  const [tableSortValue, setTableSortValue] = useState("");
  const [csvDownloadData, setCsvDownloadData] = useState<string[][]>([]);

  useEffect(() => {
    // get default set of pokemons to fill the table on page load
    getPokemonsByType();

    // get habitats and pokemon types for filters
    getHabitatsList();
    getPokemonTypesList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    organiseCSV();
    // eslint-disable-next-line
  }, [pokemons]);

  const organiseCSV = () => {
    let csvData = [["name", "weight", "generationName"]];
    if (pokemons[0]?.evolutions) {
      csvData[0].push("evolutions");
    }

    const pokemonsData: Pokemon[] = [...pokemons];

    for (let i = 0; i < pokemonsData.length; i++) {
      const row = [
        pokemonsData[i].name,
        pokemonsData[i].weight,
        pokemonsData[i].generationName,
      ];
      if (pokemons[0]?.evolutions) {
        row.push(String(pokemonsData[i].evolutions));
      }
      csvData.push(row);
    }

    setCsvDownloadData(csvData);
  };

  const getPokemonTypesList = async () => {
    const pokemonTypes = await API(getPokemonTypesQuery, {});
    setPokemonTypes(
      pokemonTypes.data.pokemon_v2_type.map(
        (type: { name: string }) => type.name
      )
    );
  };

  const getHabitatsList = async () => {
    const habitats = await API(getHabitatsListQuery, {});
    setHabitats(
      habitats.data.pokemon_v2_pokemonhabitat.map(
        (habitat: { name: string }) => habitat.name
      )
    );
  };

  const getPokemonsByType = async (type?: string) => {
    let filter = {};
    if (type) {
      filter = { _eq: type };
    }
    const pokemons = await API(getPokemonsQuery, {
      typeFilter: {
        pokemon_v2_pokemontypes: {
          // if name is empty we fetch the first twenty otherwise we fetch via type e.g. "fire"
          pokemon_v2_type: { name: filter },
        },
      },
    });
    const organisedPokemons = pokemonByTypeOrganiser(
      pokemons.data.pokemon_v2_pokemon
    );
    // this checks the sorting value and sorts the table accordingly
    sortTable(tableSortValue, organisedPokemons);
  };

  const getPokemonEvolutions = async () => {
    const pokemonEvolutions = await API(evolutionsQuery, {});
    const organisedPokemonEvolutions = pokemonsEvolutionsOrganiser(
      pokemonEvolutions.data.pokemon_v2_evolutionchain
    );
    // this checks the sorting value and sorts the table accordingly
    sortTable(tableSortValue, organisedPokemonEvolutions);
  };

  const getPokemonsByHabitat = async (habitat: string) => {
    const pokemonByHabitat = await API(getPokemonsByHabitatsQuery, {
      habitatFilter: { name: { _eq: habitat } },
    });

    const organisedPokemonsByHabitat = pokemonsByHabitatOrganiser(
      pokemonByHabitat.data.pokemon_v2_pokemonhabitat[0]
        .pokemon_v2_pokemonspecies
    );

    // this checks the sorting value and sorts the table accordingly
    sortTable(tableSortValue, organisedPokemonsByHabitat);
  };

  const sortTable = (sortingOption: string, pokemons: Pokemon[]) => {
    setTableSortValue(sortingOption);
    switch (sortingOption) {
      case "alphabetic.asc":
        setPokemons(pokemonAlphabeticSort(pokemons, false));
        break;
      case "alphabetic.desc":
        setPokemons(pokemonAlphabeticSort(pokemons, true));
        break;
      case "weight.asc":
        setPokemons(pokemonWeightNumericSort(pokemons, false));
        break;
      case "weight.desc":
        setPokemons(pokemonWeightNumericSort(pokemons, true));
        break;
      default:
        setPokemons(pokemons);
        break;
    }
  };

  return (
    <div>
      <Header
        sortTable={(sortingOption: string) =>
          sortTable(sortingOption, [...pokemons])
        }
        csvDownloadData={csvDownloadData}
      />
      <div className="flex gap-8 items-center justify-center pt-12">
        <div className="self-start bg-white min-h-[300px] w-[220px] rounded-lg">
          <SidebarFilters
            getPokemonsByHabitat={getPokemonsByHabitat}
            habitats={habitats}
            getPokemonsByType={getPokemonsByType}
            pokemonTypes={pokemonTypes}
            getPokemonEvolutions={getPokemonEvolutions}
          />
        </div>

        <Table pokemons={pokemons} />
      </div>
    </div>
  );
}

export default App;
