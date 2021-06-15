const App = (function(RothCalculations, RothUI, DataCtrl){
  // Get Selectors
  // Load Event Listeners 
  const ui = RothUI.getSelectors();
  const loadEventListeners = () => {
    document.querySelector('#submit').addEventListener('click', e => {
      RothUI.displayLoader()
      calculateRothIRA()
      e.preventDefault()
    })
    ui.form.addEventListener('DOMContentLoaded', calculateRothIRA)
    ui.inputs.forEach(i => {
      let v = i.value
      i.addEventListener('blur', RothUI.checkErrors(i, v));
    })
    ui.tooltips.forEach(tt => {
      tt.addEventListener('click', RothUI.displayToolTip)
    })
    ui.barChartBtn.addEventListener('click', e => {
      RothUI.changeChartType(DataCtrl.getArrays().totalContributionsArr, DataCtrl.getArrays().tsArr, ui.age)
      e.preventDefault()
    })
  }

  const calculateRothIRA = () => {
    DataCtrl.resetArrays()
    RothUI.resetValues()
    const tcArr = DataCtrl.getArrays().totalContributionsArr;
    const tsArr = DataCtrl.getArrays().tsArr;
    // Data
    const yearsToPay = ui.retirementAge - ui.age;
    // Calculations
    RothCalculations.totalContributions(ui.age, ui.retirementAge, ui.annualContributions, ui.startingBalance);
    RothCalculations.RothVsTradCalculations(yearsToPay, ui.rateOfReturn, ui.annualContributions, ui.startingBalance, ui.marginalTaxRate);
    RothUI.displayChart(tcArr, tsArr, ui.age);
    console.log(tcArr, tsArr)
  }

  return {
    init: () => {
      calculateRothIRA();
      loadEventListeners();
    }
  }

})(RothCalculations, RothUI, DataCtrl)

App.init()