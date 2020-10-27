import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";

const SearchParams = ({ location: locationFromProps }) => {
  console.log(locationFromProps.state);
  const [location, setLocation] = useState("Seattle, WA");
  const [breedList, setBreedList] = useState([]);
  const [animal, , AnimalDropdown] = useDropdown("Animal", "", ANIMALS);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breedList);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

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
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="">Colors</option>
            <option value="peru">Peru</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="darkblue">darkblue</option>
            <option value="chartreuse">Charreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} type={animal} loading={loading} />
    </div>
  );
};

export default SearchParams;
