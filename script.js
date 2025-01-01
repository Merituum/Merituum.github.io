document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const response = document.getElementById('formResponse');

    // Obsługa formularza kontaktowego
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pobieranie danych z formularza
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if(name === '' || email === '' || message === '') {
            response.textContent = 'Proszę wypełnić wszystkie pola.';
            response.style.color = 'red';
            return;
        }

        // Tutaj możesz dodać kod do wysyłania wiadomości, np. poprzez API

        // Tymczasowe potwierdzenie
        response.textContent = 'Dziękuję za wiadomość!';
        response.style.color = 'green';
        form.reset();
    });

    /* Slideshow Functionality */

    // Liczba projektów
    const projects = document.querySelectorAll('.project');
    const numberOfProjects = projects.length;

    // Tablica przechowująca indeksy aktualnych slajdów dla każdego projektu
    let slideIndices = Array(numberOfProjects).fill(0);

    // Inicjalizacja slajdów
    projects.forEach((project, index) => {
        showSlides(slideIndices[index], index);
        // Automatyczne zmienianie slajdów co 5 sekund
        setInterval(() => {
            changeSlide(1, index);
        }, 5000);
    });

    // Funkcja zmieniająca slajd
    window.changeSlide = function(direction, projectIndex) {
        slideIndices[projectIndex] += direction;
        showSlides(slideIndices[projectIndex], projectIndex);
    }

    // Funkcja ustawiająca slajd na konkretny indeks
    window.currentSlide = function(n, projectIndex) {
        slideIndices[projectIndex] = n;
        showSlides(slideIndices[projectIndex], projectIndex);
    }

    // Funkcja wyświetlająca odpowiedni slajd
    function showSlides(n, projectIndex) {
        const project = projects[projectIndex];
        const slides = project.querySelectorAll('.slides');
        const dots = project.querySelectorAll('.dot');

        if(n >= slides.length) { slideIndices[projectIndex] = 0 }
        if(n < 0) { slideIndices[projectIndex] = slides.length - 1 }

        // Ukryj wszystkie slajdy
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Usuń aktywny stan wskaźników
        if(dots.length > 0) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
        }

        // Pokaż aktualny slajd i aktywuj odpowiedni wskaźnik
        slides[slideIndices[projectIndex]].style.display = 'block';
        if(dots.length > 0) {
            dots[slideIndices[projectIndex]].classList.add('active');
        }
    }
});
