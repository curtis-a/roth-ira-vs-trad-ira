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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            tension: 0.2
        }, {
          type: 'line',
          label: `Traditional IRA INSERT CALLBACK`,
          data: [1, 2, 4, 5, 6, 7, 8, 9],
          backgroundColor: 'rgba(255, 159, 64, 0.4)'
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
              beginAtZero: false,
            }
        }
    }
});

myChart.options.plugins.legend.position = 'right';