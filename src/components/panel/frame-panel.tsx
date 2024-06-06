import styled from "@emotion/styled";

interface ISelectedProps {
  selected: boolean;
}

const FramePanel = () => {
  return (
    <Panel>
      {frames.map((frame, index) => (
        <Frame key={index} selected={frame.selected}>
          <FrameName>{frame.name}</FrameName>
          <FrameContent>{frame.content}</FrameContent>
        </Frame>
      ))}
    </Panel>
  );
};

export default FramePanel;
const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
`;

const Frame = styled.div<ISelectedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 120px;
  border: 2px solid ${(props) => (props.selected ? "#00c3ff" : "#ddd")};
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    border-color: #00c3ff;
  }
`;

const FrameName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;

const FrameContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  color: #999;
`;

const frames = [
  { name: "없음", content: "", selected: true },
  { name: "프레임명", content: "sample", selected: false },
  { name: "프레임명", content: "sample", selected: false },
  { name: "프레임명", content: "sample", selected: false },
  { name: "프레임명", content: "sample", selected: false },
  { name: "프레임명", content: "sample", selected: false },
];
