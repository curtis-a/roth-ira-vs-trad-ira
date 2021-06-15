const RothCalculations = (function(){
  return {
    totalContributions: (age, retirement, ac, sb) => {
      const yearsToPay = retirement - age;
      return (ac * yearsToPay) + sb;
    },
    RothVsTradCalculations: (ytp, ror, ac, sb, mtr) => {
      const rorArr = DataCtrl.getArrays().rateOfReturnArr;
      const tcArr = DataCtrl.getArrays().totalContributionsArr;
      const tsArr = DataCtrl.getArrays().tsArr;
      const totalRoth = DataCtrl.getArrays().totalRothIra;
      const totalTrad = DataCtrl.getArrays().totalTradIra;
      // Calculations
      const yearlyPayment = parseFloat(ac + sb);
      const interest = parseFloat(yearlyPayment * ror);
      const totalIncrease = parseFloat(interest + yearlyPayment); 
      const taxableSavings = parseFloat(totalIncrease - (totalIncrease * mtr));
      rorArr.push(parseFloat(interest.toFixed(2)));
      tcArr.push(Math.round(totalIncrease.toFixed(2)));
      tsArr.push(Math.round(taxableSavings.toFixed(2)))
      ytp = ytp - 1;
      // Reccursion
      if(ytp >= 0){ RothCalculations.RothVsTradCalculations(ytp, ror, ac, totalIncrease, mtr) } 
      else { 
        console.log(`Roth IRA Calc: ${tcArr[tcArr.length - 1]}`)
        console.log(`Traditional IRA Calc: ${tsArr[tsArr.length - 1]}`)
        return 
      }
    }
  }
})()

