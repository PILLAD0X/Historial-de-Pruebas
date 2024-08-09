//import {getLoadingFAData,setLoadingFAData,} from '../Components/loadingState'
const Swal = require("sweetalert2");
const getCurrentYear = () => new Date().getFullYear();

const generateYearOptions = () => {
  const startYear = 2018;
  const currentYear = getCurrentYear();
  const yearOptions = {};

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions[year] = year.toString();
  }

  return yearOptions;
};

const getMFGYear15LengthCodes = async () => {
  const { value: MfgYears } = await Swal.fire({
    title: "Seleccione año de Manufactura",
    input: "select",
    inputOptions: {
      Years: generateYearOptions(),
    },
    inputPlaceholder: "Seleccione año",
    showCancelButton: true,
  });

  if (MfgYears) {
    const MFGYidentifier = MfgYears.toString().slice(-1);
    return MFGYidentifier;
  }
};

export default getMFGYear15LengthCodes;
