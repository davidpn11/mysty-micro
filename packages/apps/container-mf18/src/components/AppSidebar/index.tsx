import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Item, Sidebar } from "shared/Components";

const itemList = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (path: string) => () => {
    navigate(path);
  };

  const items: Item[] = useMemo(() => {
    return itemList.map((item) => {
      // console.log({ itemPath: item.path, location: location.pathname });

      return {
        name: item.name,
        path: item.path,
        onClick: onClick(item.path),
        selected:
          item.path === "/"
            ? item.path === location.pathname
            : location.pathname.includes(item.path),
      };
    });
  }, [location.pathname]);

  return <Sidebar items={items} />;
}
