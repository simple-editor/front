import styled from "@emotion/styled";
import { useState } from "react";
import ArrowDownSvg from "@/assets/icons/arrow-down.svg?react";
interface IDropDownProps {
  data: string[];
  selected: string;
  onClick: (item: string) => void;
}

const DropDown = ({ data, selected, onClick }: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filter = data.filter((item) => item !== selected);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selected} <ArrowIcon />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu onClick={toggleDropdown}>
          {filter.map((item, index) => (
            <DropdownItem key={index} onClick={() => onClick(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropDown;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 140px;
`;

const DropdownButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 16px;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 100px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.gray30};
  text-align: left;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 100%; /* 아이템이 위로 향하게 설정 */
  left: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 14px;
  text-align: left;
  border-radius: 7px;
`;

const DropdownItem = styled.div`
  width: 140px;
  height: 40px;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ArrowIcon = styled(ArrowDownSvg)`
  position: absolute;
  right: 0;
  right: 16px;
`;
