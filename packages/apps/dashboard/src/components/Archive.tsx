import { useHistory } from "react-router-dom";
import { Button } from "shared/Components";

export function Archive() {
  const history = useHistory();
  return (
    <div>
      This is the archive page
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
