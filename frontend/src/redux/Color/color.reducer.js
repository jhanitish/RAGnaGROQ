/* eslint-disable indent */
import { SKIN_COLOR, SWITCHER_COLOR } from './color.types';
import { SKIN_THEME, COLOR_DROPS } from '../../utils/CONSTANTS';

const INITIAL_STATE = {
  skinColor: SKIN_THEME.dark,
  switcherColor: COLOR_DROPS.blue
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SKIN_COLOR:
      return {
        ...state, skinColor: action.payload,
      };
    case SWITCHER_COLOR:
      return {
        ...state, switcherColor: action.payload,
      };
    default: return state;
  }
};

export default reducer;