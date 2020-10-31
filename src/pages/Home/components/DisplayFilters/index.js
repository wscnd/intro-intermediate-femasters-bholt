import pet, { ANIMALS } from "@frontendmasters/pet";
import React, { useContext, useEffect, useState } from "react";
import SearchBox from "~/components/SearchBox";
import StateContext from "~/context/StateContext";
import useDropdown from "~/hooks/useDropdown";
import Location from "./Location";
import ThemeDropdown from "./ThemeDropdown";

export default function DisplayFilters() {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, , HomeAnimalDropdown] = useDropdown("Animal", "", ANIMALS);
  const [breedList, setBreedList] = useState([]);
  const [breed, setBreed, HomeBreedDropdown] = useDropdown(
    "Breed",
    "",
    breedList
  );

  const {
    states: {
      setters: { setPets, setLoading },
    },
  } = useContext(StateContext);

  useEffect(() => {
    setBreedList([]);
    setBreed("");

    if (animal.length > 0) {
      getBreedsFromAnimal(animal).then(
        (breeds) => setBreedList(breeds),
        console.error
      );
    }
  }, [animal, setBreed]);

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
        }, 500);
      })
      .catch((err) => {
        setPets([]);
        setLoading(false);
        console.error(err);
      });
  }

  return (
    <SearchBox
      className={"search-params"}
      action=""
      buttonName={"Submit"}
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        requestPets();
      }}
    >
      <Location location={location} callback={setLocation} />
      <HomeAnimalDropdown />
      <HomeBreedDropdown />
      <ThemeDropdown />
    </SearchBox>
  );
}

function getBreedsFromAnimal(animal) {
  return new Promise((resolve) => {
    pet
      .breeds(animal)
      .then(({ breeds }) => breeds.map(({ name }) => name))
      .then((breedList) => resolve(breedList))
      .catch((err) => console.log(err));
  });
}
