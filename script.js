document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('reset').addEventListener('click', resetTable);
document.getElementById('calculate').addEventListener('click', calculateGPA);




function deleteRow(curRow) {
    const row = curRow.closest("tr");
    row.parentNode.removeChild(row);
}

function addRow(){
    const tableBody = document.querySelector('#table tbody');
    const newRow = createRow();
    tableBody.appendChild(newRow);
    
    // Add event listener to the delete button
    newRow.querySelector('.delete-row').addEventListener('click', deleteRow);

}

function createRow(){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><input type="checkbox" class="course-check" checked></td>
                    <td> <input type="text" placeholder="Course #"></td>
                    <td>
                        <select class="grade-select">
                            <option value>--</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="D-">D-</option>
                            <option value="F">F</option>
                        </select>
                    </td>
                    <td><input type="number" class="credits-value" placeholder="Credits"></td>
                    <td><button class="delete" onclick="deleteRow(this)">x</button></td>
        `;
    return row;
}

var originalHTML = table.innerHTML
function resetTable() {
    table.innerHTML = originalHTML
    document.getElementById('total-gpa').value = '';
}

function calculateGPA() {
    const rows = document.querySelectorAll('#table tbody tr');
    let totalPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const checkbox = row.querySelector('.course-check');
        const grade = row.querySelector('.grade-select').value;
        const credits = parseFloat(row.querySelector('.credits-value').value);

        if (checkbox.checked && !isNaN(credits) && credits > 0) {
            const gradePoints = getGradePoints(grade);
            totalPoints += gradePoints * credits;
            totalCredits += credits;
        }
    });

    const gpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById('total-gpa').value = gpa;
}

function getText(){
    document.getElementById('total-gpa').value = 'test';
}

function getGradePoints(grade) {
    switch (grade) {
        case 'A+': return 4.0;
        case 'A': return 4.0;
        case 'A-': return 3.7;
        case 'B+': return 3.3;
        case 'B': return 3.0;
        case 'B-': return 2.7;
        case 'C+': return 2.3;
        case 'C': return 2.0;
        case 'C-': return 1.7;
        case 'D+': return 1.3;
        case 'D': return 1.0;
        case 'D-': return 0.7;
        case 'F': return 0.0;
        default: return 0.0;
    }
}
