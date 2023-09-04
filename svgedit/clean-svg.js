const fs = require("fs");
const { parse } = require("svgson");

const inputFolder = "./input/";
const outputFolder = "./main/";

fs.readdir(inputFolder, (err, files) => {
  files.forEach((file) => {
    fs.readFile(inputFolder + file, "utf-8", function (err, data) {
      const startIndex = data.indexOf("<!-- <style type=");
      const endIndex = data.indexOf("</style> -->");
      console.log(startIndex, endIndex);
      const newData =
        data.substring(0, startIndex) + data.substring(endIndex + 12);
      parse(newData)
        .then((json) => {
          console.log(json);
          fs.writeFile(inputFolder + file, newData, function (err) {
            if (err) {
              return console.log(err);
            }
          });
        })
        .catch(() => {
          console.log("convert failed");
        });
    });
  });
});
