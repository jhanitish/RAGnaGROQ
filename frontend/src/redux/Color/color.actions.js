import { SKIN_COLOR, SWITCHER_COLOR } from './color.types';

export const onSkinPop = (val) => {
    return {
        type: SKIN_COLOR,
        payload: val
    };

};

export const onColorPop = (val) => {
    return {
        type: SWITCHER_COLOR,
        payload: val
    };
};