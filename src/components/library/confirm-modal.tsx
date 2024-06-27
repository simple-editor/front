import Button from "@/shared/ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose }: IProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textStyle="h6"
            css={{ margin: "auto", padding: "16px 0" }}
          >
            정말 삭제하시겠습니까?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textStyle="p" css={{ margin: "auto" }}>
            선택한 항목이 영구적으로 삭제되며 <br /> 이 동작은 되돌릴 수
            없습니다."
          </ModalBody>

          <ModalFooter mt="22px">
            <Button
              title="close"
              size="small"
              styles={{ width: "50%" }}
              color="white"
              onClick={onClose}
            />
            <Button
              title="close"
              size="small"
              styles={{ width: "50%" }}
              onClick={onClose}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
