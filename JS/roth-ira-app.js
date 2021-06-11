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
    ui.inputs.forEach(i => i.addEventListener('blur', RothUI.checkErrors()))
  }

  const calculateRothIRA = () => {
    DataCtrl.resetArrays()
    RothUI.resetValues()
    RothUI.checkErrors()
    // Data
    const yearsToPay = ui.retirementAge - ui.age;
    const tcArr = DataCtrl.getArrays().totalContributionsArr;
    const tsArr = DataCtrl.getArrays().tsArr;
    // Calculations
    RothCalculations.totalContributions(ui.age, ui.retirementAge, ui.annualContributions, ui.startingBalance);
    RothCalculations.RothVsTradCalculations(yearsToPay, ui.rateOfReturn, ui.annualContributions, ui.startingBalance, ui.marginalTaxRate);
    RothUI.displayChart(tcArr, tsArr, ui.age);
  }

  return {
    init: () => {
      calculateRothIRA();
      loadEventListeners();
    }
  }

})(RothCalculations, RothUI, DataCtrl)

App.init()