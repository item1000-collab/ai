// ============== HELPERS ==============
function getGradient(colors) {
  if (colors.length === 2) {
    return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  }
  const stops = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(', ');
  return `linear-gradient(135deg, ${stops})`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    timeZone: 'UTC', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Новая функция: превращает строку (имя) в число
function stringToHash(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// ============== STATE ==============
let currentHost = 'all';

// ============== RENDER ==============
function renderLessons() {
  const filtered = currentHost === 'all' 
    ? LESSONS 
    : LESSONS.filter(l => l.host === currentHost);
  
  document.getElementById('lessonsGrid').innerHTML = filtered.map(l => {
    const pendingHtml = l.pending ? '<span class="pending-badge">🔗 link pending</span>' : '';
    const titleHtml = l.pending ? `${l.title} ${pendingHtml}` : l.title;
    
    // --- ЛОГИКА ЦВЕТОВ ---
    let cardColors = l.colors;

    // Если цветов нет, генерируем их на основе имени хоста
    if (!cardColors || cardColors.length === 0) {
      const hostName = l.host || "Unknown";
      const hue = stringToHash(hostName) % 360; // Получаем оттенок от 0 до 360
      
      cardColors = [
        `hsl(${hue}, 40%, 30%)`,  // Темный
        `hsl(${hue}, 50%, 45%)`,  // Средний
        `hsl(${hue}, 60%, 65%)`   // Светлый
      ];
    }
    // ----------------------

    return `
      <div class="class-card">
        <div class="card-media" style="background: ${getGradient(cardColors)};">
          <span class="date-tag">${formatDate(l.date)}</span>
          <span class="host-tag">${l.host || 'None'}</span>
        </div>
        <div class="card-content">
          <div class="class-title">${titleHtml}</div>
          <a href="${l.url}" class="class-link" target="_blank">
            <span>📘 Open</span>
            <span class="arrow-icon">→</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// ============== FILTERS ==============
const filterContainer = document.getElementById('hostFilterButtons');

function renderFilters() {
  const hosts = [...new Set(LESSONS.map(l => l.host).filter(t => t !== ''))].sort();
  const html = `
    <button data-host="all" class="filter-btn ${currentHost === 'all' ? 'active' : ''}">All hosts</button>
    ${hosts.map(t => `
      <button data-host="${t}" class="filter-btn ${currentHost === t ? 'active' : ''}">${t}</button>
    `).join('')}
  `;
  filterContainer.innerHTML = html;
  
  filterContainer.querySelectorAll('[data-host]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentHost = btn.dataset.host;
      renderFilters();
      renderLessons();
    });
  });
}

// ============== RESET ==============
document.getElementById('resetFiltersBtn').addEventListener('click', () => {
  currentHost = 'all';
  renderFilters();
  renderLessons();
});

// ============== INIT ==============
renderFilters();
renderLessons();
