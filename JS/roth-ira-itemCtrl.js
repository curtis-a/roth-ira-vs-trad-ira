const DataCtrl = (function(){
  const calculationArrays = {
    rateOfReturnArr: [],
    totalContributionsArr: [],
    marginalTaxRateArr: [],
    tsArr: [],
    chartLabels: [],
    tsRateOfReturnArr: [],
    taxableSavings: 0,
    totalRothIra: 0,
    ytp: 0
  }

  const taxRates = {
    lowRate: 0.1,
    lowmidRate: 0.12,
    lowHighRate: 0.22,
    midLowRate: 0.24,
    midRate: 0.32,
    midHighRate: 0.35,
    highRate: 0.37
  }

  const marginalTaxThresholds = {
    single: {
      lowThreshold: 9875,
      lowMidThreshold: 40125,
      lowHighThreshold: 85526,
      midLowThreshold: 163301,
      midThreshold: 207351,
      highThreshold: 518401
    },
    headOfHousehold: {
      lowThreshold: 14200,
      lowMidThreshold: 54200,
      lowHighThreshold: 86350,
      midLowThreshold: 164905,
      midThreshold: 209400,
      highThreshold: 523600
    },
    marriedJoint: {
      lowThreshold: 19900,
      lowMidThreshold: 81050,
      lowHighThreshold: 172750,
      midLowThreshold: 329850,
      midThreshold: 418850,
      highThreshold: 628300
    },
    marriedSeperate: {
      lowThreshold: 9950,
      lowMidThreshold: 40525,
      lowHighThreshold: 86375,
      midLowThreshold: 164925,
      midThreshold: 209425,
      highThreshold: 314151
    },
  }  

  return {
    getArrays: () => {
      return calculationArrays;
    },
    getThresholds: () => {
      return marginalTaxThresholds
    },
    getRates: () => {
      return taxRates
    },
    resetArrays: () => {
      let c = calculationArrays;
      c.rateOfReturnArr = [];
      c.totalContributionsArr = [];
      c.tsArr = [];
      c.marginalTaxRateArr = [];
      c.tsRateOfReturnArr = [];
      c.taxableSavings = 0;
      c.totalRothIra = 0;
    },
    getLabels: async (ytp) => {
      let i;
      for(i = 0; i < ytp; i++) {
        let j = i;
        calculationArrays.chartLabels.push(`Year ${j}`)
      }
    },
    }
})()