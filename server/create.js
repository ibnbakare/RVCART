
// }
// // const k = news.map((nopa) => {
// // const {_id,username,email} = nopa   
// // return {_id,username,email}
// // })
// const {password,...others} = news
// console.log(others)


// const today = new Date(); // get current date
// const lastMonth = new Date(today.setMonth(today.getMonth() -1))
// const pMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1))
// // today.(2)
// // today.setMonth(today.getMonth() + 4)
// console.log(lastMonth.toString())
// console.log(pMonth.toString())
// const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // set last month's date
// console.log(lastMonth)




// const n = new Date()
// const date = new Date(n.setMonth(n.getMonth() -1))
// console.log(date)
// const dat = new Date
// const lastMonth = new Date(date.setMonth(date.getMonth() -1))
// const lastYear = new Date(dat.setYear(dat.getYear() -1))
// console.log(lastYear)
// console.log(lastMonth)

const news ={
    _id: "640e9c51717441a0eb916b70",
    username: "new",
    email: "mop@gmail.com",
    password: "U2FsdGVkX18rdmYCp2vxUQZW/038J9yiK/v2e4nH090=",
}
const {_id, ...other} = news
console.log(other)