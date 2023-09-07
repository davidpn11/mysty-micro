import {
  Router,
  useNavigate,
  RouterProvider,
  createMemoryRouter,
  RouteObject,
} from "react-router-dom";
import { Button } from "shared/Components";

export function Advanced() {
  const navigate = useNavigate();

  return (
    <div>
      This is the advanced settings page!
      <Button onClick={() => navigate("/")}>Go to home</Button>
    </div>
  );
}

export function SettingsHome() {
  const navigate = useNavigate();

  return (
    <div>
      <div>Federated Settings app here! (React 18)</div>
      <span>
        <Button onClick={() => navigate("/advanced")}>Advanced</Button>
      </span>
    </div>
  );
}

type AppProps = {
  routes?: RouteObject[];
  initialEntries?: string[];
  onParentNavigate?: (location: unknown) => void;
};
export function App({ routes }: AppProps) {
  const localRoutes = [
    { path: "/", element: <SettingsHome /> },
    { path: "/advanced", element: <Advanced /> },
  ];

  const router = createMemoryRouter([...localRoutes]);
  router.subscribe((location) => {
    console.log({ newRouter: location });
  });
  return <RouterProvider router={router} />;

  // return (
  //   <div>
  //     Federated Settings app here! (React 18)
  //     <Button onClick={() => history.push("/settings/advanced")}>
  //       Go to archive
  //     </Button>
  //   </div>
  // );
}
