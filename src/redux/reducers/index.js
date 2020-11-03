import { combineReducers } from "redux";
import locationFind from "~/redux/reducers/locationFind";
import theme from "~/redux/reducers/theme";

export default combineReducers({
  locationFind,
  theme,
});
