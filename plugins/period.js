import peryod from 'peryod'
const strings = {
    "seconds": "несколько секунд назад...",
    "minute": "минуту назад...",
    "minutes": "{value} минут назад...",
    "hour": "час назад...",
    "hours": "{value} часа назад...",
    "yesterday": "вчера, {value}",
    "past": "{date}, {time}",
    "months": [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ]
}
const date = (date) => {
    const someDate = new Date(date)
    console.log(date)
    return someDate.peryod(date, strings)
}
export default date