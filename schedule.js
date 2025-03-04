document.addEventListener('DOMContentLoaded', function() {
    // Обработка переключения вкладок
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем класс active со всех кнопок
            tabBtns.forEach(b => b.classList.remove('active'));
            // Добавляем класс active к нажатой кнопке
            this.classList.add('active');
            
            // Скрываем все контенты вкладок
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Показываем выбранный контент
            const targetTab = this.dataset.tab;
            document.getElementById(targetTab).style.display = 'block';
        });
    });
    
    // Обработка кнопки добавления шаблона
    const addTemplateBtn = document.getElementById('add-template-btn');
    if (addTemplateBtn) {
        addTemplateBtn.addEventListener('click', function() {
            alert('Открыть форму создания нового шаблона графика');
        });
    }
    
    // Обработка кнопок редактирования
    const editScheduleBtns = document.querySelectorAll('.edit-schedule-btn');
    editScheduleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const scheduleName = this.closest('tr').querySelector('td').textContent;
            alert(`Редактирование графика: ${scheduleName}`);
        });
    });
    
    // Обработка кнопок клонирования
    const cloneScheduleBtns = document.querySelectorAll('.clone-schedule-btn');
    cloneScheduleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const scheduleName = this.closest('tr').querySelector('td').textContent;
            alert(`Клонирование графика: ${scheduleName}`);
        });
    });
    
    // Обработка кнопки показа графиков
    const showSchedulesBtn = document.getElementById('show-schedules-btn');
    if (showSchedulesBtn) {
        showSchedulesBtn.addEventListener('click', function() {
            alert('Загрузка графиков сотрудников...');
        });
    }
    
    // Обработка кнопки печати графиков
    const printSchedulesBtn = document.getElementById('print-schedules-btn');
    if (printSchedulesBtn) {
        printSchedulesBtn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // Загрузка и отображение календаря графиков (демо)
    loadScheduleCalendar();
});

function loadScheduleCalendar() {
    const calendarContainer = document.querySelector('.schedules-calendar');
    if (!calendarContainer) return;
    
    // Пример создания простого календаря (в реальном приложении здесь будет более сложная логика)
    let calendarHTML = `
        <div class="month-calendar">
            <h3>Май 2023</h3>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Сотрудник / Дата</th>
                        <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                        <th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
                        <th>...</th>
                        <th>Итого часов</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Иванов И.И.</td>
                        <td>8</td><td>8</td><td>В</td><td>В</td><td>8</td>
                        <td>8</td><td>8</td><td>8</td><td>8</td><td>8</td>
                        <td>...</td>
                        <td>168</td>
                    </tr>
                    <tr>
                        <td>Петрова А.С.</td>
                        <td>В</td><td>В</td><td>8</td><td>8</td><td>8</td>
                        <td>8</td><td>8</td><td>В</td><td>В</td><td>8</td>
                        <td>...</td>
                        <td>160</td>
                    </tr>
                    <tr>
                        <td>Сидоров П.А.</td>
                        <td>12</td><td>12</td><td>В</td><td>В</td><td>12</td>
                        <td>12</td><td>В</td><td>В</td><td>12</td><td>12</td>
                        <td>...</td>
                        <td>144</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    calendarContainer.innerHTML = calendarHTML;
}

