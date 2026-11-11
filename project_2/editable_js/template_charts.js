/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */
const valid = value =>
  value != null &&
  value !== '' &&
  value !== '------' &&
  value !== 'N/A';

// Count how many records belong to each group.
const countBy = (data, field) =>
  data.reduce((counts, item) => {
    const key = valid(item[field])
      ? String(item[field])
      : 'Not listed';

    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

// Prepare the data for both charts.
function chartData(data) {
  const categories = Object.entries(
    countBy(data, 'category')
  ).sort((a, b) => b[1] - a[1]);

  const results = Object.entries(
    countBy(data, 'inspection_results')
  ).sort((a, b) => b[1] - a[1]);

  return { categories, results };
}

// Create a short description of each chart.
function summary(entries, total) {
  if (!entries.length) {
    return 'No inspection records are available.';
  }

  const [label, count] = entries[0];

  return `The largest group is ${label}, with
    ${count} of ${total} inspection records.`;
}

// Provide exact chart values in an accessible table.
function accessibleTable(entries, caption) {
  const rows = entries.map(([label, count]) => `
    <tr>
      <th scope="row">${escapeHTML(label)}</th>
      <td>${count}</td>
    </tr>
  `).join('');

  return `
    <details class="chart-data">
      <summary>View chart numbers as a table</summary>
        <table class="restaurant-table">
          <caption>${caption}</caption>

          <thead>
            <tr>
              <th scope="col">Group</th>
              <th scope="col">Inspections</th>
            </tr>
          </thead>

          <tbody>${rows}</tbody>
        </table>
    </details>
  `;
}

function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.
  /*html*/
    const { categories, results } = chartData(data);

  return `
    <h2 class="view-title">Charts View</h2>

    <p class="view-description">
      Compare business types and inspection outcomes
      across ${data.length} records.
    </p>

    <div class="charts-grid">

      <figure class="chart-figure">
        <h3>Inspections by business type</h3>

        <div class="chart-canvas">
          <canvas id="chart-one"
                  role="img"
                  aria-label="Bar chart of inspections
                  by business type">
          </canvas>
        </div>

        <figcaption class="chart-summary">
          ${escapeHTML(summary(categories, data.length))}
        </figcaption>

        ${accessibleTable(
          categories,
          'Inspections by business type'
        )}
      </figure>

      <figure class="chart-figure">
        <h3>Distribution of inspection results</h3>

        <div class="chart-canvas">
          <canvas id="chart-two"
                  role="img"
                  aria-label="Doughnut chart of
                  inspection results">
          </canvas>
        </div>

        <figcaption class="chart-summary">
          ${escapeHTML(summary(results, data.length))}
          Missing results are labeled "Not listed".
        </figcaption>

        ${accessibleTable(
          results,
          'Inspections by recorded result'
        )}
      </figure>

    </div>
  `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelectorAll('.chart-canvas').forEach(element => {
      element.innerHTML = '<p class="error">Chart.js could not load.</p>';
    });
    return;
  }

  // TODO 1: Reshape your data for the first chart.
  // Chart.js doesn't take your array of records.
  // It wants a list of labels and a matching list of numbers.
  // Example: count inspections by type of business.
  //
  //   const counts = {};
  //   data.forEach((item) => {
  //     counts[item.category] = (counts[item.category] || 0) + 1;
  //   });
  //   const labels = Object.keys(counts);
  //   const numbers = Object.values(counts);

  // TODO 2: Draw the first chart into <canvas id="chart-one">.
  // Every chart needs a title, and every axis needs a label.
  //
  //   new Chart(document.querySelector('#chart-one'), {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{ label: 'Number of inspections', data: numbers }]
  //     },
  //     options: {
  //       plugins: { title: { display: true, text: 'Inspections by type of business' } },
  //       scales: {
  //         x: { title: { display: true, text: 'Type of business' } },
  //         y: { title: { display: true, text: 'Inspections' }, beginAtZero: true }
  //       }
  //     }
  //   });

  // TODO 3: Reshape your data again, and draw a second chart of a DIFFERENT type
  // (pie, line, scatter...) into <canvas id="chart-two">, answering a different question.
  // Ideas: inspection results as a pie, inspections per month as a line,
  // or how many "Out of Compliance" checks each type of business averages.
  const { categories, results } = chartData(data);

  // Colors for the doughnut chart.
  const palette = [
    '#176b8a',
    '#e1a342',
    '#438c79',
    '#b96568',
    '#7b76a8',
    '#5b8198',
    '#a16b46',
    '#8d9c56',
    '#677887'
  ];

  // CHART 1: Bar chart
  new Chart(document.getElementById('chart-one'), {
    type: 'bar',

    data: {
      labels: categories.map(([name]) => name),

      datasets: [{
        label: 'Number of inspections',
        data: categories.map(([, count]) => count),
        backgroundColor: '#176b8a'
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Inspections by business type'
        },
        legend: {
          display: false
        }
      },

      scales: {
        x: {
          title: {
            display: true,
            text: 'Business type'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          title: {
            display: true,
            text: 'Number of inspections'
          }
        }
      }
    }
  });

  // CHART 2: Doughnut chart
  new Chart(document.getElementById('chart-two'), {
    type: 'doughnut',

    data: {
      labels: results.map(([name]) => name),

      datasets: [{
        label: 'Inspections',
        data: results.map(([, count]) => count),

        backgroundColor: results.map(
          (_, index) => palette[index % palette.length]
        )
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Share of inspections by recorded result'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

export { showCharts, drawCharts };
