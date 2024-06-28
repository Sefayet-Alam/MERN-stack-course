/*
Name: Sefayet Alam
email: sefayetalam14@gmail.com
*/


//1.

function calculateSum(num1, num2) {
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    return a + b;
}
var num = 5;
var num2 = 10;
var result = calculateSum(num, num2);
console.log("The sum of "+num+" & "+num2+" is: "+result);



//2.


function isEven(num) {
    let a = parseInt(num);
    return (a % 2) == 0;
}

num=7;
if (isEven(num) == true) console.log("The number "+ num +" is Even.")
else console.log("The number "+num+" is Odd.")


//3.

function findMax(arr){
    let maxm=Math.max(...arr);
    return maxm;
}

let arr=[1,2094,10000000,2409,222,24,2];
console.log("Maximum no of the array "+JSON.stringify(arr)+" is: "+findMax(arr));

//4.
function reverseString(str){
    return JSON.stringify(str.split('').reverse().join(''));
}

let p="Ruthless__"
console.log("Reverse of string: "+p+" is "+reverseString(p));


//5.


function filterOddNumbers(input){
    let ret=[]
    for(var item in input){
        var k=parseInt(input[item]);
        if(k%2) ret.push(k);
    }
    return ret;
}

var ar=[1,5,3,2,6,8,10,11,13,16,20]
var filtered=filterOddNumbers(ar);

console.log("Keeping only the odd numbers of the array "+JSON.stringify(ar)+" we get: "+JSON.stringify(filtered));


//6. 

function sumArray(input){
    let ret=0;
    for(var item in input){
        var k=parseInt(input[item]);
        ret+=k;
    }
    return ret;
}

var ar2=[1,5,3,2,6,8,10,11,13,16,20];
console.log("Sum of the array "+JSON.stringify(ar2)+" is: "+sumArray(ar2));

//7.

function sortArray(input){
    let ret=input.sort((a,b)=>a-b);
    return JSON.stringify(ret); 
}
var ar3=[99,100,13,23,54,6757,75];
console.log("Sorting the array "+JSON.stringify(ar3)+" we get: "+sortArray(ar3));

//8.

function capitalizeFirstLetter(input){
    return JSON.stringify(input.charAt(0).toUpperCase()+input.slice(1));
}
console.log(capitalizeFirstLetter("hello"));

//To take input from user and check ....
// function main (input) {
//      if(isEven(input)==true) console.log("The number is Even.")
//      else console.log("The number is Odd.")
// }

// let input = "";
// process.stdin.on('data', (chunk) => {
//     input += chunk;
// });

// process.stdin.on('end', () => {
//     main(input.trim());
// });