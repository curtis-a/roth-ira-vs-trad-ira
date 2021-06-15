var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.elements.line.fill = true;
Chart.defaults.elements.line.borderRadius = "180px";
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Roth IRA',
            data: [1, 5, 10, 12, 15, 18],
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderWidth: 2,
            tension: 0.2
        }, {
          type: 'line',
          label: `Traditional IRA`,
          data: [1, 2, 4, 5, 6, 7, 8, 9],
          backgroundColor: 'rgba(51, 121, 1, 0.6)',
          borderWidth: 2,
          tension: 0.2
        }]
    },
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
          }
        }
      },
      responsive: true,
      maintaimAspectRation: false,
        scales: {
            y: {
              beginAtZero: true,
            }
        }
    }
});

myChart.options.plugins.legend.position = 'right';