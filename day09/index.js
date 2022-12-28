import fs from 'fs';

const readInputFile = (input = "input.txt") => {
    return fs.readFileSync(input).toString().trim().split('\n').map(l => l.split(' '));
}

const visited = [];
let firsPart = [{x:0, y:0}, {x:0, y:0}]; //0 head 1 tail
let secondPart = [{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0}];

const moveH = (dir, head,rope) => {
    switch (dir) {
        case 'U':
            rope[head].y +=1;
            break;
        case 'D':
            rope[head].y -=1;
            break;
        case 'L':
            rope[head].x -=1;
            break;
        case 'R':
            rope[head].x +=1;
            break;
        default:
            break;
    }
}
const isTouching = (head, tail,rope) => {
    for(let i = rope[tail].y - 1; i < rope[tail].y + 2; i++){
        for(let j = rope[tail].x -1; j < rope[tail].x + 2; j++){
            if(rope[head].y === i && rope[head].x === j){
                return true;
            }
        }
    }
    return false;
}

const moveT = (head,tail,rope) => {
    if(!isTouching(head,tail,rope)){ 
        const xdiff = rope[head].x - rope[tail].x;
        const ydiff = rope[head].y - rope[tail].y;
        if(xdiff === 0 || ydiff === 0){ // they're on the same line but too far apart
            if(xdiff === 0) ydiff > 0 ? rope[tail].y += 1 : rope[tail].y -= 1;
            if(ydiff === 0) xdiff > 0 ? rope[tail].x += 1 : rope[tail].x -= 1;
        }else{ // Head and Tail are offset in both x and y direction
            if((xdiff === 1 && ydiff == 2) || (xdiff === 2 && ydiff == 1) || (xdiff === 2 && ydiff == 2) ){
                rope[tail].x += 1;
                rope[tail].y += 1;  
            }else if( (xdiff === 2 && ydiff == -1) || (xdiff === 1 && ydiff == -2) || (xdiff === 2 && ydiff === -2)){
                rope[tail].x += 1;
                rope[tail].y -= 1;
            }else if((xdiff === -2 && ydiff == -1) || (xdiff === -1 && ydiff == -2)|| (xdiff === -2 && ydiff === -2)){
                rope[tail].x -= 1;
                rope[tail].y -= 1;
            }else {
                rope[tail].x -= 1;
                rope[tail].y += 1;
            }   
        }
    }
    if(tail === 9){
        addCoordinate(rope);
    }
}

const addCoordinate = (rope) => {
    if(part === "part1"){
        if(visited.find(coordinate => coordinate.x === rope[1].x && coordinate.y === rope[1].y) === undefined){
            visited.push({x:rope[1].x, y: rope[1].y});
        }
    }else{
        if(visited.find(coordinate => coordinate.x === rope[9].x && coordinate.y === rope[9].y) === undefined){
                visited.push({x:rope[9].x, y: rope[9].y});
        }
    }
}

const moveMultiple = (dir, steps,head,tail,rope) =>{ 
    for(let i = 0; i < +steps; i++){
        moveH(dir,head,rope);
        moveT(head,tail,rope);
    }
}
 
const getSolutionPart1 = () => {
    const input = readInputFile();
    visited.push({x: 0, y: 0});
    for(const steps of input){
        moveMultiple(steps.at(0), steps.at(1),0,1,firsPart);
    }
    return visited.length;
}


const getSolutionPart2 = () => {
    const input = readInputFile();
    visited.push({x: 0, y: 0});
    for(const steps of input){
        for (let i = 0; i < steps.at(1); i++){
            moveH(steps.at(0),0,secondPart);
            for(let j = 0; j < 9; j++){ //move all the other parts
                moveT(j,j+1,secondPart);
            }
        }
    }
    return visited.length;
}

console.log("JavaScript");
const part = process.env.part || "part1";

if(part === "part1"){
    console.log(getSolutionPart1());
}else{
    console.log(getSolutionPart2());
}
