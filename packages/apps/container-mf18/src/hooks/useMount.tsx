import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

let onParentNavigateLocal: ((location: unknown) => void) | null = null;

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("PATHNAME", location.pathname);

  useEffect(() => {
    const { unmount, onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate({ pathname: nextPathname }) {
        console.log("CONTAINER18-onNavigate", {
          container18NextPath: nextPathname,
          container18Location: location.pathname,
        });
        if (location.pathname !== nextPathname) {
          console.log(
            "CONTAINER18-onNavigate - pushing history - ",
            nextPathname
          );
          navigate(nextPathname);
        }
      },
    });
    onParentNavigateLocal = onParentNavigate;

    return () => {
      console.log("CONTAINER18 - trying to unmount", ref.current);
      ref.current = null;
      unmount();
    };
  }, []);

  useEffect(() => {
    // console.log("listener - useMount (Parent)", location);
    onParentNavigateLocal && onParentNavigateLocal(location);
  }, [location.pathname]);

  return ref;
}
