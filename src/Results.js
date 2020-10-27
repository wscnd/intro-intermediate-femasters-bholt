import React from "react";
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

const Results = ({ pets, loading }) => {
  return (
    <div className="search">
      {loading ? (
        <h1>Loading...</h1>
      ) : pets.length === 0 ? (
        <h1>No Pet Found</h1>
      ) : (
        DisplayPets(pets)
      )}
    </div>
  );
};

export default Results;
