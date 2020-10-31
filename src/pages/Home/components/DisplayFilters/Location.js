import React from "react";

export default function Location({ location, callback }) {
  return (
    <>
      <label htmlFor="location">
        Location
        <input
          type="text"
          id="location"
          value={location}
          placeholder="Location"
          onChange={(e) => callback(e.target.value)}
        />
      </label>
    </>
  );
}
