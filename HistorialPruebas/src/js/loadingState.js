// loadingState.js

//import { useState } from "react";

let loadingPCB = false;
//const [loadingPCB, setLoadingPCB] = useState(false);
//const [loadingFA, setLoadingFA] = useState(false);
let loadingFA = false;

export const setLoadingPCBData = (loading) => {
  loadingPCB = loading;
};

export const setLoadingFAData = (loading) => {
  loadingFA = loading;
};

export const getLoadingPCBData = () => loadingPCB;

export const getLoadingFAData = () => loadingFA;
