import React, { createContext, useState, useContext } from "react";

interface DropdownContextType {
  openDropdown: string | null;
  handleDropdownToggle: (dropdownLabel: string) => void;
  resetFirstAndSecondDropdowns: () => void;
}
type DropdownProviderProps = {
  children: React.ReactNode;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider"
    );
  }
  return context;
};

export const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdownLabel: string) => {
    if (openDropdown === dropdownLabel) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownLabel);
    }
  };

  const resetFirstAndSecondDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <DropdownContext.Provider
      value={{
        openDropdown,
        handleDropdownToggle,
        resetFirstAndSecondDropdowns,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
