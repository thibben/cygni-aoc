import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().replaceAll('-', ',').split('\n').map(line => line.split(',').map(n => parseInt(n)));
}

const getSolutionPart1 = () => {
    const input = readInputFile();
    let count = 0;
    [...input].forEach( pair => {
        if((pair[0] >= pair[2] && pair[1] <= pair[3]) || (pair[2] >= pair[0] && pair[3] <= pair[1])) count += 1;
    });
    return count;
}

const getSolutionPart2 = () => {
    const input = readInputFile();
    let count = 0;
    [...input].forEach( pair => {
        if((pair[1] >= pair[2] && pair[1] <= pair[3]) || (pair[3] >= pair[0] && pair[3] <= pair[1])) count += 1;
    });
    return count;
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}