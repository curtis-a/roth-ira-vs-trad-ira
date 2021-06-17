const RothCalculations = (function(){
  return {
    totalContributions: (age, retirement, ac, sb) => {
      const yearsToPay = retirement - age;
      return (ac * yearsToPay) + sb;
    },
    RothVsTradCalculations: (ytp, ror, ac, sbt, sbr, mtr, rtr, age) => {
      const rorArr = DataCtrl.getArrays().rateOfReturnArr;
      const tcArr = DataCtrl.getArrays().totalContributionsArr;
      const tsArr = DataCtrl.getArrays().tsArr;
      const maxCont = RothUI.getSelectors().maximiseContributionsCheck
      let count = age
      // Calculations
      if(count >= 50 && maxCont.checked === true && ac < 7000) {
        ac = ac + 1000
      }
   
      const yearlyPaymentTrad = parseFloat(ac + sbt);
      const yearlyPaymentRoth = parseFloat(ac + sbr);
      const interestTrad = parseFloat(yearlyPaymentTrad * ror);
      const interestRoth = parseFloat(yearlyPaymentRoth * ror);
      const totalIncreaseRoth = parseFloat(interestRoth + yearlyPaymentRoth); 
      const totalIncreaseTrad = parseFloat(interestTrad + yearlyPaymentTrad); 
      const totalTrad = parseFloat(totalIncreaseTrad - (totalIncreaseTrad * rtr));

      rorArr.push(parseFloat(interestRoth.toFixed(2)));
      tcArr.push(Math.round(totalIncreaseRoth.toFixed(2)));
      tsArr.push(Math.round(totalTrad.toFixed(2)))

      ytp = ytp - 1;
      count++

      if(ytp >= 0){ RothCalculations.RothVsTradCalculations(ytp, ror, ac, totalIncreaseTrad, totalIncreaseRoth, mtr, rtr, count) } 
      else { 
        // console.log(`Roth IRA Calc: ${tcArr[tcArr.length - 1]}`)
        // console.log(`Traditional IRA Calc: ${tsArr[tsArr.length - 1]}`)
        return 
      }
    }, 
    maximumContributions: (age, retirementAge) => {
       
    }
  }
})()

