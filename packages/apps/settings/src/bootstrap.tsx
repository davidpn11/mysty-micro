import ReactDOM from "react-dom/client";
import { Advanced, SettingsHome } from "./components/App";
import {
  RouterProvider,
  createMemoryRouter,
  createBrowserRouter,
} from "react-router-dom";
import { Standalone } from "shared/Components";

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

  // router.subscribe((location: any) => {
  //   console.log({
  //     newRouter: location,
  //     loc: location.location.pathname,
  //     initialPath: params.initialPath,
  //   });
  // params.onNavigate &&
  //   params.onNavigate({
  //     pathname: location.location.pathname,
  //   });
  // });

  const App = params.isStandAlone ? (
    <Standalone>
      <RouterProvider router={router} />
    </Standalone>
  ) : (
    <RouterProvider router={router} />
  );

  root.render(App);

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
