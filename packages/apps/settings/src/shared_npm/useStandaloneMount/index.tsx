import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useStandaloneMount(mount: MountFn) {
  const ref = useRef(null);

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      initialPath: "/",
      onNavigate() {},
    });

    return () => {
      ref.current = null;
      unmount();
    };
  }, []);

  return ref;
}
