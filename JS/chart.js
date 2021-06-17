var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.elements.line.borderRadius = "180px";
const config = {
  data: {
    labels: [],
    datasets: [{
            type: 'bar',
            label: 'Roth IRA',
            data: [1, 5, 10, 12, 15, 18],
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderWidth: 2,
            tension: 0.2
        }, {
          type: 'bar',
          label: `Traditional IRA`,
          data: [1, 2, 4, 5, 6, 7, 8, 9],
          backgroundColor: 'rgba(51, 121, 1, 0.6)',
          borderWidth: 2,
          tension: 0.2
        }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          title: {
            display: true,
          },
          color: 'red'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          }
        }
    }
};
var myChart = new Chart(ctx, config)
myChart.options.plugins.legend.position = 'top';
myChart.options.plugins.legend.align = 'center';
