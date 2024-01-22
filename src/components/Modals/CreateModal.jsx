import { PlusIcon } from "@heroicons/react/24/outline";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik } from "formik";
import { at, uniqueId } from "lodash";
import React from "react";
import Api from "../../config/Api";

const handleUpload = async (file) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Api.post("/fayl/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending FormData
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
};

const CreateModal = ({
  btnText,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  ctgs,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        color='primary'
        endContent={<PlusIcon className='w-[18px]' />}
      >
        {btnText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <Formik
          // validate
          // validateOnChange={true}
          // validateOnBlur={t}
          // validateOnBlur={true}
          // validateOnChange={true}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if ("categoryId" in values) {
                  values["categoryId"] = +[...values["categoryId"]][0];
                }

                if ("categoryStoreId" in values) {
                  values["categoryStoreId"] = +[
                    ...values["categoryStoreId"],
                  ][0];
                }

                if ("imageFile" in values) {
                  let attachmentId = await handleUpload(values["imageFile"]);

                  if (attachmentId) {
                    values["fileEntityId"] = attachmentId?.id;

                    let reqBody = {
                      fileEntityId: attachmentId?.id,
                      name: values?.name,
                      price: values?.price,
                      count: values?.count,
                      description: values?.description,
                    };

                    handleSubmit(reqBody);
                    onClose();
                    return;
                  } else {
                    return;
                  }
                }

                handleSubmit(values);
                onClose();
              }}
              className='flex flex-col gap-5 w-full font-madefor'
            >
              <ModalContent className='text-black font-semibold'>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {"Qo'shish"}
                    </ModalHeader>
                    <ModalBody>
                      {fields?.map((field, index) =>
                        field?.type === "customSelect" ? (
                          <Select
                            defaultSelectedKeys={new Set([values[field.name]])}
                            variant='faded'
                            isInvalid={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            errorMessage={errors[field.name]}
                            isRequired={field?.isRequired}
                            // classNames={{
                            //   listboxWrapper: "grid grid-cols-2 border-2 h-40 w-40",
                            //   listbox: "w-20 col-span-2",
                            // }}
                            className='text-black dark:text-white w-full flex flex-row'
                            selectionMode={field?.selectionMode}
                            // selectedKeys={values[field?.name]}
                            // name={field?.name}
                            // onSelectionChange={handleChange}
                            selectedKeys={new Set([values[field?.name]])}
                            key={index}
                            label={field.label}
                            placeholder={field.placeholder}
                            onChange={(e) => {
                              setFieldValue(field?.name, e.target.value);
                            }}
                          >
                            {field?.selectData &&
                              field?.selectData.map((selData) => (
                                <SelectItem
                                  textValue={selData?.name}
                                  variant={selData?.hexCode ? "light" : "flat"}
                                  style={
                                    selData?.hexCode && {
                                      backgroundColor: selData?.hexCode,
                                      color: "#fff",
                                    }
                                  }
                                  // className='text-black dark:text-white'
                                  key={selData?.id}
                                  value={selData?.id}
                                >
                                  {selData?.name}
                                </SelectItem>
                              ))}
                          </Select>
                        ) : field.type === "select" ? (
                          <Select
                            isInvalid={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            errorMessage={errors[field.name]}
                            isRequired={field?.isRequired}
                            style={{ color: "#000" }}
                            selectionMode='single'
                            // selectedKeys={values[field?.name]}
                            // name={field?.name}
                            // onSelectionChange={handleChange}
                            key={index}
                            label='Kategoriya tanlash'
                            className='w-full'
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue(
                                field?.name,
                                new Set([e.target.value])
                              );
                            }}
                          >
                            {ctgs &&
                              ctgs.map((ctg) => (
                                <SelectItem
                                  style={{ color: "#000" }}
                                  key={ctg?.id}
                                  value={ctg?.id}
                                >
                                  {ctg?.name}
                                </SelectItem>
                              ))}
                          </Select>
                        ) : field.type == "file" ? (
                          <div className='flex flex-col items-center'>
                            {values[field.name] && (
                              <img
                                src={URL.createObjectURL(values[field.name])}
                                alt='Selected File'
                                className='w-full h-[200px] object-contain'
                              />
                            )}
                            <Input
                              type='file'
                              onChange={(e) => {
                                setFieldValue(field?.name, e.target.files[0]);
                              }}
                              accept='image/*' // Optional: Specify the accepted file types (e.g., images)
                            />
                            {/* {values[field.name] && (
                              <p>Selected File: {values[field.name].name}</p>
                            )} */}
                          </div>
                        ) : (
                          <Input
                            // isInvalid={
                            //   !touched[field.name] && !errors[field.name]
                            // }
                            isInvalid={
                              touched[field.name] && Boolean(errors[field.name])
                            }
                            errorMessage={errors[field.name]}
                            isRequired={field?.isRequired}
                            style={{ color: "#000", fontWeight: 500 }}
                            label={field.label}
                            // labelPlacement='outside'
                            placeholder={field.placeholder}
                            name={field.name}
                            value={values[field.name]}
                            key={index}
                            type={field.type}
                            onChange={handleChange}
                          />
                        )
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='flat' onPress={onClose}>
                        {"Bekor qilish"}
                      </Button>
                      <Button type='submit' color='primary'>
                        {"Qo'shish"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateModal;
