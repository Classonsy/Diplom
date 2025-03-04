document.addEventListener('DOMContentLoaded', function() {
    // Обработка переключения между разделами настроек
    const settingsLinks = document.querySelectorAll('.settings-menu a');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    settingsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс со всех ссылок
            settingsLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все секции
            settingsSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Показываем выбранную секцию
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        });
    });
    
    // Обработка сохранения общих настроек
    const generalSettingsForm = document.getElementById('general-settings-form');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Демонстрационное уведомление
            alert('Настройки успешно сохранены!');
        });
    }
    
    // Обработка добавления нового пользователя
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            // Демонстрация диалога добавления пользователя
            alert('Открыть диалог добавления нового пользователя');
        });
    }
});

