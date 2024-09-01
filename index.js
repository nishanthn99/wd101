let userForm = document.getElementById("user_form");

// Function to retrieve entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-input");
    if (entries) {
        try {
            entries = JSON.parse(entries);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            entries = [];
        }
    } else {
        entries = [];
    }
    return entries;
};
let userValues = retrieveEntries();
const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.terms ? 'True' : 'Flase'}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
        <thead>
            <th class="border 2px solid black px-4 py-2">Name</th>
            <th class="border 2px solid black px-4 py-2">Email</th>
            <th class="border 2px solid black px-4 py-2">Password</th>
            <th class="border 2px solid black px-4 py-2">Date of Birth</th>
            <th class="border 2px solid black px-4 py-2">Accepted Terms?</th>
        </thead>
        ${tableEntries}
    </table>`;
    let details = document.getElementById("userEntries");
    details.innerHTML = table;
};
const addlocal = (event) => {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let terms = document.getElementById('terms').value;

    let userValue = {
        name,
        email,
        password,
        dob,
        terms
    };

    userValues.push(userValue);
    const stringifiedUserValues = JSON.stringify(userValues);
    localStorage.setItem("user-input", stringifiedUserValues);
    displayEntries();
};
displayEntries();
userForm.addEventListener('submit', addlocal);
