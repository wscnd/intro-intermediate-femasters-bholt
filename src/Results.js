import React from "react";
import Pet from "./Pet";

function DisplayPets(pets) {
  return (
    <>
      <h1>{pets.length} Pets Found!</h1>
      {pets.map((pet) => (
        <Pet
          // {...pet}
          key={pet.id}
          animal={pet.type}
          breed={pet.breeds.primary}
          name={pet.name}
          media={pet.photos}
          location={`${pet.contact.address.city},${pet.contact.address.state}`}
          id={pet.id}
        />
      ))}
    </>
  );
}

const Results = ({ pets: { pets, loading } }) => {
  return (
    <div className="search">
      {loading ? (
        <h1>Loading...</h1>
      ) : pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        DisplayPets(pets, loading)
      )}
    </div>
  );
};

export default Results;
