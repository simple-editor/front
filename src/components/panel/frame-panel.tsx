import styled from "@emotion/styled";

interface ISelectedProps {
  selected: boolean;
}

const FramePanel = () => {
  return (
    <Panel>
      {frames.map((frame, index) => (
        <div>
          <FrameName>{frame.name}</FrameName>
          <Frame key={index} selected={frame.selected}>
            <FrameContent>{frame.content}</FrameContent>
          </Frame>
        </div>
      ))}
    </Panel>
  );
};

export default FramePanel;
const Panel = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  border-radius: 8px;
  gap: 40px;
`;

const Frame = styled.div<ISelectedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68px;
  height: 68px;
  box-sizing: border-box;
  padding: 0px 15px 0px 14px;
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
  text-align: center;
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
