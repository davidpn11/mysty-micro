import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Item, Sidebar } from "shared/Components";

const itemList: Item[] = [
  { name: "Home", path: "/", exactPath: true },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const history = useHistory();
  const location = useLocation();

  const onClick = (path: string) => () => {
    history.push(path);
  };

  const items: Item[] = useMemo(() => {
    console.log(location.pathname);

    return itemList.map((item) => ({
      name: item.name,
      path: item.path,
      onClick: onClick(item.path),
      selected: item.exactPath
        ? item.path === location.pathname
        : location.pathname.includes(item.path),
    }));
  }, [location.pathname]);

  return <Sidebar items={items} />;
}
