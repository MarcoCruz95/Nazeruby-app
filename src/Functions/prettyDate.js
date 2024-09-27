const prettyDate = (strDate) => {
    if(!strDate){return null;}
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const arrDate = strDate.split('-');
    return arrDate[2] + ' de ' + months [Number(arrDate[1]) - 1] + ' de ' + arrDate[0];
} 

export default prettyDate;