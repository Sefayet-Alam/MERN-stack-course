//Github link:
//1.

function findPower(voltage,current){
    let V=parseFloat(voltage);
    let I=parseFloat(current);
    let P=V*I;
    return P;
}

console.log("Power of a line with 100A current and 3V voltage: "+findPower(100,3));

//2.
function findMaxNumber(ara){
    if(ara.length==0) return null;
    let maxm=Math.max(...ara);
    return maxm;
}

let ara=[];
console.log("Maximum no of the array ["+ara+"] is: "+findMaxNumber(ara));


//3.

function mergeArrays(arr1,arr2){
    return arr1.concat(arr2);
}

let A=[1,2,"ANCK",5,'6'];
let B=[4,"YOO",'z'];

let ans=mergeArrays(A,B);
console.log("Merged array: "+ans);

//4.

function arrayValuesTypes(arr) {
    let ret=arr.map((value) => typeof value);
    return ret;
}
  
let Arr = [1, 2, "null", []];
let result = arrayValuesTypes(Arr);

console.log(result);