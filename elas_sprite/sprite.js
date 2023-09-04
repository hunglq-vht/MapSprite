var spritezero = require("@elastic/spritezero");
var fs = require("fs");
var glob = require("glob");
var path = require("path");
[1].forEach(function (pxRatio) {
  console.log("first try");
  var svgs = glob
    .sync(path.resolve(path.join(__dirname, "input/*.svg")))
    .map(function (f) {
      console.log("basename", path.basename(f).replace(".svg", ""));
      return {
        svg: fs.readFileSync(f),
        id: path.basename(f).replace(".svg", ""),
      };
    });

  var pngPath = path.resolve(path.join(__dirname, "output/sprite.png"));

  var jsonPath = path.resolve(path.join(__dirname, "output/sprite.json"));

  spritezero.generateLayout(
    { imgs: svgs, pixelRatio: pxRatio, sdf: false, format: true },
    function (err, dataLayout) {
      if (err) return;
      fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    }
  );

  spritezero.generateLayout(
    { imgs: svgs, pixelRatio: pxRatio, sdf: false, format: false },
    function (err, imageLayout) {
      spritezero.generateImage(imageLayout, function (err, image) {
        if (err) return;
        fs.writeFileSync(pngPath, image);
      });
    }
  );
});
