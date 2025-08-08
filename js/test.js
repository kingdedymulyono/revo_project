// DOM Elements
const buttons = document.querySelectorAll('.btn2');
const sendBtn = document.getElementById("sendBtn");
const btnf = document.getElementById("btnF");
const filterBox = document.getElementById("filterBox");
const filter = document.getElementById("filter");
const textInput = document.getElementById("textInput");
const deadlineInput = document.getElementById("deadlineInput");
const res = document.getElementById("res");

// State Variables
let listArray = [];
let nextId = 1;
let isFilterVisible = false;

// Initialize the app
const init = () => {
    // Add sample data
    listArray.push({
        id: nextId++,
        text: 'Default1',
        date: '2025-08-08',
        status: "Complete"
    });
    listArray.push({
        id: nextId++,
        text: 'Default2',
        date: '2025-06-06',
        status: "Pending"
    });
    listArray.push({
        id: nextId++,
        text: 'Default3',
        date: '2025-06-06',
        status: "Deadline"
    });

    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    updList('all');
    
    // Check deadlines
    checkDeadline();
};

// Set up all event listeners
const setupEventListeners = () => {
    sendBtn.addEventListener("click", sendData);
    btnf.addEventListener("click", toggleFilter);
    filter.addEventListener("change", handleFilterChange);
    res.addEventListener("click", handleTableClick);
};

// Toggle filter visibility
const toggleFilter = () => {
    isFilterVisible = !isFilterVisible;
    filterBox.style.display = isFilterVisible ? 'block' : 'none';
};

// Handle filter change
const handleFilterChange = () => {
    const fValue = filter.value;
    res.innerHTML = '';
    updList(fValue);
};

// Handle table click events (for delete buttons)
const handleTableClick = (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
        const id = parseInt(deleteBtn.dataset.id);
        deleteItem(id);
    }
};

// Check deadlines against current date
const checkDeadline = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    listArray.forEach(item => {
        if (item.status !== "Complete" && item.date < formattedDate) {
            item.status = "Deadline";
        }
    });
};

// Send new to-do item
const sendData = () => {
    const textValue = textInput.value.trim();
    const deadlineValue = deadlineInput.value;

    if (!textValue || !deadlineValue) {
        alert("Please fill in all fields");
        return;
    }

    listArray.push({
        id: nextId++,
        text: textValue,
        date: deadlineValue,
        status: "Pending"
    });

    // Reset and update
    textInput.value = '';
    deadlineInput.value = '';
    res.innerHTML = '';
    updList('all');
};

// Delete an item
const deleteItem = (id) => {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    const index = listArray.findIndex(item => item.id === id);
    if (index !== -1) {
        listArray.splice(index, 1);
        res.innerHTML = '';
        updList('all');
    }
};

// Get status color class
const statusColor = (status) => {
    const colors = {
        'Complete': 'bg-green-500',
        'Pending': 'bg-yellow-500',
        'Deadline': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
};

// Get status icon
const statusIcon = (status) => {
    const icons = {
        'Complete': 'check',
        'Pending': 'clock',
        'Deadline': 'x'
    };
    return icons[status] || 'question';
};

// Update the to-do list display
const updList = (filterValue) => {
    res.innerHTML = '';

    const filteredItems = filterValue === 'all' 
        ? listArray 
        : listArray.filter(item => item.status === filterValue);

    filteredItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="flex flex-column gap-4 rowflex items-center justify-center">
                    <input type="checkbox" ${item.status === 'Complete' ? 'checked' : ''}>
                    <p class="text-left text-sm">${item.text}</p>
                </div>
            </td>
            <td class="text-xs">${item.date}</td>
            <td>
                <button type="button" class="status ${statusColor(item.status)} p-2 text-white rounded-lg">
                    <i class="fa-solid fa-${statusIcon(item.status)}"></i>
                    <span>${item.status}</span>
                </button>
            </td>
            <td>
                <button 
                    type="button" 
                    class="delete-btn text-red-500 border duration-400 p-2 text-sm rounded-lg hover:bg-red-500 hover:text-white"
                    data-id="${item.id}">
                    Delete
                </button>
            </td>
        `;
        res.appendChild(row);
    });
};

// Initialize the application
document.addEventListener('DOMContentLoaded', init);