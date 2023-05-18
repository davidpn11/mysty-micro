import { mount } from "dashboard/App";
// import { useMount } from '../../../hooks/useMount';
// import { ModuleWrapper } from '../styles';

import { useMount } from "../hooks/useMount";

export default function Dashboard() {
  const ref = useMount(mount);
  // console.log(ref);
  return <div id="dashboard-root" ref={ref} />;
}
