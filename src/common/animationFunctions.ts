import {
    addDays,
    daysBetween
} from './dayFunctions'

type AnimationParams = {
    animationType: "interval" | "accumulation",
    startDate: Date,
    stopDate: Date,
    stepBy: number,
    windowSize: number
}

export function calculateIntervalStepCount(params: AnimationParams): number {
    const {
        startDate,
        stopDate,
        stepBy,
        windowSize
    } = params
    const newStartDate = addDays(startDate, + stepBy + windowSize);
    const totalDays = daysBetween(stopDate, newStartDate, "ceiling") + 1
    return Math.ceil(totalDays / stepBy)
}

export function calculateAccumulationStepCount(params: AnimationParams) {
    const {
        startDate,
        stopDate,
        stepBy
    } = params

    const totalDays = daysBetween(stopDate, startDate, 'ceiling')
    return Math.ceil(totalDays / stepBy)
}

export function calculateAnimationStepCount(params: AnimationParams) {
    return params.animationType === 'interval'
        ? calculateIntervalStepCount(params)
        : calculateAccumulationStepCount(params)
}

