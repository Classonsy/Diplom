document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к секциям при клике на навигацию
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Check if the link points to an internal section
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Подсветка текущего раздела при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 60) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Создание интерактивной диаграммы структуры данных (упрощенно)
    const dbEntities = {
        'Справочники': 5,
        'Документы': 8,
        'Регистры': 4
    };
    
    // Можно добавить визуализацию данных с помощью простой диаграммы
    // (в реальном проекте лучше использовать библиотеку типа Chart.js)
    
    // Добавление кнопки для печати документации
    const header = document.querySelector('header');
    if (header) {
        const printButton = document.createElement('button');
        printButton.textContent = 'Печать документации';
        printButton.classList.add('print-button');
        printButton.style.cssText = `
            float: right;
            padding: 8px 15px;
            background-color: #d22;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        header.appendChild(printButton);
        
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
});