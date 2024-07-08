document.addEventListener("DOMContentLoaded", function() {
    loadTableData();
    filterTable(); // Filtrer les données au chargement de la page
});

function saveTableData() {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var tableData = [];

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var rowData = {
            name: cells[0].textContent,
            status: cells[1].querySelector('select').value,
            priority: cells[2].textContent
        };
        tableData.push(rowData);
    }

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTableData() {
    var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    table.innerHTML = '';

    tableData.forEach(function(rowData) {
        var newRow = table.insertRow();

        var nameCell = newRow.insertCell(0);
        var statusCell = newRow.insertCell(1);
        var priorityCell = newRow.insertCell(2);
        var actionCell = newRow.insertCell(3);

        nameCell.textContent = rowData.name;

        var statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';

        var statusBadge = document.createElement('span');
        statusBadge.className = 'status-badge';
        switch (rowData.status) {
            case 'A_faire':
                statusBadge.classList.add('status-a-faire');
                break;
            case 'En_cours':
                statusBadge.classList.add('status-en-cours');
                break;
            case 'Termine':
                statusBadge.classList.add('status-termine');
                break;
            default:
                statusBadge.classList.add('status-a-faire');
                break;
        }
        statusContainer.appendChild(statusBadge);

        var statusSelect = document.createElement('select');
        var statusOptions = ['A_faire', 'En_cours', 'Termine'];
        statusOptions.forEach(function(option) {
            var statusOption = document.createElement('option');
            statusOption.textContent = option.replace('_', ' ');
            statusOption.value = option;
            if (option === rowData.status) {
                statusOption.selected = true;
                updateStatusBadge(statusBadge, option);
            }
            statusSelect.appendChild(statusOption);
        });

        statusSelect.addEventListener('change', function() {
            updateStatusBadge(statusBadge, this.value);
            saveTableData();
        });

        statusContainer.appendChild(statusSelect);
        statusCell.appendChild(statusContainer);

        priorityCell.textContent = rowData.priority;

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = '<img class="delete-icon" src="./img/trash.svg" alt="Supprimer" />'; // Utilisation de l'image SVG pour la suppression avec une classe CSS
        deleteBtn.addEventListener('click', function() {
            var row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
            saveTableData();
        });
        actionCell.appendChild(deleteBtn);
    });

    sortTableByPriority();
}

function addRowToTable(rowData) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const statusCell = newRow.insertCell(1);
    const priorityCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    nameCell.textContent = rowData.name;

    const statusContainer = document.createElement('div');
    statusContainer.className = 'status-container';

    const statusBadge = document.createElement('span');
    statusBadge.className = 'status-badge';
    updateStatusBadge(statusBadge, rowData.status);
    statusContainer.appendChild(statusBadge);

    const statusSelect = document.createElement('select');
    const statusOptions = ['A_faire', 'En_cours', 'Termine'];
    statusOptions.forEach(option => {
        const statusOption = document.createElement('option');
        statusOption.textContent = option.replace('_', ' ');
        statusOption.value = option;
        if (option === rowData.status) {
            statusOption.selected = true;
            updateStatusBadge(statusBadge, option);
        }
        statusSelect.appendChild(statusOption);
    });

    statusSelect.addEventListener('change', function() {
        updateStatusBadge(statusBadge, this.value);
        saveTableData();
    });

    statusContainer.appendChild(statusSelect);
    statusCell.appendChild(statusContainer);

    priorityCell.textContent = rowData.priority;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = '<img class="delete-icon" src="./img/trash.svg" alt="Supprimer" />'; // Utilisation de l'image SVG pour la suppression avec une classe CSS
    deleteBtn.addEventListener('click', function() {
        const row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
        saveTableData();
    });
    actionCell.appendChild(deleteBtn);

    saveTableData();
    sortTableByPriority();
}

document.getElementById('addRowBtn').addEventListener('click', function() {
    var nameInput = document.getElementById('nameInput').value;
    var priorityInput = document.getElementById('priorityInput').value;

    if (nameInput && priorityInput) {
        const rowData = {
            name: nameInput,
            status: 'A_faire', // Statut par défaut lors de l'ajout d'une nouvelle tâche
            priority: priorityInput
        };
        addRowToTable(rowData);
    }
});

function updateStatusBadge(statusBadge, status) {
    statusBadge.className = 'status-badge';
    switch (status) {
        case 'A_faire':
            statusBadge.classList.add('status-a-faire');
            break;
        case 'En_cours':
            statusBadge.classList.add('status-en-cours');
            break;
        case 'Termine':
            statusBadge.classList.add('status-termine');
            break;
        default:
            statusBadge.classList.add('status-a-faire');
            break;
    }
}

document.getElementById('dataTable').addEventListener('change', function(event) {
    var target = event.target;
    if (target.tagName === 'SELECT') {
        var statusBadge = target.parentNode.querySelector('.status-badge');
        updateStatusBadge(statusBadge, target.value);
        saveTableData();
    }
});

function toggleMenu() {
    var menuContent = document.querySelector(".menu_content");
    var toggleMenuBtn = document.getElementById("toggleMenuBtn");
    var tableContainer = document.getElementById("tableContainer");
    var formContainer = document.getElementById("formContainer");

    if (menuContent.classList.contains("closed")) {
        menuContent.classList.remove("closed");
        toggleMenuBtn.classList.add("rotate");
        toggleMenuBtn.style.left = '290px';
        tableContainer.classList.remove("menu-closed");
        tableContainer.classList.add("menu-open");
        formContainer.classList.remove("menu-closed");
        formContainer.classList.add("menu-open");
    } else {
        menuContent.classList.add("closed");
        toggleMenuBtn.classList.remove("rotate");
        toggleMenuBtn.style.left = '0';
        tableContainer.classList.remove("menu-open");
        tableContainer.classList.add("menu-closed");
        formContainer.classList.remove("menu-open");
        formContainer.classList.add("menu-closed");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var menuContent = document.querySelector(".menu_content");
    var toggleMenuBtn = document.getElementById("toggleMenuBtn");
    var tableContainer = document.getElementById("tableContainer");
    var formContainer = document.getElementById("formContainer");

    menuContent.classList.remove("closed");
    toggleMenuBtn.classList.add("rotate");
    toggleMenuBtn.style.left = '290px';
    tableContainer.classList.add("menu-open");
    formContainer.classList.add("menu-open");

    loadTableData(); // Charger les données du tableau au chargement de la page
    filterTable(); // Appliquer les filtres sur les données chargées
});

function filterTable() {
    const stateFilter = document.getElementById('state').value;
    const importanceFilter = document.getElementById('importance').value;
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const statusSelect = rows[i].getElementsByTagName('td')[1].getElementsByTagName('select')[0];
        const stateCell = statusSelect ? statusSelect.value : '';
        const importanceCell = rows[i].getElementsByTagName('td')[2].textContent.trim().toLowerCase();
        
        let stateMatch = (stateFilter === 'none' || stateCell.toLowerCase() === stateFilter.toLowerCase());
        let importanceMatch = (importanceFilter === 'none' || importanceCell === importanceFilter.toLowerCase());

        if (stateMatch && importanceMatch) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

document.getElementById('state').addEventListener('change', filterTable);
document.getElementById('importance').addEventListener('change', filterTable);

// Charger et filtrer les données au chargement de la page
