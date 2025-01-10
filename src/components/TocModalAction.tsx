import React from "react";

import { RSPrefs } from "@/preferences";

import Locale from "../resources/locales/en.json";
import readerSharedUI from "./assets/styles/readerSharedUI.module.css";
import tocModalStyles from "./assets/styles/tocModal.module.css";

import TocIcon from "./assets/icons/toc.svg";
import CloseIcon from "./assets/icons/close.svg";

import { Link, Links } from "@readium/shared";
import { useEpubNavigator } from "@/hooks/useEpubNavigator";
import { TocItem } from "@/helpers/toc/createTocTree";

import { ActionIcon } from "./Templates/ActionIcon";
import {
  Button,
  Collection,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
} from "react-aria-components";
import {
  UNSTABLE_Tree as Tree,
  UNSTABLE_TreeItem as TreeItem,
  UNSTABLE_TreeItemContent as TreeItemContent,
} from "react-aria-components";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTocOpen } from "@/lib/readerReducer";
import { OverflowMenuItem } from "./Templates/OverflowMenuItem";
import {
  ActionComponentVariant,
  ActionKeys,
  IActionComponent,
} from "./Templates/ActionComponent";

export const TocModalAction: React.FC<IActionComponent> = ({ variant }) => {
  const isOpen = useAppSelector((state) => state.reader.tocOpen);
  const dispatch = useAppDispatch();

  const setOpen = (value: boolean) => {
    dispatch(setTocOpen(value));
  };

    const { goLink,} = useEpubNavigator();

  const handleClick = (tocItem: TocItem) => {
    const link: Link = new Link({ href: tocItem.href });
    console.log("PK link", link);
    goLink(link, true, () => {});
  };

  const tocTree = useAppSelector((state) => state.publication.tocTree);

  if (variant && variant === ActionComponentVariant.menu) {
    return (
      <>
        <OverflowMenuItem
          label={Locale.reader.toc.trigger}
          SVG={TocIcon}
          shortcut={RSPrefs.actions.toc.shortcut}
          id={ActionKeys.toc}
        />
      </>
    );
  } else {
    return (
      <>
        <DialogTrigger>
          <ActionIcon
            visibility={RSPrefs.actions[ActionKeys.toc].visibility}
            ariaLabel={Locale.reader.toc.trigger}
            SVG={TocIcon}
            placement="bottom"
            tooltipLabel={Locale.reader.toc.tooltip}
            onPressCallback={() => setOpen(true)}
          />
          {tocTree && (
            <Modal
              className={tocModalStyles.tocModal}
              isOpen={isOpen}
              onOpenChange={setOpen}
            >
              <Dialog role="dialog" className={tocModalStyles.tocDialog}>
                <>
                  <div className={tocModalStyles.tocDialogOverlay}>
                    <div className={tocModalStyles.tocDialogContent}>
                      <Heading
                        slot="title"
                        className={readerSharedUI.popoverHeading}
                      >
                        {Locale.reader.toc.heading}
                      </Heading>
                      {tocTree.length > 0 ? (
                        <Tree
                          aria-label="Files"
                          selectionMode="multiple"
                          items={tocTree}
                          className={tocModalStyles.reactAriaTree}
                        >
                          {function renderItem(item) {
                            return (
                              <TreeItem textValue={item.title || ""}>
                                <TreeItemContent>
                                  {item.children ? (
                                    <Button slot="chevron">
                                      <svg viewBox="0 0 24 24">
                                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                      </svg>
                                    </Button>
                                  ) : null}
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleClick(item)}
                                  >
                                    {item.title}
                                  </div>
                                </TreeItemContent>
                                <Collection items={item.children}>
                                  {renderItem}
                                </Collection>
                              </TreeItem>
                            );
                          }}
                        </Tree>
                      ) : (
                        <div className={tocModalStyles.empty}>
                          {Locale.reader.toc.empty}
                        </div>
                      )}
                      <div className={tocModalStyles.tocDialogButtons}>
                        <button
                          className={tocModalStyles.tocDialogButton}
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              </Dialog>
            </Modal>
          )}
        </DialogTrigger>
      </>
    );
  }
};
