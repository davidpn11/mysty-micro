import { Wrapper } from "../../styles";
import { createGlobalStyle } from "styled-components";
import { Item, PageHeader, Sidebar } from "shared/Components";
import { useMemo, useState } from "react";

console.log(PageHeader);
const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    cursor: pointer;
  }
`;

const itemList = [{ name: "Dashboard" }, { name: "Settings" }];

export function App() {
  const [selectedRoute, onSelectRoute] = useState("Dashboard");

  const onItemClick = (itemName: string) => () => {
    onSelectRoute(itemName);
  };

  const items: Item[] = useMemo(() => {
    return itemList.map((item) => ({
      name: item.name,
      onClick: onItemClick(item.name),
      selected: item.name === selectedRoute,
    }));
  }, [selectedRoute]);

  return (
    <Wrapper>
      <GlobalStylesheet />
      <PageHeader>
        <h3>Container MF app!</h3>
      </PageHeader>
      <Sidebar items={items} />
    </Wrapper>
  );
}
