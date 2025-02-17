import { RoundingMethod } from "./types";

const msPerDay: number = 24 * 60 * 60 * 1000;

export function addDays(date: Date, days: number) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

const getLibraryRoundingFunction = (method: RoundingMethod) => {
    if (method === 'floor') { return Math.floor }
    if (method === "ceiling") { return Math.ceil }
    return Math.round
}

export function daysBetween(lhsDate, rhsDate, roundingMethod: RoundingMethod) {
    const timeDiff = lhsDate < rhsDate
        ? rhsDate.getTime() - lhsDate.getTime()
        : lhsDate.getTime() - rhsDate.getTime()

    const method = getLibraryRoundingFunction(roundingMethod)
    return method(timeDiff / msPerDay)
}