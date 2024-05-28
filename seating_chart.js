document.addEventListener('DOMContentLoaded', function () {
    let seatingData = {};

    function renderSeatingChart(data) {
        const seatingChartDiv = document.getElementById('seating-chart');
        seatingChartDiv.innerHTML = ''; // Clear the current seating chart

        for (const [table, guests] of Object.entries(data)) {
            const tableDiv = document.createElement('div');
            tableDiv.classList.add('table');

            const tableHeader = document.createElement('h2');
            tableHeader.textContent = table;
            tableDiv.appendChild(tableHeader);

            const guestList = document.createElement('ul');
            guestList.classList.add('guest-list');

            guests.forEach((guest, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${guest}`;
                guestList.appendChild(listItem);
            });

            tableDiv.appendChild(guestList);
            seatingChartDiv.appendChild(tableDiv);
        }
    }

    function filterSeatingChart(query) {
        const filteredData = {};

        for (const [table, guests] of Object.entries(seatingData)) {
            if (guests.some(guest => guest.toLowerCase().includes(query.toLowerCase()))) {
                filteredData[table] = guests;
            }
        }

        renderSeatingChart(filteredData);
    }

    fetch('seating_chart.json')
        .then(response => response.json())
        .then(data => {
            seatingData = data;
            renderSeatingChart(data);
        })
        .catch(error => {
            console.error('Error loading seating chart:', error);
        });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        filterSeatingChart(query);
    });
});
