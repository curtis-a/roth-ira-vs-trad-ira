const App = (function(RothCalculations, RothUI, DataCtrl){
  // Get Selectors
  // Load Event Listeners 
  const ui = RothUI.getSelectors();
  const loadEventListeners = () => {
    ui.form.addEventListener('DOMContentLoaded', App.calculateRothIRA)
    ui.inputs.forEach(input => {
      input.addEventListener('blur', RothUI.checkErrors);
    })
    ui.tooltips.forEach(tt => tt.addEventListener('click', RothUI.displayToolTip))
    ui.barChartBtn.addEventListener('click', e => {
      RothUI.changeChartType(DataCtrl.getArrays().totalContributionsArr, DataCtrl.getArrays().tsArr, ui.age)
      e.preventDefault()
    })
    ui.marginalTaxRateInput.addEventListener('blur', RothUI.updateRetirementTaxRate);
    ui.advSettings.addEventListener('change', e => {
      if(ui.advSettings.checked){
        ui.advSettingsContainer.classList.remove('dropdown-closed');
        ui.advSettingsContainer.classList.add('dropdown-active');
        if(ui.advSettingsContainer.classList.contains('dropdown-active')) {
          ui.advSettingsContainer.style.maxHeight = ui.advSettingsContainer.scrollHeight + 'px';
        }
      } else {
        ui.advSettingsContainer.classList.remove('dropdown-active');
        ui.advSettingsContainer.classList.add('dropdown-closed');
        ui.advSettingsContainer.style.maxHeight = 0;
      }
    })
    ui.maximiseContributionsCheck.addEventListener('change', App.calculateRothIRA)
  }

  return {
    init: () => {
      loadEventListeners();
    },
    calculateRothIRA: () => {
      let arr = []
      ui.inputs.forEach(input => {
        if(input.parentElement.classList.contains('input-error')) arr.push(input)
      })
      if(arr.length > 0) return
      // console.log(arr)
      if(arr.length > 0) return
      DataCtrl.resetArrays()
      RothUI.resetValues()
      const tcArr = DataCtrl.getArrays().totalContributionsArr;
      const tsArr = DataCtrl.getArrays().tsArr;
      // Data
      const yearsToPay = ui.retirementAge - ui.age;
      // Calculations
      const tc = RothCalculations.totalContributions(ui.age, ui.retirementAge, ui.annualContributions, ui.startingBalance);
      RothCalculations.RothVsTradCalculations(yearsToPay, ui.rateOfReturn, ui.annualContributions, ui.startingBalance, ui.startingBalance, ui.marginalTaxRate, ui.retirementTaxRateInput.value / 100, ui.age);
      RothUI.displaySummary(tcArr, tsArr, yearsToPay, tc)
      RothUI.displayChart(tcArr, tsArr, ui.age)
    }
  }

})(RothCalculations, RothUI, DataCtrl)

App.init()
App.calculateRothIRA()