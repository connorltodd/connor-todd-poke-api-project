import { useState } from "react";

enum Filters {
  Habitats = "habitats",
  PokemonType = "pokemon type",
  PokemonEvolutions = "pokemon evolutions",
}

export default function SidebarFilters(props: any) {
  const [filterState, setFilterState] = useState("");
  return (
    <div className="p-4">
      <fieldset>
        <legend className="text-xl font-bold mb-4">Filter By: </legend>
        <div>
          <input
            type="radio"
            className="mr-2 mb-6"
            id={Filters.PokemonEvolutions}
            name="filters"
            value={Filters.PokemonEvolutions}
            checked={filterState === Filters.PokemonEvolutions}
            onChange={() => {
              props.getPokemonEvolutions();
              setFilterState(Filters.PokemonEvolutions);
            }}
          />
          <label className="capitalize" htmlFor={Filters.PokemonType}>
            {Filters.PokemonEvolutions}
          </label>
        </div>
        <div>
          <input
            className="mr-2 mb-6"
            type="radio"
            id={Filters.Habitats}
            name="filters"
            value={Filters.Habitats}
            checked={filterState === Filters.Habitats}
            onChange={() => setFilterState(Filters.Habitats)}
          />
          <label className="capitalize" htmlFor={Filters.Habitats}>
            {Filters.Habitats}
          </label>
        </div>

        <div>
          {filterState === Filters.Habitats ? (
            <>
              <select
                className="mb-4 bg-slate-100 rounded-md p-2 capitalize pr-2 w-[184px]"
                onChange={(event) =>
                  props.getPokemonsByHabitat(event.target.value)
                }
                defaultValue="default"
              >
                <option disabled value="default">
                  Select Habitat
                </option>
                {props.habitats.map((habitatName: string) => (
                  <option key={habitatName}>{habitatName}</option>
                ))}
              </select>
            </>
          ) : null}
        </div>

        <div>
          <input
            type="radio"
            className="mr-2 mb-4"
            id={Filters.PokemonType}
            name="filters"
            value={Filters.PokemonType}
            checked={filterState === Filters.PokemonType}
            onChange={() => setFilterState(Filters.PokemonType)}
          />
          <label className="capitalize" htmlFor={Filters.PokemonType}>
            {Filters.PokemonType}
          </label>
        </div>

        <div>
          {filterState === Filters.PokemonType ? (
            <>
              <select
                className="mb-4 bg-slate-100 rounded-md p-2 capitalize pr-2 w-[184px]"
                onChange={(event) =>
                  props.getPokemonsByType(event.target.value)
                }
                defaultValue="default"
              >
                <option disabled value="default">
                  Select Pokemon Type
                </option>
                {props.pokemonTypes.map((pokemonType: string) => (
                  <option key={pokemonType}>{pokemonType}</option>
                ))}
              </select>
            </>
          ) : null}
        </div>
      </fieldset>

      <button
        onClick={() => {
          setFilterState("");
          props.getPokemonsByType();
        }}
        className="bg-blue-700 block rounded-lg text-center border-none text-white p-2 mt-8 m-auto"
      >
        Reset Filters
      </button>
    </div>
  );
}
