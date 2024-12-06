document.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const typeInputs = document.querySelectorAll('input[name="type"]');
    const optionsContainer = document.getElementById('options-container');
    const propertiesContainer = document.getElementById('properties-container');
    const optionsSelect = document.getElementById('options');
    const propertiesCheckbox = document.getElementById('properties');
    const totalPriceElement = document.getElementById('total-price');

    // Начальные цены для типов
    const prices = {
        type1: 100,  // Тип 1: базовая цена
        type2: 200,  // Тип 2: базовая цена
        type3: 300,  // Тип 3: базовая цена
    };

    // Функция для пересчета итоговой стоимости
    function updatePrice() {
        const quantity = parseInt(quantityInput.value);
        let price = 0;
        let selectedType = document.querySelector('input[name="type"]:checked').value;

        // Базовая цена в зависимости от типа товара
        switch (selectedType) {
            case '1':
                price = prices.type1;
                break;
            case '2':
                price = prices.type2;
                break;
            case '3':
                price = prices.type3;
                break;
        }

        // Если выбран тип 2, добавляем цену за опцию
        if (selectedType === '2' && optionsSelect.value === 'option2') {
            price += 50;  // Цена для опции 2
        }

        // Если выбран тип 3 и свойство активировано, добавляем стоимость
        if (selectedType === '3' && propertiesCheckbox.checked) {
            price += 30;  // Стоимость за свойство
        }

        // Итоговая стоимость = базовая цена * количество
        totalPriceElement.textContent = price * quantity;
    }

    // Обработчики событий
    quantityInput.addEventListener('input', updatePrice);

    typeInputs.forEach(input => {
        input.addEventListener('change', function () {
            const selectedType = this.value;

            // Динамическое отображение опций и свойств в зависимости от выбранного типа
            if (selectedType === '1') {
                optionsContainer.classList.add('hidden');
                propertiesContainer.classList.add('hidden');
            } else if (selectedType === '2') {
                optionsContainer.classList.remove('hidden');
                propertiesContainer.classList.add('hidden');
            } else if (selectedType === '3') {
                optionsContainer.classList.add('hidden');
                propertiesContainer.classList.remove('hidden');
            }

            updatePrice();
        });
    });

    optionsSelect.addEventListener('change', updatePrice);
    propertiesCheckbox.addEventListener('change', updatePrice);

    // Инициализация начальной стоимости
    updatePrice();
});