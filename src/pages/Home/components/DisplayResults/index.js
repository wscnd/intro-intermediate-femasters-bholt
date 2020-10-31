import React, { useContext } from "react";
import StateContext from "~/context/StateContext";
import SearchResults from "~/components/SearchResults";
import Pet from "./Pet";

function DisplayPets(pets) {
  return (
    <>
      <h1>{pets.length} Pets Found!</h1>
      {pets.map((animal) => (
        <Pet
          key={animal.id}
          animal={animal.type}
          breed={animal.breeds.primary}
          name={animal.name}
          media={animal.photos}
          location={`${animal.contact.address.city},${animal.contact.address.state}`}
          id={animal.id}
        />
      ))}
    </>
  );
}

export default function DisplayResults() {
  const {
    states: {
      getters: { pets, loading },
    },
  } = useContext(StateContext);

  return (
    <SearchResults className={"search"}>
      {loading ? (
        <h1>Loading...</h1>
      ) : pets.length === 0 ? (
        <h1>No Pet Found</h1>
      ) : (
        DisplayPets(pets)
      )}
    </SearchResults>
  );
}
