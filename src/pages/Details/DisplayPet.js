import React from "react";
import Carousel from "~/pages/Details/components/Carousel";
import DetailsContainer from "~/components/DetailsContainer";

export default function DisplayPet({ children, ...state }) {
  const {
    state: { media, animal, breed, location, description },
  } = state;

  return (
    <DetailsContainer>
      <Carousel mediaData={media} />
      <div>
        <h1>{name}</h1>
        <h1>{`${animal}, ${breed}, ${location}`}</h1>
        {children}
        <p>{description}</p>
      </div>
    </DetailsContainer>
  );
}
