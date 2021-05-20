const RothUI = (function(){
  const selectors = {
    form: document.querySelector('.roth-ira-calculator'),
    startingBalance: parseFloat(document.querySelector('.sb').value),
    annualContributions: parseFloat(document.querySelector('.ac').value),
    age: parseFloat(document.querySelector('.age').value),
    retirementAge: parseFloat((document.querySelector('.retirement').value) - 1),
    rateOfReturn: parseFloat((document.querySelector('.ror').value) / 100),
    marginalTaxRate: parseFloat((document.querySelector('.mtr').value) / 100),
    rothTotal: document.querySelector('.roth-ira-total'),
    taxableSavingsTotal: document.querySelector('.taxable-savings-total')
  }
  return {
    getSelectors: () => {
      return selectors
    },
    resetValues: () => {
      selectors.startingBalance = parseFloat(document.querySelector('.sb').value)
      selectors.annualContributions = parseFloat(document.querySelector('.ac').value)
      selectors.retirementAge = parseFloat((document.querySelector('.retirement').value) - 1)
      selectors.age = parseFloat(document.querySelector('.age').value)
      selectors.rateOfReturn = parseFloat((document.querySelector('.ror').value) / 100)
      selectors.marginalTaxRate = parseFloat((document.querySelector('.mtr').value) / 100)
    },
    displayChart: (tcArr, tsArr, ytp) => {
      console.log(tcArr[tcArr.length - 1])
      for(let i = 0; i < tcArr.length; i++) {
        myChart.data.datasets[0].data[i] = tcArr[i]
        myChart.data.datasets[1].data[i] = tsArr[i]
        myChart.data.labels[i] = `Year ${i}`; 
      }
      if(myChart.data.labels.length > ytp) {
        this.labels
      }
      console.log(myChart.data.labels)

      myChart.update();   
    },
    displayTotals: (tcArr, tsArr) => {
      selectors.rothTotal.innerHTML = `<span class="results-label">Roth IRA Total</span>: ${RothUI.insertCommas(tcArr[tcArr.length - 1])}`
      selectors.taxableSavingsTotal.innerHTML = `<span class='results-label'>Traditional IRA Total</span>: ${RothUI.insertCommas(tsArr[tsArr.length -1 ])}`
    },
    insertCommas: (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showReportModal: () => {
      // Create Modal Report
    },
    createReport: () => {
      // Create Report for
    },
    createPaginationButtons: () => {
      // Create PaginationButtons
    },
    tablePagination: () => {
      // Handle Table Pagination
    },
    showCalculationError: () => {
      // Handle Calculation Errors
    },
    showInputError: () => {
      // Handle Input Errora
    } 
  }
})()