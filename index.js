const fs = require("fs");

const getDamage = str =>
  str
    .split("Damage. ")[1]
    ?.split(",")
    .map(s => s.trim());

const getLogData = data => {
  let d = data.map(el => el.split(" "));
  let victim = d[0][1];
  let attacker = d[1][1];
  let damage = d[2][1];
//   return {
//     victim,
//     attacker,
//     damage,
//   };
return `${attacker} -> ${victim} : ${damage}`
};

const getParseToJSON = data => {
  return data
    .split("\n")
    .map(getDamage)
    .reduce((p, c) => (c !== undefined ? [c, ...p] : p), [])
    .map(s => [s[0], s[1], s[3]])
    .map(getLogData);
};

fs.readFile("test3.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let log = getParseToJSON(data);

  console.log(log);
});
