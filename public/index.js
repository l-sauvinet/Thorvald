function saveTableData() {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var tableData = [];

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var rowData = {
            name: cells[0].textContent,
            status: cells[1].getElementsByTagName('select')[0].value,
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

        var statusSelect = document.createElement('select');
        var statusOptions = ['À faire', 'En cours', 'Terminé'];
        statusOptions.forEach(function(option) {
            var statusOption = document.createElement('option');
            statusOption.textContent = option;
            statusSelect.appendChild(statusOption);
        });
        statusSelect.value = rowData.status;
        statusCell.appendChild(statusSelect);

        priorityCell.textContent = rowData.priority;

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', function() {
            var row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
            saveTableData();
        });
        actionCell.appendChild(deleteBtn);
    });
}

document.getElementById('addRowBtn').addEventListener('click', function() {
    var nameInput = document.getElementById('nameInput').value;
    var priorityInput = document.getElementById('priorityInput').value;

    if (nameInput && priorityInput) {
        var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();

        var nameCell = newRow.insertCell(0);
        var statusCell = newRow.insertCell(1);
        var priorityCell = newRow.insertCell(2);
        var actionCell = newRow.insertCell(3);

        nameCell.textContent = nameInput;

        var statusSelect = document.createElement('select');
        var statusOptions = ['À faire', 'En cours', 'Terminé'];
        statusOptions.forEach(function(option) {
            var statusOption = document.createElement('option');
            statusOption.textContent = option;
            statusSelect.appendChild(statusOption);
        });
        statusSelect.value = 'À faire';
        statusCell.appendChild(statusSelect);

        priorityCell.textContent = priorityInput;

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', function() {
            var row = this.parentNode.parentNode;
            row.parentNode.removeChild(row);
            saveTableData();
        });
        actionCell.appendChild(deleteBtn);

        saveTableData();
    }
});

document.getElementById('dataTable').addEventListener('change', function(event) {
    var target = event.target;
    if (target.tagName === 'SELECT') {
        var row = target.parentNode.parentNode;
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

    loadTableData();
});
