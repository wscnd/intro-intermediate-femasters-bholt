import pet, { ANIMALS } from "@frontendmasters/pet";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchBox from "~/components/SearchBox";
import StateContext from "~/context/StateContext";
import useDropdown from "~/hooks/useDropdown";
import changeLocation from "~/redux/actionCreators/changeLocation";
import changeTheme from "~/redux/actionCreators/changeTheme";
import Location from "./Location";
import ThemeDropdown from "./ThemeDropdown";

function DisplayFilters({ locationFind, setLocation, theme, setTheme }) {
  const [animal, , HomeAnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
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
        location: location,
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
      theme={theme}
      buttonName={"Submit"}
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        requestPets();
      }}
    >
      <Location location={locationFind} callback={setLocation} />
      <HomeAnimalDropdown />
      <HomeBreedDropdown />
      <ThemeDropdown theme={theme} setTheme={setTheme} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (theme) => dispatch(changeTheme(theme)),
    setLocation: (locationFind) => dispatch(changeLocation(locationFind)),
  };
};

const mapStateToProps = ({ theme, locationFind }) => ({
  theme,
  locationFind,
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFilters);
// export default DisplayFilters;
