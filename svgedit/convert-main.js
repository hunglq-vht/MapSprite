const {parse, stringify} = require('svgson'); 

const fs = require('fs'); 

const pretty = require('pretty'); 

const inputFolder = "./input/"; 
const outputFolder = "./main/"; 

fs.readdir(inputFolder, (err, files) => {
    files.forEach((fileName) => {
        fs.readFile(inputFolder + fileName, "utf-8", function (err, data) {
            parse(data).then((json) => {
                if (json.children[0] !== undefined) {
                    if (json.children[0].children[0].attributes.id === "shadow") {
                        json.children[0].children[0].attributes.style = "visibility: hidden;"; 
                    }

                    json.children[0].children[1].children.forEach((children) => {
                        if (children.attributes.stroke !== undefined) {
                            children.attributes.stroke = "#fff"; 
                            if  (children.attributes.fileName !== "none") {
                                children.attributes.fill = "#fff";
                            }
                        } else {
                            children.attributes.fill = "#fff";
                        }
                    })
                }

                if (json.children[1] !== undefined) {
                    json.children[1].attributes.style = "visibility: hidden;"; 
                }

                if (json.children[2] !== undefined) {
                    json.children[2].attributes.style = "visibility: hidden;";
                }

                const mysvg = stringify(json, {
                    transformAttr: (key, value, esc) => {
                        return `${key}="${value}"`; 
                    }
                })

                fs.writeFile(outputFolder + fileName, pretty(mysvg), function (err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log('file saved', fileName);
                })
            })
        })
    })
})