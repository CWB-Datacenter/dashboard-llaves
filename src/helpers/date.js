const today = new Date()
const day = String(today.getDate()).padStart(2, "0")
const month = String(today.getMonth() + 1).padStart(2, "0")
const year = String(today.getFullYear()).slice()

export const ddMMyy = () => {
    return `${day}/${month}/${year}`
}

export const yyMMdd = () => {
    return `${year}${month}${day}`
}