
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
const missing = value =>
    value == null || value === '' || value === '------' || value === 'N/A';

const display = value =>
    missing(value) ? 'Not listed' : String(value);

const escapeHTML = value =>
  display(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));

const dateLabel = value => {
  if (missing(value)) return 'Not listed';

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? 'Not listed'
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
};

function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  /*html*/ 

    const inspections = [...data].sort((a, b) =>
        (b.inspection_date || '').localeCompare(a.inspection_date || '')
    );

    const rows = inspections.map(item => `
        <tr>
        <th scope="row">${escapeHTML(item.name)}</th>
        <td>${escapeHTML(item.city)}</td>
        <td>${escapeHTML(item.category)}</td>
        <td>${escapeHTML(dateLabel(item.inspection_date))}</td>
        <td>${escapeHTML(item.inspection_type)}</td>
        <td>${escapeHTML(item.inspection_results)}</td>
        </tr>
    `).join('');

    return `
        <h2 class="view-title">Table View</h2>

        <p class="view-description">
            For health inspectors: scan individual inspections, newest first.
        </p>

        <div class="table-scroll"
            role="region"
            aria-label="Inspection records table"
            tabindex="0">

            <table class="restaurant-table">
                <caption>
                    ${data.length} Prince George's County food safety inspection records, newest first
                </caption>

                <thead>
                <tr>
                    <th scope="col">Business</th>
                    <th scope="col">City</th>
                    <th scope="col">Business type</th>
                    <th scope="col">Inspection date</th>
                    <th scope="col">Inspection type</th>
                    <th scope="col">Result</th>
                </tr>
                </thead>

                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

export default showTable;