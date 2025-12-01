// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('Страница загружена!');

    // Инициализация всех функций
    initThemeChanger();
    initGallery();
    initAccordion();
    initContactForm();
    initModal();
    initSmoothScrolling();
    initAnimatedTitle();
});

// Функция для изменения темы (цвета фона)
function initThemeChanger() {
    const changeThemeBtn = document.getElementById('changeThemeBtn');
    const body = document.body;

    // Массив цветовых схем (другие цвета)
    const themes = [
        'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
        'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
        'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
        'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
        'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)',
        'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)'
    ];

    let currentTheme = 0;

    changeThemeBtn.addEventListener('click', function () {
        currentTheme = (currentTheme + 1) % themes.length;
        body.style.background = themes[currentTheme];

        // Добавляем анимацию
        changeThemeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            changeThemeBtn.style.transform = 'scale(1)';
        }, 150);

        console.log('Тема изменена на схему:', currentTheme + 1);
    });
}

// Функция для работы с галереей
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const searchInput = document.getElementById('searchInput');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const galleryItems = Array.from(galleryGrid.children);

    // Поиск по галерее
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        galleryItems.forEach(item => {
            const itemName = item.getAttribute('data-name').toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Перемешивание элементов галереи
    shuffleBtn.addEventListener('click', function () {
        // Fisher-Yates shuffle algorithm
        for (let i = galleryItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [galleryItems[i], galleryItems[j]] = [galleryItems[j], galleryItems[i]];
        }

        // Переставляем элементы в DOM
        galleryItems.forEach(item => {
            galleryGrid.appendChild(item);
            item.style.animation = 'shuffle 0.5s ease';
        });
    });

}

// Функция для работы с аккордеоном
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');

        header.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Закрываем все элементы
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('.accordion-content').style.maxHeight = null;
                accItem.querySelector('.accordion-icon').textContent = '+';
            });

            // Открываем текущий элемент, если он был закрыт
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });
    });
}

// Функция для обработки формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Валидация
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Имитация отправки данных
        console.log('Данные формы:', { name, email, message });

        // Показываем сообщение об успехе
        alert(`Спасибо, ${name}! Ваше сообщение передано голубю и скоро будет доставлено. Хорошего дня!`);

        // Очищаем форму
        contactForm.reset();

        // Добавляем визуальный эффект
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Голубь полетел отправлять!';
        submitBtn.style.background = '#2ebf91';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// Функция для работы с модальным окном
function initModal() {
    const modal = document.getElementById('modal');
    const showModalBtn = document.getElementById('showModalBtn');
    const closeModal = document.querySelector('.modal-close');

    // Открытие модального окна
    showModalBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие при клике вне модального окна
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Функция для плавной прокрутки
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Функция для анимированного заголовка
function initAnimatedTitle() {
    const heroTitle = document.getElementById('heroTitle');
    const texts = ['Добро пожаловать!', 'Изучаем русскую классику', 'Погружаемся в мир музыки'];
    let currentIndex = 0;

    function changeTitle() {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            heroTitle.textContent = texts[currentIndex];
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // Меняем заголовок каждые 3 секунды
    setInterval(changeTitle, 3000);
}

// Функция для обработки ошибок
window.addEventListener('error', function (e) {
    console.error('Произошла ошибка:', e.error);
});

// Экспорт функций для возможного использования в консоли браузера
window.webPageFunctions = {
    changeTheme: initThemeChanger,
    resetCounter: function () {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) resetBtn.click();
    },
    openModal: function () {
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    }
};
