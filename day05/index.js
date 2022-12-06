import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString();
}

const createMatrix = (textInput) => {
    const matrix = [[], [], [], [], [], [], [], [], []];
    [...textInput].forEach(string => {
        let i,p;
        for( i = 1, p = 0; i < 34; i+=4, p++){
            if(string[i] !== ' ') matrix[p].push(string[i]);
        }
    })
    return matrix;
}
//1, 5, 9, 13, 17, 21, 25, 29, 33
const getSolutionPart1 = () => {
    const input = readInputFile().split('\n\n');
    const crates = input[0].split('\n').map(string => [...string]);
    let matrix = createMatrix(crates.slice(0,8));
    const actions = input[1].split('\n').map(action => {
        let numbers = action.match(/\d+/g);
        if(numbers) return numbers.map(x => parseInt(x));
    });
    for(const x of actions){
        for(let i = 0; i < x[0]; i++){
            let from = x[1]-1;
            let to = x[2] - 1; 
            matrix[to].unshift(matrix[from].shift());
        }
    }
    return (matrix[0][0] + matrix[1][0]+ matrix[2][0]+matrix[3][0]+matrix[4][0]+matrix[5][0]+matrix[6][0]+matrix[7][0]+ matrix[8][0]); 
}

const getSolutionPart2 = () => {
    const input = readInputFile().split('\n\n');
    const crates = input[0].split('\n').map(string => [...string]);
    let matrix = createMatrix(crates.slice(0,8));
    const actions = input[1].split('\n').map(action => {
        let numbers = action.match(/\d+/g);
        if(numbers) return numbers.map(x => parseInt(x));
    });
    for(const x of actions){
        let temp = matrix[(x[1] - 1)].slice(0,x[0]).reverse();
        for(let i = 0; i < x[0]; i++){
            matrix[(x[1]-1)].shift();
            matrix[(x[2]-1)].unshift(temp[i]);
        }
    }
    return (matrix[0][0] + matrix[1][0]+ matrix[2][0]+matrix[3][0]+matrix[4][0]+matrix[5][0]+matrix[6][0]+matrix[7][0]+ matrix[8][0]);
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}