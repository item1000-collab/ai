// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const transcriptDiv = document.getElementById('transcript');
    const titleEl = document.getElementById('show-title');
    const durationEl = document.getElementById('show-duration');
    
    let linesData = [];

    // Функция для перевода "1:34" в секунды (94)
    function timecodeToSeconds(tc) {
        const parts = tc.split(':').map(Number);
        if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return 0;
    }

    // Функция для форматирования секунд обратно в "М:СС" (для плеера)
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // 1. Загружаем JSON
    fetch('show_notes.json')
        .then(response => response.json())
        .then(data => {
            titleEl.textContent = data.show_title;
            durationEl.textContent = "Длительность шоу: " + data.show_duration;

            linesData = data.timecoded_transcript;

            // Вычисляем длительность каждой строки (конец = начало следующей)
            linesData.forEach((line, index) => {
                line.startSeconds = timecodeToSeconds(line.timecode);
                
                // Если это последняя строка, берем длительность всего шоу + 5 сек запаса (или просто конец)
                if (index < linesData.length - 1) {
                    line.endSeconds = timecodeToSeconds(linesData[index + 1].timecode);
                } else {
                    // Примерно 30 секунд на последнюю реплику, так как точного конца в JSON нет
                    line.endSeconds = line.startSeconds + 20; 
                }
            });

            // Рендерим текст
            renderTranscript(linesData);
            
            // Загружаем аудио
            audio.src = 'ai_radio.mp3';
        })
        .catch(error => console.error('Ошибка загрузки JSON:', error));

    // 2. Рендеринг строк
    function renderTranscript(lines) {
        transcriptDiv.innerHTML = ''; // Очищаем
        lines.forEach(line => {
            const div = document.createElement('div');
            div.className = 'transcript-line';
            div.dataset.start = line.startSeconds;

            div.innerHTML = `<span class="speaker">${line.speaker}:</span> ${line.text}`;

            // Клик по строке перематывает аудио
            div.addEventListener('click', () => {
                audio.currentTime = line.startSeconds;
                audio.play();
            });

            transcriptDiv.appendChild(div);
        });
    }

    // 3. Синхронизация (слушаем смену времени)
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const allLines = document.querySelectorAll('.transcript-line');

        allLines.forEach((el, index) => {
            const start = parseFloat(el.dataset.start);
            const end = linesData[index].endSeconds;

            // Проверяем, попадает ли текущее время в диапазон строки
            if (currentTime >= start && currentTime < end) {
                // Убираем активный класс у всех
                allLines.forEach(l => l.classList.remove('active'));
                // Добавляем активный класс текущей
                el.classList.add('active');
                // Автопрокрутка к активной строке
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});