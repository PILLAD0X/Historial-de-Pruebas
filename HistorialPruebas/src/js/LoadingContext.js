import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const LoadingContext = createContext();

// Proveedor del contexto
export const LoadingProvider = ({ children }) => {
  const [loadingPCB, setLoadingPCB] = useState(false);
  const [loadingFA, setLoadingFA] = useState(false);
  const [loadingSMTBottom, setLoadingSMTBottom] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ loadingPCB, setLoadingPCB, loadingFA, setLoadingFA }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLoading = () => {
  return useContext(LoadingContext);
};
