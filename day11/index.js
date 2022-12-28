import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n\n').map(monkey => monkey.split('\n'));
}

const parseMonkeys = (input) =>{
    const monkeyList = input.map((monkey) => {
        let monkeyObj = {};
        monkeyObj.items = monkey[1].match(/\d+/g).map(number => parseInt(number)) || [];
        if(monkey[2].includes('*')){
            monkeyObj.operations = function (old) {
                const number = +monkey[2].match(/\d+/g)
                return old * (number ? number : old);
            };
        }else{
            monkeyObj.operations = function (old) {
                return old + +monkey[2].match(/\d+/g)[0];
            };
        }
        monkeyObj.test = function (value) {
            const divideby = +monkey[3].match(/\d+/g)[0];
            const t = +monkey[4].match(/\d+/g)[0];
            const f = +monkey[5].match(/\d+/g)[0];
            return (value % divideby) === 0 ? t : f;
        }
        monkeyObj.totalItems = 0;
        monkeyObj.divisor = +monkey[3].match(/\d+/g)[0];
        return monkeyObj;
    });
    return monkeyList;
}


const getSolutionPart1 = () => {
    const input = readInputFile();
    const monkeylist = parseMonkeys(input);
    for(let i = 0; i < 20; i++){
        for(let m = 0; m < monkeylist.length; m++){ 
            while(monkeylist[m].items.length > 0){
                let worryLvl = monkeylist[m].items[0];
                worryLvl = monkeylist[m].operations(worryLvl);
                worryLvl = Math.floor(worryLvl / 3);
                let throwTo = monkeylist[m].test(worryLvl);
                monkeylist[throwTo].items.push(worryLvl);
                monkeylist[m].items.shift();
                monkeylist[m].totalItems += 1;
            }
        }
    }
    monkeylist.sort((a,b) => b.totalItems-a.totalItems);
    return monkeylist[0].totalItems * monkeylist[1].totalItems;
}




const getSolutionPart2 = () => {
    const input = readInputFile();
    const monkeylist = parseMonkeys(input);
    const commonDivisor = monkeylist.reduce((tot, curr) => tot * curr.divisor, 1);
    for(let i = 0; i < 10000; i++){
        for(let m = 0; m < monkeylist.length; m++){ 
            while(monkeylist[m].items.length > 0){
                let worryLvl = monkeylist[m].items[0];
                worryLvl = monkeylist[m].operations(worryLvl);
                worryLvl = worryLvl % commonDivisor;
                let throwTo = monkeylist[m].test(worryLvl);
                monkeylist[throwTo].items.push(worryLvl);
                monkeylist[m].items.shift();
                monkeylist[m].totalItems += 1;
            }
        }
    }
    console.log(monkeylist);
    monkeylist.sort((a,b) => b.totalItems-a.totalItems);
    return monkeylist[0].totalItems * monkeylist[1].totalItems;
}

console.log("JavaScript");

const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
