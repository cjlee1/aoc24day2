import { reactorLogText } from "./constants";

// parses log or input
function parseReactorReports(logText: string) {
  return logText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s+/).map(Number));
}

function isReportSafe(levelReadings:number[]) {
  let lockedDirection = 0; // 0 unknown, +1 incr, -1 dec

  for (let i = 1; i < levelReadings.length; i++) {
    const delta = levelReadings[i] - levelReadings[i - 1];

    if (delta === 0 || Math.abs(delta) > 3) return false; // makes sure its within 3 levels and not more 

    const stepDirection = delta > 0 ? 1 : -1;
    if (lockedDirection === 0) lockedDirection = stepDirection;
    else if (stepDirection !== lockedDirection) return false;
  }

  return true;
}

// Part 2: safe if already safe OR becomes safe by removing exactly one level
function isReportSafeWithDampener(levelReadings:number[]) {
  if (isReportSafe(levelReadings)) return true;

  for (let skipIndex = 0; skipIndex < levelReadings.length; skipIndex++) {
    const candidate = levelReadings.filter((_, idx) => idx !== skipIndex);
    if (isReportSafe(candidate)) return true;
  }

  return false;
}

function countSafeReportsPart1(logText: string) {
  return parseReactorReports(logText).filter(isReportSafe).length;
}

function countSafeReportsPart2(logText:string ) {
  return parseReactorReports(logText).filter(isReportSafeWithDampener).length;
}

console.log("Part 1 safe:", countSafeReportsPart1(reactorLogText)); // 2
console.log("Part 2 safe:", countSafeReportsPart2(reactorLogText)); // 4