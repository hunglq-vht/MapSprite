const {parse, stringify} = require('svgson'); 

const fs = require('fs'); 

const pretty = require('pretty'); 

const inputFolder = "./input/"; 
const outputFolder = "./shadow/"; 

fs.readdir(inputFolder, (err, files) => {
    files.forEach((fileName) => {
        fs.readFile(inputFolder + fileName, "utf-8", function (err, data) {
            parse(data).then((json) => {
                if (json.children[0] !== undefined) {
                    if (json.children[0].children[1].attributes.id === "main") {
                        json.children[0].children[1].attributes.style = "visibility: hidden;"; 
                    }
                    json.children[0].children[0].children.forEach((children) => {
                        if (children.attributes.stroke !== undefined) {
                            children.attributes.stroke = '#fff'; 
                            if (children.attributes.fill !== 'none') {
                                children.attributes.fill = '#fff';
                            }
                        } else {
                            children.attributes.fill = '#fff'
                        }
                    })
                }
                if (json.children[1] !== undefined) {
                    json.children[1].attributes.style = 'visibility: hidden;'; 
                }
                if (json.children[2] !== undefined) {
                    json.children[2].attributes.style = 'visibility: hidden;';
                }

                const mysvg = stringify(json, {
                    transformAttr: (key, value, esc) => {
                        return `${key}="${value}"`
                    }
                })

                let tmpFileName = fileName.replace(".svg", ""); 
                fs.writeFile(
                    outputFolder + tmpFileName + ".Shadow.svg", 
                    pretty(mysvg), 
                    function (err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log('file' + tmpFileName + '.Shadow.svg saved')
                    }
                )
            })
        })
    })
})