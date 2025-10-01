interface Person {
    name:string;
}

// 继承
interface Employee extends Person {
    job:number;
}

// 类型声明
type PersonType = {name:string}
type EmployeeType = PersonType & {job:number}
