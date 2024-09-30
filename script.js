
// Class roll number arrays
const classRollNumbers = {
    "III AIML - A": Array.from({ length: 60 }, (_, i) => (i + 1).toString()).concat(["LE 1", "LE 2", "LE 3", "LE 4", "LE 5", "LE 6", "LE 7", "LE 8"]),
    "III AIML - B": Array.from({ length: 39 }, (_, i) => (i + 61).toString()).concat(["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "LE 1", "LE 2", "LE 3", "LE 4", "LE 5"]),
    "III AI DS": Array.from({ length: 53 }, (_, i) => (i + 1).toString()).concat(["LE 1", "LE 2", "LE 3", "LE 4", "LE 5"]),
    "III CS": Array.from({ length: 51 }, (_, i) => (i + 1).toString()).concat(["LE 1", "LE 2", "LE 3", "LE 4", "LE 5", "LE 6"]),
    "III CSE": Array.from({ length: 60 }, (_, i) => (i + 1).toString()).concat(["LE 1", "LE 2", "LE 3", "LE 4", "LE 5", "LE 6", "LE 7", "LE 8", "LE 9"])
};

// Automatically set today's date
document.getElementById('date').value = new Date().toISOString().slice(0, 10);
recommendClass();

// Recommend class based on the day
function recommendClass() {
    const dayOfWeek = new Date(document.getElementById('date').value).getDay();
    const classDropdown = document.getElementById('class');
    classDropdown.innerHTML = "";  // Clear previous options

    if (dayOfWeek >= 1 && dayOfWeek <= 3) { // Monday to Wednesday
        classDropdown.innerHTML = `
                    <option value="III AIML - A">III AIML - A</option>
                    <option value="III AIML - B">III AIML - B</option>
                    <option value="III AI DS">III AI DS</option>
                `;
    } else if (dayOfWeek >= 4 && dayOfWeek <= 5) { // Thursday and Friday
        classDropdown.innerHTML = `
                    <option value="III CS">III CS</option>
                    <option value="III CSE">III CSE</option>
                `;
    }
    displayRollNumbers(); // Update roll numbers based on selected class
}

// Display roll numbers based on selected class
function displayRollNumbers() {
    const selectedClass = document.getElementById('class').value;
    const rollNumbers = classRollNumbers[selectedClass];
    const checkboxContainer = document.getElementById('checkbox-container');
    checkboxContainer.innerHTML = ""; // Clear previous checkboxes

    rollNumbers.forEach(roll => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" id="roll-${roll}"> ${roll}`;
        checkboxContainer.appendChild(label);
    });
}

// Generate formatted attendance based on user input
function generateAttendance() {
    const date = document.getElementById('date').value;
    const selectedClass = document.getElementById('class').value;
    const faculty = document.getElementById('faculty').value;
    const period = document.getElementById('period').value;
    const topics = document.getElementById('topics').value;

    // Collect absentees
    const rollNumbers = classRollNumbers[selectedClass];
    const absentees = [];
    rollNumbers.forEach(roll => {
        const checkbox = document.getElementById(`roll-${roll}`);
        if (!checkbox.checked) {
            absentees.push(roll);
        }
    });

    const presentCount = rollNumbers.length - absentees.length;
    const absenteesList = absentees.length ? absentees.join(',') : 'None';

    const formattedAttendance =
        `Date: ${date}
Class: ${selectedClass}
Faculty: ${faculty}
Period: ${period}
Topic covered: ${topics}
No of students present: ${presentCount}
Absentees: ${absenteesList}`;

    document.getElementById('result').textContent = formattedAttendance;
}
