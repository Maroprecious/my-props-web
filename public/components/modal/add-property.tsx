import React, { SetStateAction, useEffect, useState } from "react";
import { Inter, Lora, Raleway } from "../../fonts";
import { Inputs } from "../input";
import { ModalContainer } from "../modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { NigerisStates } from "../../hooks/nigeria-states";
import { StatusSelect } from "../select";
import { AddPropertyValidationSchema } from "../../utils/schema/property";
import { useFormik } from "formik";
import { useAppThunkDispatch, useAppSelector } from "@/redux/store";
import {
  AddProperties,
  editProperty,
} from "@/redux/reducers/properties/thunk-action";
import { useSelectCurrentUser } from "@/redux/reducers/auth";
import { useProperties } from "../../context/property-context";
import { useMediaQuery } from "../../hooks/usemediaquery";

type props = {
  setOpenAddPropertyModal: React.Dispatch<SetStateAction<any>>;
  setOpenPropertyList: React.Dispatch<SetStateAction<any>>;
  modalTitle: "Add Property" | "Edit Property";
};
export const AddProperty = ({
  setOpenAddPropertyModal,
  setOpenPropertyList,
  modalTitle,
}: props) => {
  const dispatch = useAppThunkDispatch();
  const user = useAppSelector(useSelectCurrentUser);
  const { property, setProperty } = useProperties();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    values,
  } = useFormik({
    initialValues: {
      propertyName: "",
      propertyState: "",
      propertyLocation: "",
    },
    validationSchema: AddPropertyValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        propertyLocation: values.propertyLocation,
        propertyState: values.propertyState,
        propertyName: values.propertyName,
        userId: user?.id,
        occupationalStatus: user?.roles,
      };
      console.log(payload, "payload");
      if (modalTitle === "Add Property") {
        await dispatch(AddProperties(payload)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Property added successfully");
            setOpenAddPropertyModal(false);
          } else {
            console.log(res?.payload, "resp");
          }
        });
      } else {
        await dispatch(editProperty(payload)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Property edited successfully");
            setOpenAddPropertyModal(false);
          } else {
            console.log(res?.payload, "resp");
          }
        });
      }
    },
  });
  console.log(errors, "errr");
  const matches = useMediaQuery("(min-width: 767px)");
  useEffect(() => {
    if (Object.keys(property ?? {}).length) {
      setFieldValue("propertyName", property.propertyName);
      setFieldValue("propertyLocation", property.propertyLocation);
      setFieldValue("propertyState", property.propertyState);
    }
  }, [property]);
  return (
    <ModalContainer
      width={matches ? "35%" : "80%"}
      title={modalTitle}
      goBack={true}
      handleModalClose={() => {
        setOpenAddPropertyModal(false);
        setOpenPropertyList(true);
      }}
    >
      <div className="mt-8">
        <div className="mt-2">
          <label
            className={`${Lora.className} mb-4 font-normal text-darkText3 text-[14px]`}
          >
            Location
          </label>
          <Inputs
            value={values.propertyLocation}
            type="text"
            onChange={handleChange("propertyLocation")}
            onBlur={handleBlur("propertyLocation")}
            err={!!errors.propertyLocation && touched.propertyLocation}
            errMsg={errors.propertyLocation}
            name="propertyLocation"
            placeholder="propertyLocation"
          />
        </div>
        <div className="mt-4">
          <label
            className={`${Lora.className} mb-4 font-normal text-darkText3 text-[14px]`}
          >
            Title or Name
          </label>
          <Inputs
            type="text"
            value={values.propertyName}
            onChange={handleChange("propertyName")}
            onBlur={handleBlur("propertyName")}
            err={!!errors.propertyName && touched.propertyName}
            errMsg={errors.propertyName}
            name="propertyName"
            placeholder="Title or name"
          />
          <div>
            <label
              className={`${Lora.className} mb-4 font-normal text-darkText3 text-[14px]`}
            >
              State
            </label>
            <StatusSelect
              placeholder="Select State"
              options={NigerisStates}
              value={values.propertyState}
              onChange={(value) => setFieldValue("propertyState", value)}
              onBlur={() => handleBlur("propertyState")}
              err={!!errors.propertyState && touched.propertyState}
              errMsg={errors.propertyState}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button
            title={modalTitle}
            variant="submit"
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </ModalContainer>
  );
};
