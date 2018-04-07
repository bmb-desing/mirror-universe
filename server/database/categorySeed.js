import {category} from "../model";
const categories = [
    {
        alias: 'katastrofy',
        name: 'Катастрофы'
    },
    {
        alias: 'politica',
        name: 'Политика'
    },
    {
        alias: 'vojny',
        name: 'Войны'
    },
    {
        alias: 'kriminal',
        name: 'Криминал'
    },
    {
        alias: 'bolezni',
        name: 'Болезни'
    },
    {
        alias: 'zdorove',
        name: 'Здоровье'
    },
    {
        alias: 'ekologiya',
        name: 'Экология'
    },
    {
        alias: 'tekhologii',
        name: 'Технологии'
    },
    {
        alias: 'tvorchestvo',
        name: 'Творчество'
    },
    {
        alias: 'soznanie',
        name: 'Сознание'
    }

]

const catSeed = categories.map(item => {
    category.create({
        title: item.name,
        alias: item.alias,
        description: item.name
    })
})
export default catSeed