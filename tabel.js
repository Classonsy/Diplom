document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Простая демонстрационная аутентификация 
            // (в реальной системе нужно реализовать проверку на сервере)
            if (username === 'admin' && password === 'admin') {
                // Сохраняем информацию о входе в localStorage
                localStorage.setItem('tabelLoggedIn', 'true');
                localStorage.setItem('tabelUser', username);
                
                // Перенаправляем на панель управления
                window.location.href = 'dashboard.html';
            } else {
                alert('Неверный логин или пароль. Используйте admin/admin для демо.');
            }
        });
    }
    
    // Проверка авторизации для защищенных страниц
    function checkAuth() {
        const protectedPages = [
            'dashboard.html', 
            'employees.html', 
            'timesheet.html', 
            'schedule.html', 
            'reports.html', 
            'settings.html'
        ];
        
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !localStorage.getItem('tabelLoggedIn')) {
            window.location.href = 'tabel.html';
        }
    }
    
    // Для всех страниц выполняем проверку авторизации
    checkAuth();
    
    // Настраиваем выход из системы
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('tabelLoggedIn');
            localStorage.removeItem('tabelUser');
            window.location.href = 'tabel.html';
        });
    }
    
    // Отображение имени пользователя
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        userDisplay.textContent = localStorage.getItem('tabelUser') || 'Пользователь';
    }
    
    // Обработка кнопок на странице сотрудников
    if (window.location.pathname.includes('employees.html')) {
        const employeeButtons = document.querySelectorAll('.btn-secondary');
        employeeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const employeeName = this.closest('tr').querySelector('td').textContent;
                alert(`Редактирование данных сотрудника: ${employeeName}`);
            });
        });
        
        const addEmployeeBtn = document.querySelector('.controls .btn-primary');
        if (addEmployeeBtn) {
            addEmployeeBtn.addEventListener('click', function() {
                alert('Открытие формы добавления нового сотрудника');
            });
        }
    }
    
    // Обработка кнопок на странице табеля учета
    if (window.location.pathname.includes('timesheet.html')) {
        const generateTimesheet = document.querySelector('.controls .btn-primary');
        if (generateTimesheet) {
            generateTimesheet.addEventListener('click', function() {
                alert('Формирование табеля учета рабочего времени');
            });
        }
    }
});