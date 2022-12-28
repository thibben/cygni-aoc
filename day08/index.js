import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n').map(l => l.split('').map(c => parseInt(c)));
}
const createCols = (matrix) => {
    const colM = [];
    let tempC = [];
    for(let c = 0; c < matrix.length; c++){
        for(let r = 0; r < matrix[0].length; r++){
            tempC.push(matrix[r][c]);
        }
        colM.push(tempC);
        tempC = [];
    }
    return colM;
}

const isVisible = (row, col, rowI, colI) =>{
    if(rowI === 0 || colI === 0) return true;
    if(rowI === row.length - 1 || colI === col.length - 1)return true;

    const upArray = col.slice(0,colI);
    const downArray = col.slice(colI+1);
    const lefArray = row.slice(0,rowI);
    const rightArray = row.slice(rowI+1);

    if(upArray.every(t => t < col[colI]))return true;
    if(downArray.every(t => t < col[colI]))return true;
    if(lefArray.every(t => t < row[rowI]))return true;
    if(rightArray.every(t => t < row[rowI]))return true;
    return false;
}

const calcScenic = (row, col, rowI, colI) =>{
    if(rowI === 0 || colI === 0) return 0;
    if(rowI === row.length - 1 || colI === col.length - 1)return 0;

    const upArray = col.slice(0,colI).reverse();
    const downArray = col.slice(colI+1);
    const lefArray = row.slice(0,rowI).reverse();
    const rightArray = row.slice(rowI+1);

    const u = upArray.findIndex(element => element >= col[colI]) + 1 || upArray.length;
    const d = downArray.findIndex(element => element >= col[colI])+ 1 || downArray.length;
    const l = lefArray.findIndex(element => element >= row[rowI]) + 1 || lefArray.length;
    const r = rightArray.findIndex(element => element >= row[rowI]) + 1 || rightArray.length;

    return (l*r*u*d);
}
 
const getSolutionPart1 = () => {
    const rowsM = readInputFile();
    const colM = createCols(rowsM);
    const rowL = rowsM.length;
    const colL = colM.length;
    let result = 0;
    for(let r = 0; r < rowL; r++){
        for(let c = 0; c < colL; c++){
            if(isVisible(rowsM[r], colM[c], c, r)){
                result +=1;
            }
        }
    }
    return result;
}


const getSolutionPart2 = () => {
    const rowsM = readInputFile();
    const colM = createCols(rowsM);
    const rowL = rowsM.length;
    const colL = colM.length;
    let result = 0;
    for(let r = 0; r < rowL; r++){
        for(let c = 0; c < colL; c++){
            const scenic = calcScenic(rowsM[r], colM[c], c, r);
            if(scenic > result){
                result =  scenic;
            }
        }
    }
 return result;
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
