import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n');
}

const checkIndex = (index) =>{
    const checkIndexes = [20, 60, 100, 140, 180, 220];
    return checkIndexes.includes(index);
}

const processData = (input) => {
    let result = [];
    let cycleValue = [];
    let current = 1;
    let cycle = 1;
    [...input].forEach(line => {
        cycleValue.push(current);
        if(checkIndex(cycle)) result.push(current);
        if(line === 'noop') {
            cycle += 1;
        }else{ 
            cycle += 1;
            if(checkIndex(cycle)) result.push(current);
            cycle += 1;
            const add = line.split(' ').at(1);
            cycleValue.push(current);
            current += +add;
        }
    });
    return [result,cycleValue];
}

const getSolutionPart1 = () => {
    const input = readInputFile();
    const result = processData(input).at(0);
    return (result[0] * 20 + result[1] * 60 + result[2] * 100 + result[3] * 140 + result[4] * 180 + result[5] * 220);
}




const getSolutionPart2 = () => {
    const input = readInputFile();
    const newlines = [39, 79, 119, 159, 199, 239];
    const cycles = processData(input).at(1);
    let cycle = 0;
    let returnString = '';
    for(let i = 0; i < 6; i++){
        for(let r = 0; r < 40; r++){
            if( cycles[cycle] - 1 <= r && cycles[cycle] + 1 >= r) returnString += '#';
            else returnString += '.'
            cycle += 1;
        }
         returnString += "\n";
    }
    return returnString;
}

console.log("JavaScript");

const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
