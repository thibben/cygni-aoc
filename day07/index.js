import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n');
}

const format = () => {
    const input = readInputFile("input.txt");
    const directories = [];
    const path = [];
    let current;
    [...input].forEach(line => {
        if(line.startsWith('$ cd')){
            let cdCom;
            cdCom = line.split(' ').at(-1);
            if(cdCom === '/'){ //root directory
                const root = {name: cdCom,size: 0};
                directories.push(root);
                path.push(root);
            }else if( cdCom === '..'){
                path.pop();
                return;
            }else{
                const directory = {name: cdCom,size: 0};
                directories.push(directory);
                path.push(directory);
            }
        }
        if(!(line.startsWith('$') || line.startsWith('dir'))){
            let value = line.match(/\d+/g)[0];
            path.map(d => (d.size += parseInt(value)));
        }
    });
    return directories;
}
 

const getSolutionPart1 = () => {
    return format()
        .filter(obj => obj.size < 100000)
        .reduce((a,b) => a += b.size,0);
}

const getSolutionPart2 = () => {
    const directories = format();
    const remove = 30000000 - (70000000 - directories[0].size);
    return directories.filter(d => d.size > remove).sort((a,b) => a.size - b.size)[0].size;
    
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
