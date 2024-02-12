import {
  Button,
  Card,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import EditModal from "../Modals/EditModal";
import { uploadImage } from "../../pages/StoresPage/storesSlice";
import { getStoreImage } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

const StoreCard = ({ store, editModal, deleteModal }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const { uploadLoading } = useSelector((state) => state.stores);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setIsImageSelected(true);
    }
  };

  return (
    <>
      <Card
        onPress={onOpen}
        isPressable
        className='flex flex-col w-full bg-white border-[1px] border-neutral-300 rounded-3xl p-2'
      >
        <img
          className='w-full h-[200px] object-cover rounded-2xl'
          src={getStoreImage(store?.fileEntity)}
        />
        <div className='flex flex-col w-full p-2'>
          <div className='flex flex-row justify-between'>
            <span className='text-[14px] font-bold text-black'>
              {"№" + store?.storeNumber}
            </span>
            <Chip
              size='sm'
              color='warning'
              variant='bordered'
              className='text-[14px] font-bold'
            >
              {store?.size + "m²"}
            </Chip>
          </div>
          <div className='flex flex-row'>
            <span className='text-[14px] font-normal text-black'>
              {store?.categoryStore?.name}
            </span>
          </div>
        </div>
      </Card>
      <Modal
        size='4xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        className='text-black'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {"№" + store?.storeNumber}
              </ModalHeader>
              <ModalBody className='flex flex-row'>
                <div className='flex flex-col items-center w-[300px] gap-5 py-3 px-5'>
                  {/* {label && (
                    <span className='text-[16px] font-semibold font-space mb-[-30px]'>
                      {label}
                    </span>
                  )} */}
                  <input
                    onChange={handleFileChange}
                    type='file'
                    name='avatar'
                    id={store?.id}
                    className={"w-[300px] invisible h-0 overflow-hidden"}
                    accept='image/*'
                  />
                  <label
                    htmlFor={store?.id}
                    // onMouseEnter={() => setIsImgHover(true)}
                    // onMouseLeave={() => setIsImgHover(false)}
                    className='group w-fit'
                  >
                    <div
                      className={
                        "w-[300px] h-[300px] relative rounded-[30px] overflow-hidden"
                      }
                    >
                      <img
                        src={
                          image === null
                            ? getStoreImage(store?.fileEntity)
                            : URL.createObjectURL(image)
                        }
                        className='w-full h-full object-cover bg-contain bg-no-repeat'
                      />

                      <div
                        className={
                          // isImgHover
                          // ? "flex justify-center items-end pb-5 w-full h-full absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
                          "flex justify-center items-end pb-5 w-full h-full invisible group-hover:visible absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
                        }
                      >
                        <span className='text-foresty-white'>Rasm tanlash</span>
                      </div>
                    </div>
                  </label>
                  <div className={"flex flex-row items-center gap-2 w-full"}>
                    <Button
                      className='flex flex-grow'
                      isLoading={uploadLoading}
                      color={!isImageSelected ? "default" : "primary"}
                      onClick={() =>
                        dispatch(
                          uploadImage({
                            file: image,
                            storeData: {
                              id: store?.id,
                              contractNumber: store?.contractNumber,
                              storeNumber: store?.storeNumber,
                              size: store?.size,
                              fullName: store?.fullName,

                              categoryStoreId: store?.categoryStore?.id + "",
                            },
                            removeSelection: () => {
                              setIsImageSelected(false);
                              setImage(null);
                            },
                          })
                        )
                      }
                      disabled={!isImageSelected}
                    >
                      {" Rasmni yuklash"}
                    </Button>
                    {/* {imageData != null && (
                      <DeleteModal
                        button={
                          isCompact ? (
                            <DeleteButton />
                          ) : (
                            <DeleteButtonText>{"O'chirish"}</DeleteButtonText>
                          )
                        }
                        contextText={`Avatarni `}
                        handleSubmit={() =>
                          dispatch(deleteImage({ url: deleteUrl }))
                        }
                      />
                    )} */}
                  </div>
                </div>
                {/* <div className='flex flex-col w-[300px] gap-3'>
                  <img
                    className='w-full h-[300px] object-cover rounded-2xl'
                    src='https://bsmi.uz/wp-content/uploads/2021/12/empty-img.png'
                  />
                  <Button>{"Rasm yuklash"}</Button>
                </div> */}
                <div className='flex flex-col grow items-end'>
                  <div className='flex flex-col w-full p-5 bg-white rounded-xl h-fit'>
                    <div className='flex flex-row justify-between'>
                      <span className='text-[16px] text-black font-semibold'>
                        {"Do'kon ma'lumotlari"}
                      </span>
                    </div>
                    <div className='flex flex-row justify-between mt-5'>
                      <span className='text-[14px] text-neutral-600 font-semibold'>
                        {"F.I.Sh"}
                      </span>
                      <span className='text-[14px] text-black font-semibold'>
                        {store?.fullName}
                      </span>
                    </div>
                    <Divider className='my-2' />
                    <div className='flex flex-row justify-between'>
                      <span className='text-[14px] text-neutral-600 font-semibold'>
                        {"Do'kon raqami"}
                      </span>
                      <span className='text-[14px] text-black font-semibold'>
                        {store?.storeNumber}
                      </span>
                    </div>
                    <Divider className='my-2' />
                    <div className='flex flex-row justify-between'>
                      <span className='text-[14px] text-neutral-600 font-semibold'>
                        {"Shartnoma raqami"}
                      </span>
                      <span className='text-[14px] text-black font-semibold'>
                        {store?.contractNumber}
                      </span>
                    </div>
                    <Divider className='my-2' />
                    <div className='flex flex-row justify-between'>
                      <span className='text-[14px] text-neutral-600 font-semibold'>
                        {"Do'kon o'lchami"}
                      </span>
                      <span className='text-[14px] text-black font-semibold'>
                        {`${store?.size} m²`}
                      </span>
                    </div>

                    <Divider className='my-2' />
                    <div className='flex flex-row justify-between'>
                      <span className='text-[14px] text-neutral-600 font-semibold'>
                        {"Kategoriyasi"}
                      </span>
                      <span className='text-[14px] text-black font-semibold'>
                        {`${store?.categoryStore?.name}`}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-row w-full justify-between px-5 h-full items-end'>
                    {editModal(store)}
                    {deleteModal(store)}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {/* <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoreCard;
