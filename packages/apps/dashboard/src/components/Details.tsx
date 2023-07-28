import { useHistory } from "react-router-dom";
import { Button } from "shared/Components";

export function Details() {
  const history = useHistory();
  return (
    <div>
      This is the details page
      <Button
        onClick={() => {
          history.push("/dashboard");
        }}
      >
        Go back
      </Button>
    </div>
  );
}
