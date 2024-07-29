import styled from "@emotion/styled";
import PencilSvg from "@/assets/icons/sidebar-pencil.svg?react";
import TextSvg from "@/assets/icons/sidebar-text.svg?react";
import SmailSvg from "@/assets/icons/sidebar-smail.svg?react";
import CropSvg from "@/assets/icons/sidebar-crop.svg?react";
import ToolbarItem from "@/shared/ui/toolbar-item";

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
    icon: <PencilSvg />,
  },
  {
    title: "텍스트",
    icon: <TextSvg />,
  },
  {
    title: "이모지",
    icon: <SmailSvg />,
  },
  {
    title: "자르기",
    icon: <CropSvg />,
  },
  {
    title: "필터",
    icon: <CropSvg />,
  },
];
