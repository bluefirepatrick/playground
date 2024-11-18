import { ShortcutMetaKeywords } from "./helpers/keyboard/getMetaKeys";

export enum ScrollAffordancePref {
  none = "none",
  prev = "previous",
  next = "next",
  both = "both"
}

export enum ScrollBackTo {
  top = "top",
  bottom = "bottom",
  untouched = "untouched"
}

export enum ActionKeys {
  fullscreen = "fullscreen",
  jumpToPosition = "jumpToPosition",
  settings = "settings",
  toc = "toc"
}

export enum ActionVisibility {
  always = "always",
  partially = "partially",
  overflow = "overflow"
}

export const RSPrefs = {
  breakpoint: 1024, // width in pixels
  typography: {
    minimalLineLength: 35, // number of characters. If 2 cols will switch to 1 based on this
    optimalLineLength: 75, // number of characters. If auto layout, picks colCount based on this
    pageGutter: 20 // body padding in px
  },
  scroll: {
    topAffordance: ScrollAffordancePref.none,
    bottomAffordance: ScrollAffordancePref.both,
    backTo: ScrollBackTo.top
  },
  theming: {
    arrow: {
      size: 40, // Size of the left and right arrows in px
      offset: 5 // offset of the arrows from the edges in px
    },
    color: {
      primary: "#4d4d4d",
      secondary: "white",
      disabled: "#767676",
      subdued: "#999999"
    },
    icon: {
      size: 32, // Size of icons in px
    }
  },
  actions: {
    displayOrder: [
      ActionKeys.settings,
      ActionKeys.fullscreen,
      ActionKeys.toc,
      ActionKeys.jumpToPosition
    ],
    [ActionKeys.settings]: {
      visibility: ActionVisibility.partially,
      collapsible: false,
      shortcut: `${ShortcutMetaKeywords.platform}+P`
    },
    [ActionKeys.fullscreen]: {
      visibility: ActionVisibility.partially,
      collapsible: true,
      shortcut: `${ShortcutMetaKeywords.platform}+F11`
    },
    [ActionKeys.toc]: {
      visibility: ActionVisibility.partially,
      collapsible: true,
      shortcut: `${ShortcutMetaKeywords.platform}+N`
    },
    [ActionKeys.jumpToPosition]: {
      visibility: ActionVisibility.overflow,
      collapsible: false,
      shortcut: `${ShortcutMetaKeywords.platform}+J`
    }
  }
}