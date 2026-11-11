/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */
const clean = value =>
  value == null || value === '' || value === '------' || value === 'N/A' ? 'Not listed' : String(value);

const escapeHTML = value =>
  clean(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

const compliant = item =>
  item.inspection_results === 'Compliant - No Health Risk';

function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  /*html*/
  const groups = data.reduce((acc, item) => {
    const city = clean(item.city);

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(item);
    return acc;
  }, {});

  const sorted = Object.entries(groups).sort((a, b) =>
    b[1].length - a[1].length || a[0].localeCompare(b[0])
  );

  const sections = sorted.map(([city, items]) => {

    const compliantCount = items.filter(compliant).length;

    const itemHTML = [...items].sort((a, b) =>
      (b.inspection_date || '').localeCompare(a.inspection_date || '')
    )
    .map(item => `
      <li class="category-item">
        <span>
          <strong>${escapeHTML(item.name)}</strong>
          <small>${escapeHTML(item.category)}</small>
        </span>

        <span class="category-result">
          ${escapeHTML(item.inspection_results)}
        </span>
      </li>
    `).join('');
    
  return `
    <section class="category-section" aria-label="${escapeHTML(city)} inspections">

      <h3 class="category-header">
        ${escapeHTML(city)}

        <span>
          ${items.length} inspections · ${compliantCount} marked Compliant - No Health Risk
        </span>

      </h3>

      <ul class="category-items">
        ${itemHTML}
      </ul>
    </section>
  `;
  }).join('');

  return `
    <h2 class="view-title">Category View</h2>

    <p class="view-description">
      Compare the number of inspections and explicitly compliant results by city.
    </p>

    <p class="category-overview">
      ${sorted.length} cities or location labels · ${data.length} inspections
    </p>

    ${sections}
  `;
}

export default showCategories;