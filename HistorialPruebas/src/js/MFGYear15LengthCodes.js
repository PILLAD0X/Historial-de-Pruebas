
//import {getLoadingFAData,setLoadingFAData,} from '../Components/loadingState'
const Swal = require('sweetalert2');
const getCurrentYear = () => new Date().getFullYear();

const generateYearOptions = () => {
  const startYear = 2012;
  const currentYear = getCurrentYear();
  const yearOptions = {};

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions[year] = year.toString();
  }

  return yearOptions;
};

const getMFGYear15LengthCodes = async () => {
  const { value: MfgYears } = await Swal.fire({
    title: "Select Manufacturing Year",
    input: "select",
    inputOptions: {
      Years: generateYearOptions()
    },
    inputPlaceholder: "Select a year",
    showCancelButton: true
  });
  
  if (MfgYears) {
    const MFGYidentifier= MfgYears.toString().slice(-1)
    return MFGYidentifier;
   
  }
};

export default getMFGYear15LengthCodes;