
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  /*html*/ 
  return `
                <h2 class="view-title">📊 Table View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Table View</h3>
                    <p><strong>Your task:</strong> Display the data as a real HTML table, with header cells and a caption</p>
                    <p><strong>Good for:</strong> Scanning specific data points, comparing values, finding specific information</p>
                    <p><strong>Consider:</strong> Which columns are most important? How can you make scanning easy?</p>
                    <p><strong>Data available:</strong> ${data.length} items loaded</p>
                </div>
            `;
}

export default showTable;