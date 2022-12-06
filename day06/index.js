import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString();
}

const unique = (array) => {
    return (new Set(array)).size === array.length;
}

const getSolutionPart1 = () => {
    const input = [...readInputFile()];
    for(let i = 0; i < input.length - 3; i++){
        if(unique(input.slice(i,i+4))) return (i+4)
    }
}

const getSolutionPart2 = () => {
    const input = [...readInputFile()];
    for(let i = 0; i < input.length - 13; i++){
        if(unique(input.slice(i,i+14))) return (i+14)
    }
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}