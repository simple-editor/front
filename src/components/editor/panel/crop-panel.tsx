import useToolbarStore from "@/shared/store/toolbar-store";
import styled from "@emotion/styled";
import { useState } from "react";

interface ISelectedProps {
  selected: boolean;
}

const CropPanel = () => {
  const [isFrame, setFrame] = useState<string>("없음");

  //클릭 시 해당 프레임이 어떤 프레임인지 비교할 State가 필요함.

  const { setCropTools } = useToolbarStore((state) => state);
  //먼저 w,h 샘플 데이터를 만든다.
  //hanldeClick 이벤트를 생성한다.
  //클릭 시w,h값을 받는다.
  //setCroptools에 w,y를 업데이트한다.
  const hanldeUpdateCropSizes = (width: number, height: number) => {
    setCropTools({ width, height });
  };

  const handleFrameActive = (name: string) => {
    setFrame(name);
  };

  return (
    <Panel>
      {frameDatas.map((frame) => (
        <div onClick={() => hanldeUpdateCropSizes(frame.width, frame.height)}>
          <FrameName>{frame.name}</FrameName>
          <Frame
            onClick={() => handleFrameActive(frame.name)}
            key={frame.name}
            selected={isFrame === frame.name}
          >
            <FrameContent>{frame.content}</FrameContent>
          </Frame>
        </div>
      ))}
    </Panel>
  );
};

export default CropPanel;
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

const frameDatas = [
  { name: "없음", content: "", width: 0, height: 0 },
  {
    name: "샘플1",
    content: "sample",
    width: 200,
    height: 200,
  },
  {
    name: "샘플2",
    content: "400x400",

    width: 400,
    height: 400,
  },
];
