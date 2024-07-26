const fs = require("fs");

let data = fs.readFileSync("temp.txt", "utf-8");
data = data.replaceAll("declare module", " ");
data = data.replaceAll("ace-builds/src-noconflict/snippets/", " ");
data = data.replaceAll("'", " ");
let home = data.replaceAll(";", " ");
home = home.replaceAll(" ", "");

home = home.split("\n");

// home = home.filter((s) => !s.includes("/"));
// home = home.map((s) => s.replaceAll("\r", ""));

// console.log(data);
console.log(home);
