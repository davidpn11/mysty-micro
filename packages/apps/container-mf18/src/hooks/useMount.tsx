import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  let onParentNavigateLocal: ((location: unknown) => void) | null = null;

  useEffect(() => {
    const { unmount, onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate({ pathname: nextPathname }) {
        console.log({
          container18NextPath: nextPathname,
          container18Location: location.pathname,
        });
        if (location.pathname !== nextPathname) {
          console.log("pushing history - ", nextPathname);
          navigate(nextPathname);
        }
      },
    });
    onParentNavigateLocal = onParentNavigate;

    return () => {
      console.log("trying to unmount", ref.current);
      ref.current = null;
      unmount();
    };
  }, []);

  useEffect(() => {
    console.log("Calling on navigate");
    onParentNavigateLocal && onParentNavigateLocal(location);
  }, [location.pathname]);

  return ref;
}
