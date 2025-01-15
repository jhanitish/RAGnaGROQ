import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import {COLOR_CONTENTS, COLOR_DROPS, SKIN_THEME} from '../../utils/CONSTANTS';
import {
    onColorPop, onSkinPop
} from '../../redux/Color/color.actions';
import { ColorDrops } from '../Icons';
import { Settings } from 'lucide-react';


const StyleSwitcher = ({onColorPop=() => {},  onSkinPop=() => {}}) => {
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState('dark');
    const checkedFn = (val) => {
        setChecked(val);
        onSkinPop(SKIN_THEME[val]);
        setShow(false);
    };

    return(
        <>
            {
                !show ? (
                    <div id="showSwitcher" onClick={() => setShow(true)} className="styleSecondColor" style={{marginRight: '0px'}}>
                        { <Settings /> }
                    </div>

                ) : (
                    <div id="switcher">
                        <div className="content-switcher">
                            <h4>{COLOR_CONTENTS.colorSwitcher}</h4>
                            <ul> 
                                {
                                    Object.keys(COLOR_DROPS).map((color, index) =>
                                        <li key={color+index}>
                                            <a href="#" onClick={() => onColorPop(color)} title={color} className="color">
                                                <ColorDrops color={COLOR_DROPS[color]} />
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                            <hr />
                            <h4>{COLOR_CONTENTS.bodySkin}</h4>

                            {
                                Object.keys(SKIN_THEME).map((theme, index) =>
                                    <label key={theme+index}>
                                        <input className='dark_switch' type="radio" name="color_style"
                                            id={`is_${theme}`} value={theme} checked = {checked === theme}
                                            onChange = {() => checkedFn(theme)}
                                        /> 
                                        <span>{theme}</span>
                                    </label>
                                )
                            }

                            <div id="hideSwitcher" onClick={() => setShow(false)}>×</div>
                        </div>
                    </div>
                )
            }
        </>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        onColorPop: (val) => dispatch(onColorPop(val)),
        onSkinPop: (val) => dispatch(onSkinPop(val)),
    };
};
  


export default connect(null, mapDispatchToProps)(StyleSwitcher);