"use client"

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type FormResponse = {
  [key: string]: string;
};

type FormResponseContextType = {
  formResponse: FormResponse;
  setFormResponse: Dispatch<SetStateAction<FormResponse>>;
};

const FormResponseContext = createContext<FormResponseContextType | undefined>(undefined);

const FormResponseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formResponse, setFormResponse] = useState<FormResponse>({});

  return (
    <FormResponseContext.Provider value={{ formResponse, setFormResponse }}>
      {children}
    </FormResponseContext.Provider>
  );
};

export const useFormResponse = () => {
  const context = useContext(FormResponseContext);
  if (!context) {
    throw new Error(
      "useFormResponse must be used within a FormResponseProvider"
    );
  }
  return context;
};

export default FormResponseProvider;