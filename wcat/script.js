#!/usr/bin/env node

/*const fs=require("fs");
fs.writeFileSync("ab.txt","Hello");// write a file
//let data=fs.readFileSync("abc.txt","utf-8"); // read the contents of the file
//console.log(data);
//console.log(fs.existsSync("abc.txt")); // returns true if the file exists
//console.log(process.argv);

let arguments=process.argv.slice(2);// argv is an array of all the arguments passed 
//console.log(arguments);
function wcat(a){
//let content=fs.readFileSync(a[0],"utf-8");
//console.log(content);
//}
if(a.length==0){
    console.log("Please specify a file name");
}

for(let i=0;i<a.length;i++){
    if(!fs.existsSync(a[i])){
        console.log(a[i]+ " does not exists");
        return;

    }
    let content=fs.readFileSync(a[i],"utf-8");
    console.log(content);
}
}
wcat(arguments);*/


const fs = require("fs");
let arguments = process.argv.slice(2);// discard the first 2 arguments of the argv array

function wcat(arguments) {
    let options = arguments.filter(function (data, index) {
        return data.startsWith("-");
    });

    let files = arguments.filter(function (data, index) {
        return !data.startsWith("-");
    });
     
    //if file name is not entered
    if (files.length == 0) {
        console.log("Please specify a file name.");
        return;
    }
    //if entered file name does not exists
    for (let i = 0; i < files.length; i++) {
        if (!fs.existsSync(files[i])) {
            console.log(files[i] + " does not exist");
            return;
        }
    }

    // Display the contents of the file without space
    let numbering =1;
    for (let i = 0; i < files.length; i++) {
        let data = fs.readFileSync(files[i], "utf-8");
        if (options.includes("-s")) { //for only -s
            let lines = data.split("\r\n");//Removes space and /r
            if(options.includes("-w")){
                if(files.length!=2){
                    console.log("Can not run this command");
                }
                fs.writeFileSync(files[1],"");
            }
            for(let j=0 ;j<lines.length;j++){
                if(lines[j]!=""){ // agr space h toh print ni krna 
                    if(options.includes("-n") || options.includes("-b")){ // for only -n
                        console.log(numbering,lines[j]);
                        numbering+=1;
                    }

                    else{
                        console.log(lines[j]);
                    }
                
                }
            }
        }

        else if(options.includes("-n") && !options.includes("-b") || options.includes("-n")&&options.includes("-b")&&options.indexOf("-n")<options.indexOf("-b")){ // for only -n (-n gives numbering to both empty and non empty lines)
            let lines=data.split("\r\n");
            for(let k=0;k<lines.length;k++){
                console.log(numbering +"."+lines[k]);
                numbering+=1;

            }
        }
        else if(options.includes("-b")){ //for only -b (-b gives numering to only non empty lines)
            let lines=data.split("\r\n");
            for(let i=0;i<lines.length;i++){
                if(lines[i]!=""){
                    console.log(numbering+"."+lines[i]);
                    numbering+=1;
                }
                else{
                    console.log(lines[i]);
                }
            }
        }
        else if(options.includes("-w")){ // to overwrite the content of def.txt
            if(files.length!=2 || arguments.indexOf("-w")!=1){
                console.log("can not run this command");
                return;
            }

            let data=fs.readFileSync(files[0],"utf-8");
            fs.writeFileSync(files[1],data);
        }

        else if(options.includes("-a")){
            if(files.length!=2 || arguments.indexOf("-a")!=1){
                console.log("can not run this command");
                return;
            }
            let data1=fs.readFileSync(files[0],"utf-8");
            let data2=fs.readFileSync(files[1],"utf-8");
            fs.writeFileSync(files[1],data2+data1);
        }
    
            else{
                console.log(data); // Agr options mai -s nah ho then file as it is print krni h without removing space
            }
        }
            }
        wcat(arguments);
            /*if(options.includes("-w")) {
                if(files.length != 2) {
                    console.log("unable to run this command");
                    return;
                }
                fs.writeFileSync(files[1], "");
            }*/
