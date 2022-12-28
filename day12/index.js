import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n\n').map(monkey => monkey.split('\n'));
}



const getSolutionPart1 = () => {

}




const getSolutionPart2 = () => {
        
}

console.log("JavaScript");

const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
