document.addEventListener('DOMContentLoaded', function() {
    // Обработка переключения типа отчета
    const reportTypeSelect = document.getElementById('report-type');
    const reportPeriodSelect = document.getElementById('report-period');
    const dateRangeContainer = document.querySelector('.date-range');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const exportReportBtn = document.getElementById('export-report-btn');
    const printReportBtn = document.getElementById('print-report-btn');
    
    // Показывать/скрывать выбор произвольного периода
    reportPeriodSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            dateRangeContainer.style.display = 'block';
        } else {
            dateRangeContainer.style.display = 'none';
        }
    });
    
    // Генерация отчета
    generateReportBtn.addEventListener('click', function() {
        const reportType = reportTypeSelect.value;
        const reportPeriod = reportPeriodSelect.value;
        
        // Простое уведомление о действии
        alert(`Генерируется отчет: ${reportType} за период: ${reportPeriod}`);
        
        // В реальном приложении здесь будет запрос к серверу для получения данных отчета
    });
    
    // Экспорт отчета
    exportReportBtn.addEventListener('click', function() {
        alert('Отчет экспортируется в Excel...');
        // Демонстрационное уведомление, в реальном приложении здесь будет логика экспорта
    });
    
    // Печать отчета
    printReportBtn.addEventListener('click', function() {
        window.print();
    });
});

