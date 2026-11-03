/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */
function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  /*html*/
  return `
                <h2 class="view-title">📂 Category View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Category View</h3>
                    <p><strong>Your task:</strong> Group the data by categories to show relationships</p>
                    <p><strong>Good for:</strong> Understanding patterns, finding similar items, exploring by type</p>
                    <p><strong>Consider:</strong> Group by type of business? City? Inspection result? What tells the best story?</p>
                    <p><strong>Types of business in this data:</strong> ${[
                      ...new Set(data.map((item) => item.category)),
                    ].join(", ")}</p>
                </div>
            `;
}

export default showCategories;