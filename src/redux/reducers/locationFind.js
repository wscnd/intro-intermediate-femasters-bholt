export default function locationFind(state = "Seatle, WA", action) {
  if (action.type === "CHANGE_LOCATION") {
    return action.payload;
  } else {
    return state;
  }
}
