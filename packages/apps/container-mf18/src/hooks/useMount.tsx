import { useEffect, useRef } from "react";

export function useMount(mount: MountFn) {
  const ref = useRef(null);

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      initialPath: "",
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
