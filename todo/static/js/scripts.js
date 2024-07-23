document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const dueInput = document.getElementById('dueInput');
    const dateValue = dueInput.value;  // "2023-03-15T14:30" 形式の文字列


    const dateObj = new Date(dateValue);
    const specialDates = [
        { date: 1, month: 6, year: 2023 }
    ];


    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const monthYearLabel = document.getElementById('month-year');
    const calendarBody = document.querySelector('#calendar-table tbody');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    prevButton.addEventListener('click', showPreviousMonth);
    nextButton.addEventListener('click', showNextMonth);
    function updateCalendar(month, year) {
        calendarBody.innerHTML = "";
        const firstDay = (new Date(year, month)).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();
        monthYearLabel.innerHTML = monthNames[month] + ' ' + year;
        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement('td');
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement('td');
                    let cellText = document.createTextNode(date);
                    // 特定の日付をマークする
                    if (isSpecialDate(date, month, year)) {
                        cell.classList.add('special-date');
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }
            calendarBody.appendChild(row);
        }
    }
    function showPreviousMonth() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        updateCalendar(currentMonth, currentYear);
    }
    function showNextMonth() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        updateCalendar(currentMonth, currentYear);
    }
    function isSpecialDate(date, month, year) {
        return specialDates.some(specialDate => specialDate.date === date && specialDate.month === month && specialDate.year === year);
    }
    updateCalendar(currentMonth, currentYear);
});