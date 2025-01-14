import styled from "@emotion/styled";
import PencilSvg from "@/assets/icons/sidebar-pencil.svg?react";
import TextSvg from "@/assets/icons/sidebar-text.svg?react";
import SmailSvg from "@/assets/icons/sidebar-smail.svg?react";
import CropSvg from "@/assets/icons/sidebar-crop.svg?react";
import FilterSvg from "@/assets/icons/color-swatch.svg?react";
import ToolbarItem from "@/shared/ui/toolbar-item";

const Toolbar = () => {
  return (
    <>
      <Wrapper>
        {list.map((item) => (
          <ToolbarItem title={item.title} key={item.title} icon={item.icon} />
        ))}
      </Wrapper>
    </>
  );
};

export default Toolbar;

const Wrapper = styled.nav``;

const list = [
  {
    title: "그리기",
    icon: <PencilSvg width={15} height={15} />,
  },
  {
    title: "텍스트",
    icon: <TextSvg width={15} height={15} />,
  },
  {
    title: "이모지",
    icon: <SmailSvg width={15} height={15} />,
  },
  {
    title: "자르기",
    icon: <CropSvg width={15} height={15} />,
  },
  {
    title: "필터",
    icon: <FilterSvg width={15} height={15} />,
  },
];
