import { mount } from "settings/App";
import { useMount } from "../hooks/useMount";

export default function Settings() {
  const ref = useMount(mount);
  return <div id="settings-root" ref={ref} />;
}
