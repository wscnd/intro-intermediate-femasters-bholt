import React from "react";

import { render, cleanup } from "@testing-library/react";
// import pet, { ANIMALS, _dogs, _breeds } from "@frontendmasters/pet";
import pet, { ANIMALS } from "@frontendmasters/pet";
import { Home } from "~/pages";

afterEach(cleanup);
const { getByTestId } = render(<Home />);

test("animals dropdown", async () => {
  const animalDropdown = getByTestId("use-dropdown-animal");
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1);

  const breedDropdown = getByTestId("use-dropdown-breed");
  expect(breedDropdown.children.length).toEqual(1);

  const themeDropdown = getByTestId("use-dropdown-theme");
  expect(themeDropdown.children.length).toEqual(5);
});
