import React, { ComponentType, SVGProps } from "react";

import { ActionKeys } from "@/preferences";

import overflowMenuStyles from "../assets/styles/overflowMenu.module.css";

import { MenuItem, Text } from "react-aria-components";
import { Shortcut, ShortcutRepresentation } from "../Shortcut";

export interface IOverflowMenuItemProp {
  label: string;
  SVG: ComponentType<SVGProps<SVGElement>>;
  shortcut?: string;
  shortcutRepresentation?: ShortcutRepresentation;
  onActionCallback?: () => void;
  id: ActionKeys;
}

export const OverflowMenuItem: React.FC<IOverflowMenuItemProp> = ({
  label,
  SVG, 
  shortcut,
  shortcutRepresentation,
  onActionCallback, 
  id
}) => {
  const menuItemLabelId = `${id}-label`;
  
  return(
    <>
    <MenuItem 
      id={ id } 
      className={ overflowMenuStyles.menuItem } 
      aria-labelledby={ menuItemLabelId } 
      onAction={ onActionCallback }
    >
      <SVG aria-hidden="true" focusable="false" />
      <Text 
        className={ overflowMenuStyles.menuItemLabel } 
        slot="label"
        id={ menuItemLabelId }
      >
        { label }
      </Text>
      { shortcut && <Shortcut
        className={ overflowMenuStyles.menuItemKbdShortcut } 
        rawForm={ shortcut } 
        representation={ shortcutRepresentation } 
        joinChar="+"
      /> }
    </MenuItem>
    </>
  )
}