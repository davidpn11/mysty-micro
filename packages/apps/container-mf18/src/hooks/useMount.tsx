import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

let onParentNavigateLocal: ReturnType<MountFn>['onParentNavigate'] | undefined;

const log = (msg: string, data: unknown, shade = 0) => {
  const background = 255 - shade;
  const color = background >= 127 ? '#000' : '#fff';
  return console.log(
    `%c${msg}`,
    `background: #00${background.toString(16)}00;color:${color}`,
    data
  );
};

/**
 * IMPORTANT
 * -----------
 * Make an external reference to the pathname so it can be referenced inside the callback.
 * This is to avoid needing the value added to dependency arrays, which introduce other bugs.
 */
let currentPathname = '';

export function useMount(mount: MountFn) {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  log(`PATHNAME`, location.pathname);

  /**
   * IMPORTANT
   * -----------
   * Update the variable outside React with the latest value.
   */
  useEffect(() => {
    currentPathname = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    log('CONTAINER18 - ref', ref.current);
    const { unmount, onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        log(
          'CONTAINER18-onNavigate',
          {
            container18NextPath: nextPathname,
            container18Location: currentPathname,
          },
          100
        );
        if (currentPathname !== nextPathname) {
          log('CONTAINER18-onNavigate - pushing history - ', nextPathname, 150);
          navigate(nextPathname);
        }
      },
    });
    onParentNavigateLocal = onParentNavigate;

    return () => {
      log('CONTAINER18 - trying to unmount', ref.current, 50);
      ref.current = null;
      unmount();
    };
  }, []);

  useEffect(() => {
    // console.log("listener - useMount (Parent)", location);
    onParentNavigateLocal?.(location);
  }, [location.pathname]);

  return ref;
}
