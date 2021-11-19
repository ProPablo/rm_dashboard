import { useEffect, useState } from "react";
import { v2 } from "../../../shared/types";

export function useMouseMove() {
  const [mouse, setMouse] = useState<v2>({ x: 0, y: 0 });
  function onMouseEvent(e: MouseEvent) {
    setMouse({ x: e.clientX, y: e.clientY });
  }
  useEffect(() => {
    document.addEventListener('mousemove', onMouseEvent);
    return () => {
      document.removeEventListener('mousemove', onMouseEvent);
    }
  })
  return mouse;
}