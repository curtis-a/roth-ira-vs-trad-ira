const RothUI = (function(){
  const selectors = {
    form: document.querySelector('.roth-ira-calculator'),
    startingBalance: parseFloat(document.querySelector('.sb').value),
    annualContributions: parseFloat(document.querySelector('.ac').value),
    age: parseFloat(document.querySelector('.age').value),
    retirementAge: parseFloat((document.querySelector('.retirement').value) - 1),
    rateOfReturn: parseFloat((document.querySelector('.ror').value) / 100),
    marginalTaxRate: parseFloat((document.querySelector('.mtr').value) / 100),
    marginalTaxRateInput: document.querySelector('.mtr'),
    retirementTaxRate: parseFloat(document.querySelector('.rtr').value / 100),
    retirementTaxRateInput: document.querySelector('.rtr'),
    rothTotal: document.querySelector('.roth-ira-total'),
    taxableSavingsTotal: document.querySelector('.taxable-savings-total'),
    inputs: Array.from(document.querySelectorAll('.calc-input')),
    tooltips: Array.from(document.querySelectorAll('.tooltip-container')),
    barChartBtn: document.querySelector('.barChart-btn'),
    advSettings: document.getElementById('adv-settings'),
    advSettingsContainer: document.getElementById('advanced-settings__container'),
    maximiseContributionsCheck: document.getElementById('maximise-contributions'),
    summaryContainer: document.getElementById('tcalc__summary-container')
  }
  
  return {
    getSelectors: () => {
      return selectors
    },
    checkErrors: () => {
      const floatedInputArr = [];
      selectors.inputs.forEach(i => {
        i.parentElement.classList.remove('input-error')
        floatedInputArr.push(parseFloat(i.value))
      });

      // Error Checking
      for(let i = 0; i < floatedInputArr.length - 1; i++) {
        if(floatedInputArr[i] < 0) {
          RothUI.inputError(selectors.inputs[i])
          return true
        }
      }
      if((floatedInputArr[3] - floatedInputArr[2]) <= 0) {
        RothUI.inputError(selectors.inputs[2]);
        RothUI.inputError(selectors.inputs[3]);
        return true
      }
      if(floatedInputArr[5] > 37) {
        RothUI.inputError(selectors.inputs[5]);
        return true
      }
      if(floatedInputArr[4] > 20) {
        RothUI.inputError(selectors.inputs[4])
    
      };

      if(floatedInputArr[1] > 6000) {
        RothUI.inputError(selectors.inputs[1])
        return true
      };

      App.calculateRothIRA()
    },
    inputError: (x) => {
      x.parentElement.classList.add('input-error');
    },
    updateRetirementTaxRate: (e) => {
      if(selectors.marginalTaxRateInput.value < selectors.retirementTaxRateInput.value) {
        selectors.retirementTaxRateInput.value = selectors.marginalTaxRateInput.value 
      }
    },
    resetValues: () => {
      selectors.startingBalance = parseFloat(document.querySelector('.sb').value)
      selectors.annualContributions = parseFloat(document.querySelector('.ac').value)
      selectors.retirementAge = parseFloat((document.querySelector('.retirement').value) - 1)
      selectors.age = parseFloat(document.querySelector('.age').value)
      selectors.rateOfReturn = parseFloat((document.querySelector('.ror').value) / 100)
      selectors.marginalTaxRate = parseFloat((document.querySelector('.mtr').value) / 100)
    },
    displayToolTip: (e) => {
      if(!e.target.classList.contains('tooltip-icon')) return
      e.target.nextElementSibling.classList.add('tooltip-displayed')
      e.target.nextElementSibling.addEventListener('click', RothUI.closeToolTip)
    },
    closeToolTip: (e) => {
      if(!e.target.classList.contains('tooltip-close')) return;
      if(e.target.classList.contains('tooltip-close')) e.target.parentElement.classList.remove('tooltip-displayed')
    },
    displayChart: (tcArr, tsArr, age) => {
      const chartData = myChart.data.datasets
      if(chartData[1].type === 'bar') RothUI.displayBarChart(tcArr, tsArr)
      if(chartData[1].type === 'line') RothUI.displayLineChart(tcArr, tsArr, age)
    },
    displayLineChart: (tcArr, tsArr, age) => {
      myChart.options.scales.y.max = Math.round((tcArr[tcArr.length - 1]) + (tcArr[tcArr.length - 1] * 0.15));
      RothUI.resetChartLabels()
      for(let i = 0; i < tcArr.length; i++) {
        myChart.data.datasets[0].data[i] = tcArr[i]
        myChart.data.datasets[1].data[i] = tsArr[i]
        i === 0 ? myChart.data.labels[i] = age : myChart.data.labels[i] = `Age - ${age + i}`
      }      
      myChart.update();   
    },
    displayBarChart: (tcArr, tsArr) => {
      RothUI.resetChartLabels()
      RothUI.createChartLabels()
      RothUI.resetChartData()
      myChart.options.scales.y.max = Math.round((tcArr[tcArr.length - 1]) + (tcArr[tcArr.length - 1] * 0.15));
      RothUI.barChartData(myChart.data.datasets, tcArr, tsArr)
      myChart.options.scales.x.ticks.align = 'center';
      myChart.update()
    },
    createChartLabels: () => {
      myChart.data.labels[0] = 'Total Roth Ira'
      myChart.data.labels[1] = 'Total Traditional Ira'
    },
    resetChartLabels: () => myChart.data.labels = [],
    resetChartData: () => {
      myChart.data.datasets[0].data = []
      myChart.data.datasets[1].data = []
    },
    barChartData: (chartData, tcArr, tsArr) => {
      console.log(chartData)
      chartData[1].data[1] = tsArr[tsArr.length -1]
      chartData[0].data[0] = tcArr[tcArr.length - 1]
      console.log(chartData[1].data)
    },
    changeChartType: (tcArr, tsArr, age) => {
      const chartData = myChart.data.datasets
      if(chartData[1].type !== 'bar') {
        chartData[1].type = 'bar'
        chartData[0].type = 'bar'
        document.querySelector('.change-chart-type').innerHTML = 'View After Tax Comparison'
        RothUI.displayBarChart(tcArr, tsArr)
      } 
      else {
        chartData[1].type = 'line'
        chartData[0].type = 'line'
        document.querySelector('.change-chart-type').innerHTML = 'View Total at Retirement'
        RothUI.displayLineChart(tcArr, tsArr, age)
      }
    },
    insertCommas: (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showReportModal: () => {
      // Create Modal Report
    },
    displayLoader: () => {
      const loaderAnim = document.getElementById('tax-calc-loader');
      loaderAnim.style.display = 'block';
      loaderAnim.style.opacity = 1;
      loaderAnim.style.transition = 'opacity .2s';
      setTimeout(()=> {
        loaderAnim.style.opacity = 0;
        loaderAnim.style.transition = 'all .2s';
        loaderAnim.style.display = 'none';
      },1500)
    },
    displaySummary: (tcArr, tsArr, ytp, tc) => {
      selectors.summaryContainer.innerHTML = `
      <h2 class="tcalc-summary">Summary</h2>
      <p >Over the course of your contributions will be <span class="accent-color">$${RothUI.numberWithCommas(parseFloat(tc))}</span> (including your starting balance). <br></br>
      Given the expected rate of return on your investments we estimate that you could have <span class="accent-color">$${RothUI.numberWithCommas(parseFloat(tcArr[tcArr.length - 1]))}</span> in your <span class="bold-text">Roth IRA</span>, and <span class="accent-color">$${RothUI.numberWithCommas(parseFloat(tsArr[tsArr.length - 1]))}</span> in your <span class="bold-text">Traditional IRA</span>. This will occur over the ${ytp} years of payments on the account.
      `
      if(tcArr[tcArr.length - 1] > tsArr[tsArr.length - 1]) {
        selectors.summaryContainer.innerHTML += `
        <br>
        This means that your <span class="bold-text">Roth IRA</span> could be worth <span class="accent-color">$${RothUI.numberWithCommas(parseFloat(tcArr[tcArr.length - 1] - tsArr[tsArr.length - 1]))}</span> more than your <span class="bold-text">Traditional IRA</span> at the point of retirement</p>
        `
      }
    },
    numberWithCommas: (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  }
})()