const toggleBtn = document.getElementById('toggleUserList');
const userListCollapse = document.getElementById('userListCollapse');
const toggleText = document.getElementById('toggleText');
const toggleIcon = document.getElementById('toggleIcon');

const API_URL = 'http://localhost:5000/users';

toggleBtn.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(userListCollapse, {
        toggle: true
    });

    if (userListCollapse.classList.contains('show')) {
        toggleText.innerText = 'Show Users';
        toggleIcon.innerText = '👁️‍🗨️'; // Change icon
    } else {
        toggleText.innerText = 'Hide Users';
        toggleIcon.innerText = '👁️'; // Change icon
    }
});

document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) });
    loadUsers();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('userForm').reset();
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    const email = document.getElementById('searchEmail').value;
    if (!email) {
        document.getElementById('searchResult').innerHTML = `<div class="alert alert-warning">Please enter an email</div>`;
        return;
    }
    try {
        const res = await fetch(`/users/email/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error('User not found');
        const user = await res.json();
        document.getElementById('searchResult').innerHTML = `
            <div class="alert alert-info">
                <strong>Name:</strong> ${user.firstName} ${user.lastName} <br>
                <strong>Email:</strong> ${user.email} <br>
                <strong>Phone:</strong> ${user.phone}
            </div>
        `;
    } catch (err) {
        document.getElementById('searchResult').innerHTML = `<div class="alert alert-warning">User not found</div>`;
    }
});



async function loadUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = '';

    users.forEach(user => {
        usersTable.innerHTML += `
            <tr>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button onclick="editUser('${user._id}')" class="btn btn-primary me-2">Edit</button>
                    <button onclick="deleteUser('${user._id}')" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Function to get user by ID and populate the update form
async function editUser(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        
        const user = await res.json();
        
        // Populate update form
        document.getElementById('updateUserId').value = user._id;
        document.getElementById('updateFirstName').value = user.firstName;
        document.getElementById('updateLastName').value = user.lastName;
        document.getElementById('updateEmail').value = user.email;
        document.getElementById('updatePhone').value = user.phone;
        
        // Show update form
        document.getElementById('updateFormContainer').classList.remove('d-none');
        
        // Scroll to the update form
        document.getElementById('updateFormContainer').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to load user details');
    }
}

// Event listener for update form submission
document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userId = document.getElementById('updateUserId').value;
    const updatedUser = {
        firstName: document.getElementById('updateFirstName').value,
        lastName: document.getElementById('updateLastName').value,
        email: document.getElementById('updateEmail').value,
        phone: document.getElementById('updatePhone').value
    };
    
    try {
        const res = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });
        
        if (!res.ok) throw new Error('Failed to update user');
        
        // Hide update form
        document.getElementById('updateFormContainer').classList.add('d-none');
        
        // Reload users to reflect the changes
        loadUsers();
        
        alert('User updated successfully!');
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user');
    }
});

// Cancel update button
document.getElementById('cancelUpdateBtn').addEventListener('click', () => {
    document.getElementById('updateFormContainer').classList.add('d-none');
});

async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadUsers();
}

window.onload = loadUsers;
