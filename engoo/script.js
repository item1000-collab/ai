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
    
    let cardColors = l.colors;

    if (!cardColors || cardColors.length === 0) {
      const hostName = l.host || "Unknown";
      const hue = stringToHash(hostName) % 360;
      
      cardColors = [
        `hsl(${hue}, 40%, 30%)`,
        `hsl(${hue}, 50%, 45%)`,
        `hsl(${hue}, 60%, 65%)`
      ];
    }

    // Оборачиваем весь контент карточки в тег <a>, чтобы кликабельна была вся область
    return `
      <a href="${l.url}" class="class-card" target="_blank">
        <div class="card-media" style="background: ${getGradient(cardColors)};">
          <span class="date-tag">${formatDate(l.date)}</span>
          <span class="host-tag">${l.host || 'None'}</span>
        </div>
        <div class="card-content">
          <div class="class-title">${titleHtml}</div>
        </div>
      </a>
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

// ============== INIT ==============
renderFilters();
renderLessons();

// ============== STICKY FILTER SHADOW EFFECT ==============
window.addEventListener('scroll', () => {
  const filterSection = document.querySelector('.filter-section');
  if (!filterSection) return;
  
  if (window.scrollY > 20) {
    filterSection.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
    filterSection.style.borderBottom = '1px solid #eeebe6';
  } else {
    filterSection.style.boxShadow = 'none';
    filterSection.style.borderBottom = '1px solid transparent';
  }
});
