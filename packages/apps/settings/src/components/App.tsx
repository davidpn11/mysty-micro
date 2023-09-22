import { ReactElement } from "react";
import {
  useNavigate,
  RouterProvider,
  createMemoryRouter,
  RouteObject,
  RouterProps,
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
      <div>Federated Settings app here! (React 18) -- RELOAD</div>
      <span>
        <Button onClick={() => navigate("/advanced")}>Advanced</Button>
      </span>
    </div>
  );
}
