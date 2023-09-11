import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { unmount, onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate({ pathname: nextPathname }) {
        console.log("CONTAINER17-onNavigate", {
          container17NextPath: nextPathname,
          container17Location: history.location.pathname,
        });
        if (history.location.pathname !== nextPathname) {
          console.log(
            "CONTAINER17-onNavigate - pushing history - ",
            nextPathname
          );
          history.push(nextPathname);
        }
      },
    });
    const listener = (location: unknown) => {
      console.log(
        "CONTAINER17-onNavigate - onParentNavigateListener",
        location
      );
      onParentNavigate && onParentNavigate(location);
    };
    history.listen(listener);

    return () => {
      ref.current = null;
      unmount();
    };
  }, []);

  return ref;
}
