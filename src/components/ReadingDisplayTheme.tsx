import React, { CSSProperties, useRef } from "react";

import { RSPrefs, Themes } from "@/preferences";
import Locale from "../resources/locales/en.json";
import settingsStyles from "./assets/styles/readerSettings.module.css";

import CheckIcon from "./assets/icons/check.svg";

import { Label, Radio, RadioGroup } from "react-aria-components";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTheme } from "@/lib/themeReducer";

import classNames from "classnames";

export const ReadingDisplayTheme = () => {
  const theme = useAppSelector(state => state.theming.theme);
  const isFXL = useAppSelector(state => state.publication.isFXL);

  const themeItems = useRef(isFXL ? RSPrefs.theming.themes.fxlOrder : RSPrefs.theming.themes.reflowOrder);

  const dispatch = useAppDispatch();

  const handleTheme = (value: string) => {
    dispatch(setTheme(value));
  };

  // Yeah so it’s easier to inline styles from preferences for these
  // than spamming the entire app with all custom properties right now
  const doStyles = (t: Themes) => {
    let cssProps: CSSProperties = {
      border: `1px solid ${ RSPrefs.theming.semantic.subdued }`,
      boxSizing: "border-box",
      color: "#999999"
    };

    if (t === Themes.auto) {
      cssProps.background = `linear-gradient(to right bottom, ${ RSPrefs.theming.themes[Themes.light].background } 50%, ${ RSPrefs.theming.themes[Themes.dark].background } 50.3%)`;
      // This has to be white so that mix-blend-mode can work (doesn’t in black)
      cssProps.color = "#ffffff"
    } else {
      cssProps.background = RSPrefs.theming.themes[t].background;
      cssProps.color = RSPrefs.theming.themes[t].text;
    };
    
    return cssProps;
  };

  return (
    <>
    <div>
      <RadioGroup 
        orientation="horizontal" 
        value={ theme }
        onChange={ handleTheme }
      >
        <Label className={ settingsStyles.readerSettingsLabel }>{ Locale.reader.settings.themes.title }</Label>
        <div className={ classNames(settingsStyles.readerSettingsRadioWrapper, settingsStyles.readerSettingsThemesWrapper) }>
          { themeItems.current.map(( t ) => 
            <Radio
              className={ classNames(
                settingsStyles.readerSettingsRadio, 
                settingsStyles.readerSettingsThemeRadio
              ) }
              value={ t }
              id={ t }
              key={ t }
              style={ doStyles(t) }
            >
            <span style={ t === Themes.auto ? { mixBlendMode: "difference" } : {}}>{ Locale.reader.settings.themes[t as keyof typeof Themes] } { t === theme ? <CheckIcon aria-hidden="true" focusable="false" /> : <></>}</span>
            </Radio>
          ) }
        </div>
      </RadioGroup>
    </div>
    </>
  )
}