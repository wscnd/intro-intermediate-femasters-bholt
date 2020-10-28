import pet, { ANIMALS } from "@frontendmasters/pet";
import React, { useContext, useEffect, useState } from "react";
import HomeLocation from "./HomeLocation";
import Results from "./Results";
import ThemeColor from "./ThemeColor";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";

const SearchParams = ({ location: locationFromProps }) => {
  console.log(locationFromProps.state);
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, , AnimalDropdown] = useDropdown("Animal", "", ANIMALS);
  const [pets, setPets] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breedList);
  const [loading, setLoading] = useState(false);
  const [theme] = useContext(ThemeContext);

  async function requestPets() {
    await pet
      .animals({
        location,
        type: animal,
        breed,
      })
      .then((response) => {
        const { animals: animalsResponse } = response;
        animalsResponse.length == 0 ? setPets([]) : setPets(animalsResponse);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }

  useEffect(() => {
    setBreedList([]);
    setBreed("");
    if (animal.length > 0) {
      pet.breeds(animal).then(({ breeds: apiBreeds }) => {
        setBreedList(apiBreeds.map(({ name }) => name));
      }, console.error);
    }
  }, [animal, setBreed, breed]);

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
        <HomeLocation location={location} callback={setLocation} />
        <AnimalDropdown />
        <BreedDropdown />
        <ThemeColor />
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} type={animal} loading={loading} />
    </div>
  );
};

export default SearchParams;
