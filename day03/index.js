import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n');
}

const getPriority = (char) => {
    if(char == char.toLowerCase()) {
        return char.charCodeAt(0) - 96;
    }else{
        return char.charCodeAt(0) - 38;
    }
}

const getSolutionPart1 = () => {
    const input = readInputFile().map(x => {
        const half = Math.ceil(x.length/2);
        return [x.slice(0,half).split(''), x.slice(half).split('')];
    });
    const dupes = input.map(x => {
        for(const char of x[0]){
            if(x[1].includes(char)) return getPriority(char);
        }
        return undefined;
    });
    return dupes.reduce((a,b) => a + b);
}

const getSolutionPart2 = () => {
    const elves = readInputFile();
    let res = 0;
    for(let i = 0; i < (elves.length - 2); i+=3){
        const first = elves[i].split('');
        const second = elves[i+1].split('');
        const third = elves[i+2].split('');
        const common = first.filter((char) => (second.includes(char) && third.includes(char)));
        res += getPriority(common[0]);
    }
    return res;
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}