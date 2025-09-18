const people = [
    {name:'Alice', age:20,role:'user'},
    {name:'Bob', age:21,role:'admin'},
    {name:'Charlie', age:22,role:'user'},
]

const allAdults = people.every(people => people.age >= 18)
const hasAdmin = people.some(people => people.role === 'admin')


