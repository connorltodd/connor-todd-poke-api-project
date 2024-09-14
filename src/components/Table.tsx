import { Pokemon } from "../types";

export default function Table(props: { pokemons: Pokemon[] }) {
  const { pokemons } = props;
  return (
    <div>
      <div className="w-[900px] m-auto">
        <table className="ml-[40px] mb-20">
          <thead>
            {pokemons?.length ? (
              <tr>
                <th className="w-[250px] text-left">Name</th>
                <th className="w-[250px] text-left">Weight</th>
                <th className="w-[250px] text-left">Generation</th>
                {pokemons[0]?.evolutions && (
                  <th className="w-[350px] text-left">Evolutions</th>
                )}
              </tr>
            ) : null}
          </thead>
          <tbody>
            {pokemons?.length
              ? pokemons?.map((pokemon: Pokemon) => (
                  <tr key={pokemon.name}>
                    <td className="w-[250px] capitalize">{pokemon.name}</td>
                    <td className="w-[250px]">{pokemon.weight}</td>
                    <td className="w-[250px]">{pokemon.generationName}</td>
                    {pokemon?.evolutions ? (
                      <td className="w-[250px]">
                        {pokemon.evolutions.toLocaleString()}
                      </td>
                    ) : null}
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        {pokemons?.length === 0 ? (
          <h1 className="text-center text-3xl">
            No Pokemons found for this search
          </h1>
        ) : null}
      </div>
    </div>
  );
}
