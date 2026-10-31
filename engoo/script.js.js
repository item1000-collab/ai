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

// ============== STATE ==============
let currentTeacher = 'all';

// ============== RENDER ==============
function renderLessons() {
  const filtered = currentTeacher === 'all' 
    ? LESSONS 
    : LESSONS.filter(l => l.teacher === currentTeacher);
  
  document.getElementById('lessonsGrid').innerHTML = filtered.map(l => {
    const pendingHtml = l.pending ? '<span class="pending-badge">🔗 link pending</span>' : '';
    const titleHtml = l.pending ? `${l.title} ${pendingHtml}` : l.title;
    
    return `
      <div class="class-card">
        <div class="card-media" style="background: ${getGradient(l.colors)};">
          <span class="date-tag">🗓️ ${formatDate(l.date)}</span>
          <span class="teacher-tag">👩‍🏫 ${l.teacher || 'None'}</span>
        </div>
        <div class="card-content">
          <div class="class-title">${titleHtml}</div>
          <a href="${l.url}" class="class-link" target="_blank">
            <span>📘 Class material</span>
            <span class="arrow-icon">→</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// ============== FILTERS ==============
const filterContainer = document.getElementById('teacherFilterButtons');

function renderFilters() {
  const teachers = [...new Set(LESSONS.map(l => l.teacher).filter(t => t !== ''))].sort();
  const html = `
    <button data-teacher="all" class="filter-btn ${currentTeacher === 'all' ? 'active' : ''}">All teachers</button>
    ${teachers.map(t => `
      <button data-teacher="${t}" class="filter-btn ${currentTeacher === t ? 'active' : ''}">${t}</button>
    `).join('')}
  `;
  filterContainer.innerHTML = html;
  
  filterContainer.querySelectorAll('[data-teacher]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTeacher = btn.dataset.teacher;
      renderFilters();
      renderLessons();
    });
  });
}

// ============== RESET ==============
document.getElementById('resetFiltersBtn').addEventListener('click', () => {
  currentTeacher = 'all';
  renderFilters();
  renderLessons();
});

// ============== INIT ==============
renderFilters();
renderLessons();