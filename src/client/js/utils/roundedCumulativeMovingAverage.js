const roundedCumulativeMovingAverage = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

export default roundedCumulativeMovingAverage;

