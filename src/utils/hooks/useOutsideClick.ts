import React from "react";

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement> | null | undefined,
  clickOutSideAction: () => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref?.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        clickOutSideAction();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, clickOutSideAction]);
}
