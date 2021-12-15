module.exports.dates = (selectedDate, period) => {

    console.log('Inicia cálculo de fechas')
    //Fecha inicial
    console.log('Fecha seleccionada: ', selectedDate)
    //De la fecha seleccionada empieza a correr al siguiente día (le agrega 1 día)
    const startDate = addDays(selectedDate, 1)
    console.log(startDate)
    //Le da formato para registrarla en la base de datos
    const startDateF = formatDate(startDate)
    console.log(startDateF)
    console.log("días", period)
    //Le suma los días del periodo
    const finalDate = addDays(startDate, parseInt(period));
    console.log(finalDate)
    //Le da formato
    const finalDateF = formatDate(finalDate)
    console.log(finalDateF)
    console.log('End de fechas')

    return {
        startDate: startDateF,
        finalDate: finalDateF
    }
 
}


const addDays = (date, daysToAdd) => {
    const newDate = new Date(Number(date));
    newDate.setDate(date.getDate() + daysToAdd);
    return newDate;
}


const formatDate = (date) =>{
    const dateToFormat = date

    const day = dateToFormat.getDate()
    const month = dateToFormat.getMonth() + 1
    const year = dateToFormat.getFullYear()

    const formattedMonth = month < 10 ? `0${month}` : `${month}`
    const formattedDay = day < 10 ? `0${day}` : `${day}`
    const formattedDate = `${year},${formattedMonth},${formattedDay}`
    
    return formattedDate
}