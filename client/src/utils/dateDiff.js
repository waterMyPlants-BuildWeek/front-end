const getToday = () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    const yyyy = today.getFullYear()

    if(dd <10){
        dd ='0'+dd
    }

    if(mm < 10) {
        mm='0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd

    return today.toString()

}



export const dateDiff = (date) => {

    const today = new Date(getToday())
    const date2 = new Date(date)
    const diffTime = Math.abs(today - date2)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays

}
