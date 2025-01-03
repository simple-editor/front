import styled from "@emotion/styled";
import { useState } from "react";
import ArrowDownSvg from "@/assets/icons/arrow-down.svg?react";
import { CSSObject, SerializedStyles } from "@emotion/react";

interface IDropDownData {
  title: string;
  value: string | number;
}

interface IDropDownProps extends IStyles {
  data: IDropDownData[];
  selected: IDropDownData;
  onClick: (item: IDropDownData) => void;
}

interface IStyles {
  customStyles?: SerializedStyles | CSSObject;
}

const DropDown = ({
  data,
  selected,
  onClick,
  customStyles,
}: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const filter = data.filter((item) => item.title !== selected.title);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer customStyles={customStyles}>
      <DropdownButton onClick={toggleDropdown}>
        {selected.title} <ArrowIcon />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu onClick={toggleDropdown}>
          {filter.map((item, index) => (
            <DropdownItem key={index} onClick={() => onClick(item)}>
              {item.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropDown;
const DropdownContainer = styled.div<IStyles>`
  position: relative;
  display: inline-block;
  width: 140px;
  ${(props) => props.customStyles}
`;

const DropdownButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 16px;
  border: none;
  cursor: pointer;
  height: 30px;
  border-radius: 100px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.gray30};
  text-align: left;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;
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
  width: 100%;
  height: 30px;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ArrowIcon = styled(ArrowDownSvg)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
`;
