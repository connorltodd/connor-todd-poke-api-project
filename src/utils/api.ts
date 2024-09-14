export async function API(query: string, variables: unknown) {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
    method: "POST",
  });

  const data = await response.json();

  return data;
}
