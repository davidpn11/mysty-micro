import styled, { css } from "styled-components";

const Wrapper = styled.aside`
  max-width: 300px;
  border-right: 1px solid lightblue;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const ItemWrapper = styled.span<{ selected?: boolean }>`
  padding: 12px 18px;
  border-bottom: 1px solid lightgray;
  display: flex;
  max-height: 50px;
  min-width: 200px;
  flex: 1;
  cursor: pointer;
  ${(props) =>
    props.selected
      ? css`
          color: whitesmoke;
          background: darkblue;
        `
      : css`
          background: whitesmoke;
          color: darkblue;
        `};
  &:hover {
    background-color: lightblue;
  }
`;

export type Item = {
  name: string;
  onClick: (name: string) => void;
  selected?: boolean;
};

type SidebarProps = {
  items: Item[];
};
export function Sidebar({ items }: SidebarProps) {
  return (
    <Wrapper>
      {items.map((item) => (
        <SidebarItem key={item.name} item={item} />
      ))}
    </Wrapper>
  );
}

type SideBarItemProps = {
  item: Item;
};

export function SidebarItem({ item }: SideBarItemProps) {
  const onClick = () => {
    item.onClick(item.name);
  };
  return (
    <ItemWrapper selected={item.selected} onClick={onClick}>
      {item.name}
    </ItemWrapper>
  );
}
