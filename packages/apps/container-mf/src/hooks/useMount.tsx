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
          container17NextPath: nextPathname,
          container17Location: history.location.pathname,
        });
        if (history.location.pathname !== nextPathname) {
          console.log("pushing history - ", nextPathname);
          history.push(nextPathname);
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
