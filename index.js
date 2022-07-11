const fs = require("fs");
const file = "combat.log";

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
  return `${attacker} -> ${victim} : ${damage}`;
};

const getParseToJSON = data => {
  let d = data.trim().split("\n").reverse()[0];
  return [d]
    .map(getDamage)
    .reduce((p, c) => (c !== undefined ? [c, ...p] : p), [])
    .map(s => [s[0], s[1], s[3]])
    .map(getLogData);
};

let tmp = "";

const worker = (cb) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let log = getParseToJSON(data)[0];

    if (log === undefined) {
      // console.error('no damage');
      return;
    }

    if (tmp !== log) {
      cb(log);
    }
    tmp = log;
  });
};

module.exports.worker = worker;
// worker(console.log)
// setInterval(()=>worker(console.log), 300);
