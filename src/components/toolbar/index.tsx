import styled from "@emotion/styled";
import pencil from "@/assets/icons/sidebar-pencil.svg";
import text from "@/assets/icons/sidebar-text.svg";
import smail from "@/assets/icons/sidebar-smail.svg";
import frame from "@/assets/icons/sidebar-maximise.svg";
import filter from "@/assets/icons/sidebar-filter.svg";
import crop from "@/assets/icons/sidebar-crop.svg";
import ToolbarItem from "@/components/shared/toolbar-item";

const Toolbar = () => {
  return (
    <Wrapper>
      {list.map((item) => (
        <ToolbarItem title={item.title} key={item.title} icon={item.icon} />
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
    icon: pencil,
  },
  {
    title: "텍스트",
    icon: text,
  },
  {
    title: "이모지",
    icon: smail,
  },
  {
    title: "프레임",
    icon: frame,
  },
  {
    title: "필터",
    icon: filter,
  },
  {
    title: "자르기",
    icon: crop,
  },
];
