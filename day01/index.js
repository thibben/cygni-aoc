import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n').map((x)=>parseInt(x));
}

const getSolutionPart1 = () => {
    let hungry_elf = 0;
    let current = 0;
    const input = readInputFile();
    for(let i = 0; i < input.length; i++){
        if(isNaN(input[i])){
            if(current > hungry_elf) hungry_elf = current;
            current = 0;
        }else{
            current += input[i];
        }
    }
    return hungry_elf;
}

const getSolutionPart2 = () => {
    const elves = [];
    let current = 0;
    const input = readInputFile();
    for(let i = 0; i < input.length; i++){
        if(isNaN(input[i])){
            elves.push(current);
            current = 0;
        }else{
            current += input[i];
        }
    }
    const sorted = elves.sort((a,b) => {return b - a});
    return (sorted[0] + sorted[1] + sorted[2]);
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}