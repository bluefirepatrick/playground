import React, { ComponentType, SVGProps } from "react";

import readerSharedUI from "./assets/styles/readerSharedUI.module.css";

import { Button, Tooltip, TooltipTrigger, TooltipProps, PressEvent } from "react-aria-components";

export interface IActionIconProps {
  className: string;
  ariaLabel: string;
  SVG: ComponentType<SVGProps<SVGElement>>;
  placement: TooltipProps["placement"];
  tooltipLabel: string;
  onPressCallback?: (e: PressEvent) => void;
}

export const ActionIcon = ({
  className,
  ariaLabel, 
  SVG,
  placement,
  tooltipLabel,
  onPressCallback
}: IActionIconProps) => {

  return (
    <>
    <TooltipTrigger>
      <Button 
        className={ className } 
        aria-label={ ariaLabel } 
        { ...(onPressCallback ? { onPress: onPressCallback } : {}) }
      >
        <SVG aria-hidden="true" focusable="false" />
      </Button>
      <Tooltip
        className={ readerSharedUI.tooltip }
        placement={ placement }
      >
        { tooltipLabel }
      </Tooltip>
    </TooltipTrigger>
    </>
  )
};