const Parseo= (Codigo) => {

     
    //originalWord = Code; 
    const newCodigo = Codigo.split("#").join(''); 
    
    return(newCodigo);
}

const getyearfrom23barcode = (serial23)=>{
    const year = serial23.substr(1,2)
    return(year)
}

export default Parseo;