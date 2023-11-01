import ReactDOM from "react-dom/client";
import { Advanced, SettingsHome } from "./components/App";
import {
  RouterProvider,
  createMemoryRouter,
  createBrowserRouter,
} from "react-router-dom";

export const mount: MountFn = (el, params) => {
  if (!el) {
    return {
      onParentNavigate() {},
      unmount() {},
    };
  }
  console.log({ initial: params.initialPath });

  const localRoutes = [
    { path: "/", element: <SettingsHome /> },
    { path: "/advanced", element: <Advanced /> },
  ];

  const router = createBrowserRouter([...localRoutes], {
    basename: params.initialPath,
  });
  const root = ReactDOM.createRoot(el);

  root.render(<RouterProvider router={router} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      // Has to find a way to make that work without checking the location
      const routerPath = router.state.location.pathname;
      console.log("onParentNavigate - Settings", {
        parent: nextPathname,
        router: routerPath,
      });
      //   console.log({ onParentNavigate: nextPathname });
      if (routerPath !== nextPathname) {
        // router.navigate(routerPath);
        console.log(
          "Settings - SHOULD NAVIGATE TO",
          router.state.location.pathname
        );
      }
    },
    unmount() {
      if (el) {
        root.unmount();
      }
    },
  };
};
