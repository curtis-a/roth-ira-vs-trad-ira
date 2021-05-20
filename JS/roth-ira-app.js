const App = (function(RothCalculations, RothUI, DataCtrl){
  // Get Selectors
  // Load Event Listeners 
  const ui = RothUI.getSelectors();
  const loadEventListeners = () => {
    document.querySelector('#submit').addEventListener('click', calculateRothIRA)
    ui.form.addEventListener('DOMContentLoaded', calculateRothIRA)
  }

  const calculateRothIRA = () => {
    DataCtrl.resetArrays()
    RothUI.resetValues()
    // Data
    const yearsToPay = ui.retirementAge - ui.age;
    const rorArr = DataCtrl.getArrays().rateOfReturnArr;
    const tcArr = DataCtrl.getArrays().totalContributionsArr;
    const tsArr = DataCtrl.getArrays().tsArr;
    // Calculations
    RothCalculations.totalContributions(ui.age, ui.retirementAge, ui.annualContributions, ui.startingBalance);
    RothCalculations.RothVsTradCalculations(yearsToPay, ui.rateOfReturn, ui.annualContributions, ui.startingBalance, ui.marginalTaxRate);
    RothUI.displayTotals(tcArr, tsArr);
    RothUI.displayChart(tcArr, tsArr, yearsToPay);
  }

  return {
    init: () => {
      calculateRothIRA();
      loadEventListeners();
    }
  }

})(RothCalculations, RothUI, DataCtrl)

App.init()