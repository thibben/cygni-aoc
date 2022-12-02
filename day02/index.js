import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n');
}

const getSolutionPart1 = () => {
    const points = new Map([ ["A Y", 8], ["B Z", 9], ["C X", 7], ["A X", 4], ["B Y", 5], ["C Z", 6], ["A Z", 3], ["B X", 1], ["C Y", 2] ]);
    const game = readInputFile();
    let total = 0;
    for(const x of game){
        total += points.get(x);
    }
    return total;
}

const getSolutionPart2 = () => {
    const translated = new Map([ ["A Y", 4], ["B Z", 9], ["C X", 2], ["A X", 3], ["B Y", 5], ["C Z", 7], ["A Z", 8], ["B X", 1], ["C Y", 6] ]);
    const game = readInputFile();
    let total = 0;
    for(const x of game){
        total += translated.get(x);
    }
    return total;
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}