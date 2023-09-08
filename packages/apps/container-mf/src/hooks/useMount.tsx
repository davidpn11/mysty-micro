import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { unmount, onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate({ pathname: nextPathname }) {
        console.log({
          container: nextPathname,
          containerLocation: history.location.pathname,
        });
        if (history.location.pathname !== nextPathname) {
          history.push(nextPathname);
          console.log("container history");
        }
      },
    });

    onParentNavigate && history.listen(onParentNavigate);

    return () => {
      ref.current = null;
      unmount();
    };
  }, []);

  return ref;
}
