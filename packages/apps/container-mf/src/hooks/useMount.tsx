import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate() {},
    });

    // history.listen(onParentNavigate);

    return () => {
      ref.current = null;
      unmount();
    };
  }, []);

  return ref;
}
