import styled from "@emotion/styled";
interface IProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

const RoundedButton = ({ icon, onClick }: IProps) => {
  return <Wrapper onClick={onClick}>{icon}</Wrapper>;
};

export default RoundedButton;

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray30};
  cursor: pointer;
  font-size: 1.5rem; /* 아이콘 크기 조정 */
  color: ${({ theme }) => theme.colors.gray100};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray10};
  }
`;
