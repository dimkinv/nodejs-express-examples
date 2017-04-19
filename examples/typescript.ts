interface CanRun{
    startRunning(speed:number): boolean;
}

class Person{

}
const t = 0;
class Student extends Person implements CanRun{
    startRunning(speed:number): boolean{
        return true
    }
}

enum Color{
    Red = 10,
    Blue,
}

function foo<T extends Person>(prop: T): T{
  return prop;
}

let arr = ["a", "b", "c"];
// let a = arr[0];

let [a, b] = arr;


[a, b] = [b, a]


function getData(){
    //logic
    let err, result
    return [err, result]
}

let [e, r1] = getData();

