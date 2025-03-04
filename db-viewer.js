document.addEventListener('DOMContentLoaded', function() {
    const dbVisualization = document.getElementById('db-visualization');
    const entityTypeSelect = document.getElementById('entity-type');
    const searchInput = document.getElementById('search-input');
    
    // Загрузка структуры базы данных из файла
    fetch('/1C_database_structure.txt')
        .then(response => response.text())
        .then(text => {
            const dbStructure = parseDbStructure(text);
            renderDbStructure(dbStructure);
            
            // Обработчики событий для фильтрации
            entityTypeSelect.addEventListener('change', () => {
                filterDbEntities();
            });
            
            searchInput.addEventListener('input', () => {
                filterDbEntities();
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке структуры БД:', error);
            dbVisualization.innerHTML = '<div class="error">Ошибка загрузки структуры базы данных</div>';
        });
    
    // Парсинг текстового описания структуры БД в объекты JavaScript
    function parseDbStructure(text) {
        const lines = text.split('\n');
        const entities = [];
        let currentEntity = null;
        let currentTablePart = null;
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // Пропускаем комментарии и пустые строки
            if (trimmedLine.startsWith('//') || trimmedLine === '') {
                continue;
            }
            
            // Обработка начала нового объекта (Справочник, Документ, и т.д.)
            if (/^(Справочник|Документ|РегистрНакопления|РегистрСведений|Перечисление)\s+\w+/.test(trimmedLine)) {
                const match = trimmedLine.match(/^(\w+)\s+(\w+)/);
                if (match) {
                    if (currentEntity) {
                        entities.push(currentEntity);
                    }
                    
                    currentEntity = {
                        type: match[1],
                        name: match[2],
                        fields: [],
                        tableParts: []
                    };
                    currentTablePart = null;
                }
            } 
            // Обработка начала блока реквизитов
            else if (trimmedLine === 'Реквизиты:') {
                // Продолжаем с текущим объектом
            } 
            // Обработка начала табличной части
            else if (trimmedLine.match(/^\s*(\w+)\s+{$/)) {
                const match = trimmedLine.match(/^\s*(\w+)\s+{$/);
                currentTablePart = {
                    name: match[1],
                    fields: []
                };
                currentEntity.tableParts.push(currentTablePart);
            } 
            // Обработка начала блока табличных частей
            else if (trimmedLine === 'ТабличныеЧасти:') {
                // Продолжаем с текущим объектом
            } 
            // Обработка полей перечислений
            else if (currentEntity && currentEntity.type === 'Перечисление' && !trimmedLine.includes('(') && !trimmedLine.includes('{') && !trimmedLine.includes('}')) {
                currentEntity.fields.push({
                    name: trimmedLine,
                    type: 'ЗначениеПеречисления'
                });
            }
            // Обработка полей (реквизитов или полей табличной части)
            else if (trimmedLine.match(/^\s*(\w+)\s+\((.+)\)$/)) {
                const match = trimmedLine.match(/^\s*(\w+)\s+\((.+)\)$/);
                const field = {
                    name: match[1],
                    type: match[2]
                };
                
                if (currentTablePart) {
                    currentTablePart.fields.push(field);
                } else if (currentEntity) {
                    currentEntity.fields.push(field);
                }
            }
            // Конец сущности или табличной части
            else if (trimmedLine === '}') {
                if (currentTablePart) {
                    currentTablePart = null;
                } else if (currentEntity) {
                    entities.push(currentEntity);
                    currentEntity = null;
                }
            }
        }
        
        // Добавляем последнюю сущность, если она есть
        if (currentEntity) {
            entities.push(currentEntity);
        }
        
        return entities;
    }
    
    // Отрисовка структуры БД в HTML
    function renderDbStructure(entities) {
        dbVisualization.innerHTML = '';
        
        entities.forEach(entity => {
            const entityElement = document.createElement('div');
            entityElement.className = `db-entity entity-${entity.type.toLowerCase()}`;
            entityElement.dataset.type = entity.type;
            entityElement.dataset.name = entity.name;
            
            const header = document.createElement('div');
            header.className = 'entity-header';
            header.innerHTML = `
                <span>${entity.name}</span>
                <span class="entity-type">${entity.type}</span>
            `;
            
            const body = document.createElement('div');
            body.className = 'entity-body';
            
            let fieldsHtml = '<ul class="entity-fields">';
            // Показываем только первые 5 полей изначально
            const showAllFields = entity.fields.length <= 5;
            const visibleFields = showAllFields ? entity.fields : entity.fields.slice(0, 5);
            
            visibleFields.forEach(field => {
                fieldsHtml += `
                    <li>
                        <span class="field-name">${field.name}</span>
                        <span class="field-type">(${field.type})</span>
                    </li>
                `;
            });
            
            if (!showAllFields) {
                fieldsHtml += '</ul>';
                fieldsHtml += `<button class="expand-btn" onclick="toggleFields(this)">Показать все поля (${entity.fields.length})</button>`;
                
                fieldsHtml += '<ul class="entity-fields-all" style="display: none;">';
                entity.fields.forEach(field => {
                    fieldsHtml += `
                        <li>
                            <span class="field-name">${field.name}</span>
                            <span class="field-type">(${field.type})</span>
                        </li>
                    `;
                });
            }
            fieldsHtml += '</ul>';
            
            // Добавляем табличные части, если они есть
            if (entity.tableParts.length > 0) {
                entity.tableParts.forEach(tablePart => {
                    fieldsHtml += `
                        <div class="table-part">
                            <div class="table-part-title">ТабличнаяЧасть: ${tablePart.name}</div>
                            <ul class="entity-fields">
                    `;
                    
                    tablePart.fields.forEach(field => {
                        fieldsHtml += `
                            <li>
                                <span class="field-name">${field.name}</span>
                                <span class="field-type">(${field.type})</span>
                            </li>
                        `;
                    });
                    
                    fieldsHtml += '</ul></div>';
                });
            }
            
            body.innerHTML = fieldsHtml;
            
            entityElement.appendChild(header);
            entityElement.appendChild(body);
            dbVisualization.appendChild(entityElement);
        });
    }
    
    // Функция для фильтрации сущностей
    function filterDbEntities() {
        const typeFilter = entityTypeSelect.value;
        const searchFilter = searchInput.value.toLowerCase();
        
        const entities = document.querySelectorAll('.db-entity');
        
        entities.forEach(entity => {
            const type = entity.dataset.type;
            const name = entity.dataset.name.toLowerCase();
            
            // Проверяем соответствие типу
            const matchesType = typeFilter === 'all' || type === typeFilter;
            
            // Проверяем соответствие поисковому запросу
            const matchesSearch = name.includes(searchFilter);
            
            // Показываем или скрываем элемент
            if (matchesType && matchesSearch) {
                entity.style.display = '';
            } else {
                entity.style.display = 'none';
            }
        });
    }
    
    // Добавляем глобальную функцию для переключения видимости полей
    window.toggleFields = function(button) {
        const parentNode = button.parentNode;
        const allFieldsList = parentNode.querySelector('.entity-fields-all');
        
        if (allFieldsList.style.display === 'none') {
            allFieldsList.style.display = 'block';
            button.textContent = 'Скрыть поля';
        } else {
            allFieldsList.style.display = 'none';
            button.textContent = 'Показать все поля';
        }
    };
});