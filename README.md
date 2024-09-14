# Connor Todd PokeAPI Project

## Project Start Guide

- Clone the project to your computer locally.
- Change into the project directory and run the command below:

### `npm install`

- Now that you have all project dependencies installed run the next command.

### `npm start`

- You should be able to interact with the site via the url http://localhost:3000

## Explanation of approach

- All responses are limited to max 20 items

- I decided to use the GraphQL API to reduce the amount of unecessary requests.

  - Using the rest API I would need to fetch the Pokemons which would give me a name and url containing an id (per pokemon)
  - Then i would need to fetch each pokemon individually via id. This would be a big O of n2 (time complexity).

- Instead the GraphQL API allowed me to fetch using just one API call and then organised the responses as I needed then. This would lead to a big O of On (time complexity).

- I can then use the API to then link up to the filters that I have created which simplifies the codebase and reduces the amount of API requests.

- I aimed to separate each function into the utils folder to allow for easier testing via unit tests, this could be improved further and if i had more time I would implement unit tests & E2E tests as well as externalise more functions into the utils folder.

- As the data returned from the API was not always consistent I created a query responses organiser which allows me to organise the data consistently ready to inject into the table.

- I used a radio button for the filters due to lack of flexibility from an API standpoint. I would have liked to combine multiple filters but the GraphQL API does not allow for it.

- I decided not to use git to track all of my changes overtime, I really should have tracked each small change. In a real project it wouldd have all been tracked viar git using atomic commits
