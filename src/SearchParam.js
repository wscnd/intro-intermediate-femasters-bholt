import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breedList, setBreedList] = useState([]);
  const [animal, , AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breedList);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setPets(animals || []);
  }

  useEffect(() => {
    setBreedList([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      setBreedList(apiBreeds.map(({ name }) => name));
    }, console.error);
  }, [animal, setBreed]);

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={{ pets, loading }} />
    </div>
  );
};

export default SearchParams;
