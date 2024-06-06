import styled from "@emotion/styled";
import SidebarItem from "../shared/toolbar-item";

const Toolbar = () => {
  return (
    <Wrapper>
      {list.map((item) => (
        <SidebarItem
          title={item.title}
          key={item.title}
          icon={item.icon}
        ></SidebarItem>
      ))}
    </Wrapper>
  );
};

export default Toolbar;

const Wrapper = styled.nav`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const list = [
  {
    title: "그리기",
    icon: "/icons/sidebar-pencil.svg",
  },
  {
    title: "텍스트",
    icon: "/icons/sidebar-text.svg",
  },
  {
    title: "이모지",
    icon: "/icons/sidebar-smail.svg",
  },
  {
    title: "프레임",
    icon: "/icons/sidebar-maximise.svg",
  },
  {
    title: "필터",
    icon: "/icons/sidebar-filter.svg",
  },
  {
    title: "자르기",
    icon: "/icons/sidebar-crop.svg",
  },
];
