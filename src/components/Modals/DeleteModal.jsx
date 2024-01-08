import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import React from "react";

const DeleteModal = ({ handleSubmit, contextText }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className='text-lg text-danger cursor-pointer active:opacity-50'
      >
        <TrashIcon className='w-[18px]' />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent className='text-black font-semibold'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {"O'chirish"}
              </ModalHeader>
              <ModalBody>
                <span className='text-[16px] font-normal'>
                  <span className='font-bold'>{contextText}</span>
                  {` ni o'chirishni xohlaysizmi?`}
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  {"Bekor qilish"}
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  {"O'chirish"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
