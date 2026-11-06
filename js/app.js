/**
 * A4 Monthly Project & Calendar Planner
 * Clean Code Architecture - Single Source of Truth & Reactive Synchronization
 */

(function () {
  'use strict';

  // =========================================================
  // APPLICATION STATE (SINGLE SOURCE OF TRUTH)
  // =========================================================
  const state = {
    version: 2,
    lang: 'tr',
    orientation: 'portrait',
    year: 2026,
    month: 11,
    focus: '',
    currentProjects: [],
    futureProjects: [],
    notes: [],
    calendarNotes: {} // Keyed by "YYYY-MM-DD" -> array of strings
  };

  let autoSaveTimeout = null;
  let toastTimeout = null;

  // =========================================================
  // UTILITIES
  // =========================================================
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDateKey(year, month, day) {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0, 12, 0, 0).getDate();
  }

  function getFirstDayOffset(year, month) {
    const firstDay = new Date(year, month - 1, 1, 12, 0, 0).getDay();
    // JS: 0=Sun, 1=Mon, ..., 6=Sat -> Convert to Monday=0, ..., Sunday=6
    return firstDay === 0 ? 6 : firstDay - 1;
  }

  // =========================================================
  // TOAST NOTIFICATIONS
  // =========================================================
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // =========================================================
  // LOCAL STORAGE & PERSISTENCE
  // =========================================================
  const STORAGE_KEY = 'monthly_planner_v2_state';

  function saveToStorage(manual = false) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem('planner_lang', state.lang);
      if (manual) {
        const t = I18N[state.lang] || I18N.en;
        showToast(t.toastSaved || 'Saved');
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  function scheduleAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveToStorage(false);
    }, 400);
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        mergeState(parsed);
        return true;
      }
    } catch (e) {
      console.warn('Could not load existing planner state from localStorage', e);
    }
    return false;
  }

  function mergeState(imported) {
    if (imported.lang && I18N[imported.lang]) state.lang = imported.lang;
    if (imported.orientation === 'portrait' || imported.orientation === 'landscape') {
      state.orientation = imported.orientation;
    }
    if (Number.isInteger(Number(imported.year))) state.year = parseInt(imported.year, 10);
    if (Number.isInteger(Number(imported.month))) state.month = parseInt(imported.month, 10);
    if (typeof imported.focus === 'string') state.focus = imported.focus;

    if (Array.isArray(imported.currentProjects) && imported.currentProjects.length > 0) {
      state.currentProjects = imported.currentProjects.map((p, idx) => ({
        id: idx + 1,
        title: typeof p.title === 'string' ? p.title : '',
        due: typeof p.due === 'string' ? p.due : '',
        tasks: Array.isArray(p.tasks)
          ? p.tasks.map(t => ({
              text: typeof t === 'string' ? t : (t && t.text ? String(t.text) : ''),
              done: t && t.done === true
            }))
          : [],
        status: Number.isInteger(p.status) ? p.status : 0
      }));
    }

    if (Array.isArray(imported.futureProjects) && imported.futureProjects.length > 0) {
      state.futureProjects = imported.futureProjects.map((p, idx) => ({
        id: idx + 1,
        title: typeof p.title === 'string' ? p.title : '',
        target: typeof p.target === 'string' ? p.target : '',
        prereq: typeof p.prereq === 'string' ? p.prereq : '',
        priority: typeof p.priority === 'string' ? p.priority : '',
        resource: typeof p.resource === 'string' ? p.resource : ''
      }));
    }

    if (Array.isArray(imported.notes)) {
      state.notes = imported.notes.map((n, idx) => ({
        id: idx + 1,
        text: typeof n === 'string' ? n : (n && n.text ? String(n.text) : ''),
        done: n && n.done === true
      }));
    }

    if (imported.calendarNotes && typeof imported.calendarNotes === 'object') {
      state.calendarNotes = imported.calendarNotes;
    }
  }

  // =========================================================
  // DATA INITIALIZATION (SAMPLE DATA & BLANK TEMPLATE)
  // =========================================================
  function loadSampleData(lang = state.lang) {
    const t = I18N[lang] || I18N.tr;
    const s = t.samples;

    state.focus = s.focus;

    state.currentProjects = s.current.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      due: p.due,
      tasks: p.tasks.map(taskText => ({ text: taskText, done: false })),
      status: idx === 0 ? 1 : 0
    }));

    state.futureProjects = s.future.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      target: p.target,
      prereq: p.prereq,
      priority: p.priority,
      resource: p.resource
    }));

    state.notes = s.notes.map((noteText, idx) => ({
      id: idx + 1,
      text: noteText,
      done: false
    }));

    // Add sample filler lines
    while (state.notes.length < 5) {
      state.notes.push({ id: state.notes.length + 1, text: '', done: false });
    }
  }

  function clearAllData() {
    state.focus = '';

    state.currentProjects = [1, 2, 3, 4].map(id => ({
      id,
      title: `Proje ${id}: _____________________________`,
      due: '_____',
      tasks: [
        { text: '', done: false },
        { text: '', done: false },
        { text: '', done: false }
      ],
      status: 0
    }));

    state.futureProjects = [1, 2, 3, 4].map(id => ({
      id,
      title: `${id}. ___________________________`,
      target: '_____',
      prereq: '__________________________________',
      priority: '—',
      resource: '_____'
    }));

    state.notes = [1, 2, 3, 4, 5].map(id => ({ id, text: '', done: false }));
    state.calendarNotes = {};

    renderAll();
    scheduleAutoSave();
    showToast('Şablon sıfırlandı');
  }

  // =========================================================
  // 42-CELL CALENDAR GRID GENERATION & DATE RENDERING
  // =========================================================
  function createGridCells(containerId, isLandscape) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    // Exactly 42 cells (6 rows x 7 days) ensures all possible months fit cleanly
    for (let i = 0; i < 42; i++) {
      const isWeekend = (i % 7 === 5) || (i % 7 === 6);
      const cell = document.createElement('div');
      cell.className = `cal-cell ${isWeekend ? 'weekend' : ''}`;
      cell.dataset.cellIndex = String(i);

      const header = document.createElement('div');
      header.className = 'cal-cell-header';
      header.innerHTML = '<span></span><span class="cal-date-badge"></span>';

      const lines = document.createElement('div');
      lines.className = 'cal-cell-lines';

      const lineCount = isLandscape ? 3 : 2;
      for (let l = 0; l < lineCount; l++) {
        const line = document.createElement('div');
        line.className = 'cal-note-line';
        line.contentEditable = 'true';
        line.dataset.lineIndex = String(l);
        lines.appendChild(line);
      }

      cell.appendChild(header);
      cell.appendChild(lines);
      container.appendChild(cell);
    }
  }

  function updateCalendar() {
    const t = I18N[state.lang] || I18N.tr;
    const year = state.year;
    const month = state.month;
    const monthName = t.months[month - 1];

    // Update Header Text Badges
    const pMonthText = document.getElementById('displayMonthText');
    const pYearText = document.getElementById('displayYearText');
    if (pMonthText) pMonthText.textContent = monthName;
    if (pYearText) pYearText.textContent = String(year);

    document.querySelectorAll('.ls-month').forEach(el => { el.textContent = monthName; });
    document.querySelectorAll('.ls-year').forEach(el => { el.textContent = String(year); });

    // Update Period Select Inputs
    const mSelect = document.getElementById('monthSelect');
    const ySelect = document.getElementById('yearSelect');
    if (mSelect && mSelect.value !== String(month)) mSelect.value = String(month);
    if (ySelect) {
      let foundYear = false;
      for (let i = 0; i < ySelect.options.length; i++) {
        if (ySelect.options[i].value === String(year)) {
          ySelect.selectedIndex = i;
          foundYear = true;
          break;
        }
      }
      if (!foundYear) {
        const opt = document.createElement('option');
        opt.value = String(year);
        opt.textContent = String(year);
        opt.selected = true;
        ySelect.appendChild(opt);
      }
    }

    const startOffset = getFirstDayOffset(year, month);
    const totalDays = getDaysInMonth(year, month);

    fillGrid('portraitCalCells', startOffset, totalDays, year, month);
    fillGrid('landscapeCalCells', startOffset, totalDays, year, month);
  }

  function fillGrid(containerId, startOffset, totalDays, year, month) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cells = container.getElementsByClassName('cal-cell');

    for (let i = 0; i < 42; i++) {
      const cell = cells[i];
      if (!cell) continue;
      const badge = cell.querySelector('.cal-date-badge');
      const lines = cell.querySelectorAll('.cal-note-line');
      const dayNumber = i - startOffset + 1;

      if (dayNumber >= 1 && dayNumber <= totalDays) {
        const dateKey = formatDateKey(year, month, dayNumber);
        cell.dataset.dateKey = dateKey;
        cell.style.opacity = '1';

        if (badge) {
          badge.textContent = String(dayNumber);
          badge.style.visibility = 'visible';
          badge.style.border = '1px solid #000000';
        }

        const savedNotes = state.calendarNotes[dateKey] || [];
        lines.forEach((line, idx) => {
          line.textContent = savedNotes[idx] || '';
          line.dataset.dateKey = dateKey;
          line.dataset.lineIndex = String(idx);
          line.contentEditable = 'true';
        });
      } else {
        cell.removeAttribute('dateKey');
        cell.style.opacity = '0.3';
        if (badge) {
          badge.textContent = '';
          badge.style.visibility = 'hidden';
          badge.style.border = 'none';
        }
        lines.forEach(line => {
          line.textContent = '';
          line.removeAttribute('data-date-key');
          line.contentEditable = 'false';
        });
      }
    }
  }

  // =========================================================
  // REACTIVE RENDERING (SYNCS PORTRAIT & LANDSCAPE VIEWS)
  // =========================================================
  function renderAll() {
    renderHeadersAndLabels();
    renderFocus();
    renderCurrentProjects();
    renderFutureProjects();
    renderNotes();
    updateCalendar();
  }

  function renderHeadersAndLabels() {
    const t = I18N[state.lang] || I18N.tr;

    // Document language
    document.documentElement.lang = state.lang;

    // Toolbar text
    const setElemText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setElemText('tTitle', t.appTitle);
    setElemText('lblPortrait', t.portrait);
    setElemText('lblLandscape', t.landscape);
    setElemText('lblPeriod', t.period);
    setElemText('lblClearNumbers', t.clearNumbers);
    setElemText('lblSampleData', t.sampleData);
    setElemText('lblReset', t.reset);
    setElemText('lblPrint', t.print);
    setElemText('lblSave', t.save);
    setElemText('lblExport', t.export);
    setElemText('lblImport', t.import);

    const btnPrev = document.getElementById('btnPrevMonth');
    if (btnPrev) btnPrev.title = t.prevMonth;
    const btnNext = document.getElementById('btnNextMonth');
    if (btnNext) btnNext.title = t.nextMonth;

    // Active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `lang-${state.lang}`);
    });

    // Populate Month Dropdown
    const mSelect = document.getElementById('monthSelect');
    if (mSelect) {
      mSelect.innerHTML = '';
      t.monthsSelect.forEach((mName, idx) => {
        const opt = document.createElement('option');
        opt.value = String(idx + 1);
        opt.textContent = mName;
        if (idx + 1 === state.month) opt.selected = true;
        mSelect.appendChild(opt);
      });
    }

    // Days of week short headers (PZT, SAL, etc.)
    for (let i = 0; i < 7; i++) {
      document.querySelectorAll(`.day-name-${i}`).forEach(el => {
        el.textContent = t.daysShort[i];
        el.title = t.days[i];
      });
    }

    // Section Titles and Tags
    setElemText('pMainTitle', t.mainTitle);
    setElemText('pSubTitle', t.subTitle);
    setElemText('pMonthLabel', t.monthLabel);
    setElemText('pYearLabel', t.yearLabel);
    setElemText('pFocusLabel', t.focusLabel);
    setElemText('pCalTitle', t.calTitle);
    setElemText('pCalTag', t.calTag);
    setElemText('pCurTitle', t.curTitle);
    setElemText('pCurTag', t.curTag);
    setElemText('pFutTitle', t.futTitle);
    setElemText('pFutTag', t.futTag);
    setElemText('pNotesTitle', t.notesTitle);
    setElemText('pNotesTag', t.notesTag);

    setElemText('lsMainTitle', t.mainTitle);
    setElemText('lsSubTitle', t.subTitle);
    setElemText('lsMonthLabel', t.monthLabel);
    setElemText('lsYearLabel', t.yearLabel);
    setElemText('lsFocusLabel', t.focusLabel);
    setElemText('lsCurTitle', t.curTitle);
    setElemText('lsCurTag', t.curTag);
    setElemText('lsFutTitle', t.futTitle);
    setElemText('lsFutTag', t.futTag);
    setElemText('lsNotesTitle', t.notesTitle);
  }

  function renderFocus() {
    const pFocus = document.getElementById('pFocusText');
    const lsFocus = document.getElementById('lsFocusText');
    if (pFocus) pFocus.textContent = state.focus;
    if (lsFocus) lsFocus.textContent = state.focus;
  }

  function renderCurrentProjects() {
    const t = I18N[state.lang] || I18N.tr;
    const pContainer = document.getElementById('portraitCurrentProjects');
    const lsContainer = document.getElementById('landscapeCurrentProjects');
    if (!pContainer || !lsContainer) return;

    pContainer.innerHTML = '';
    lsContainer.innerHTML = '';

    state.currentProjects.forEach((proj, pIndex) => {
      // Portrait Card
      const pCard = document.createElement('div');
      pCard.className = 'project-card';
      pCard.innerHTML = `
        <div class="project-card-header">
          <div class="project-name">
            <span class="chk ${proj.status === 3 ? 'checked' : ''}" data-action="toggle-project" data-project-index="${pIndex}"></span>
            <span contenteditable="true" data-bind="currentProjects.${pIndex}.title">${escapeHtml(proj.title)}</span>
          </div>
          <span class="project-deadline" contenteditable="true" data-bind="currentProjects.${pIndex}.due">${escapeHtml(proj.due)}</span>
        </div>
        <ul class="project-tasks">
          ${proj.tasks.map((task, tIndex) => `
            <li class="task-item">
              <span class="chk ${task.done ? 'checked' : ''}" data-action="toggle-task" data-project-index="${pIndex}" data-task-index="${tIndex}"></span>
              <span class="task-text" contenteditable="true" data-bind="currentProjects.${pIndex}.tasks.${tIndex}.text">${escapeHtml(task.text)}</span>
            </li>
          `).join('')}
        </ul>
        <div class="project-status-bar">
          ${t.statuses.map((stName, sIdx) => `
            <span class="status-opt" data-action="set-status" data-project-index="${pIndex}" data-status-index="${sIdx}">
              <span class="circle-chk ${proj.status === sIdx ? 'checked' : ''}"></span> ${escapeHtml(stName)}
            </span>
          `).join('')}
        </div>
      `;
      pContainer.appendChild(pCard);

      // Landscape Card (Displays first 3 projects for balanced layout)
      if (pIndex < 3) {
        const lsCard = document.createElement('div');
        lsCard.className = 'project-card';
        lsCard.style.marginBottom = '3px';
        lsCard.style.padding = '3px 5px';
        lsCard.innerHTML = `
          <div class="project-card-header">
            <span class="project-name">
              <span class="chk ${proj.status === 3 ? 'checked' : ''}" data-action="toggle-project" data-project-index="${pIndex}"></span>
              <span contenteditable="true" data-bind="currentProjects.${pIndex}.title">${escapeHtml(proj.title)}</span>
            </span>
            <span class="project-deadline" contenteditable="true" data-bind="currentProjects.${pIndex}.due">${escapeHtml(proj.due)}</span>
          </div>
          <ul class="project-tasks">
            ${proj.tasks.slice(0, 2).map((task, tIndex) => `
              <li class="task-item">
                <span class="chk ${task.done ? 'checked' : ''}" data-action="toggle-task" data-project-index="${pIndex}" data-task-index="${tIndex}"></span>
                <span class="task-text" contenteditable="true" data-bind="currentProjects.${pIndex}.tasks.${tIndex}.text">${escapeHtml(task.text)}</span>
              </li>
            `).join('')}
          </ul>
          <div class="project-status-bar">
            ${t.statuses.map((stName, sIdx) => `
              <span class="status-opt" data-action="set-status" data-project-index="${pIndex}" data-status-index="${sIdx}">
                <span class="circle-chk ${proj.status === sIdx ? 'checked' : ''}"></span> ${escapeHtml(stName)}
              </span>
            `).join('')}
          </div>
        `;
        lsContainer.appendChild(lsCard);
      }
    });
  }

  function renderFutureProjects() {
    const t = I18N[state.lang] || I18N.tr;
    const pContainer = document.getElementById('portraitFutureProjects');
    const lsContainer = document.getElementById('landscapeFutureProjects');
    if (!pContainer || !lsContainer) return;

    pContainer.innerHTML = '';
    lsContainer.innerHTML = '';

    state.futureProjects.forEach((fProj, fIndex) => {
      // Portrait Card
      const pCard = document.createElement('div');
      pCard.className = 'future-card';
      pCard.innerHTML = `
        <div class="future-header">
          <span contenteditable="true" data-bind="futureProjects.${fIndex}.title">${escapeHtml(fProj.title)}</span>
          <span style="font-size: 7.5px; border: 1px solid #000; padding: 0 3px;" contenteditable="true" data-bind="futureProjects.${fIndex}.target">${escapeHtml(fProj.target)}</span>
        </div>
        <div class="task-text" style="font-size: 7.5px;" contenteditable="true" data-bind="futureProjects.${fIndex}.prereq">${escapeHtml(fProj.prereq)}</div>
        <div class="future-meta">
          <span>${escapeHtml(t.priorityLabel)} <strong contenteditable="true" data-bind="futureProjects.${fIndex}.priority">[${escapeHtml(fProj.priority)}]</strong></span>
          <span>${escapeHtml(t.resourceLabel)} <span contenteditable="true" data-bind="futureProjects.${fIndex}.resource">${escapeHtml(fProj.resource)}</span></span>
        </div>
      `;
      pContainer.appendChild(pCard);

      // Landscape Card
      if (fIndex < 3) {
        const lsCard = document.createElement('div');
        lsCard.className = 'future-card';
        lsCard.style.padding = '2.5px 4px';
        lsCard.style.marginBottom = '2.5px';
        lsCard.innerHTML = `
          <div class="future-header">
            <span contenteditable="true" data-bind="futureProjects.${fIndex}.title">${escapeHtml(fProj.title)}</span>
            <span style="font-size: 7px; border: 1px solid #000; padding: 0 2px;" contenteditable="true" data-bind="futureProjects.${fIndex}.target">${escapeHtml(fProj.target)}</span>
          </div>
          <div style="font-size: 7px; color: var(--ink-mid);" contenteditable="true" data-bind="futureProjects.${fIndex}.prereq">${escapeHtml(fProj.prereq)} [${escapeHtml(fProj.priority)}]</div>
        `;
        lsContainer.appendChild(lsCard);
      }
    });
  }

  function renderNotes() {
    const pContainer = document.getElementById('portraitNotesList');
    const lsContainer = document.getElementById('landscapeNotesList');
    if (!pContainer || !lsContainer) return;

    pContainer.innerHTML = '';
    lsContainer.innerHTML = '';

    state.notes.forEach((note, nIndex) => {
      const pRow = document.createElement('div');
      pRow.className = 'note-row';
      pRow.innerHTML = `
        <span class="chk ${note.done ? 'checked' : ''}" data-action="toggle-note" data-note-index="${nIndex}"></span>
        <span class="note-line" contenteditable="true" data-bind="notes.${nIndex}.text">${escapeHtml(note.text)}</span>
      `;
      pContainer.appendChild(pRow);

      if (nIndex < 3) {
        const lsRow = document.createElement('div');
        lsRow.className = 'note-row';
        lsRow.innerHTML = `
          <span class="chk ${note.done ? 'checked' : ''}" data-action="toggle-note" data-note-index="${nIndex}"></span>
          <span class="note-line" contenteditable="true" data-bind="notes.${nIndex}.text">${escapeHtml(note.text)}</span>
        `;
        lsContainer.appendChild(lsRow);
      }
    });
  }

  // =========================================================
  // USER ACTIONS & CONTROLS
  // =========================================================
  function setLanguage(lang) {
    if (!I18N[lang]) lang = 'tr';
    state.lang = lang;
    renderAll();
    scheduleAutoSave();
  }

  function switchOrientation(mode) {
    state.orientation = mode;
    const portraitSheet = document.getElementById('portraitSheet');
    const landscapeSheet = document.getElementById('landscapeSheet');
    const btnPortrait = document.getElementById('btnPortrait');
    const btnLandscape = document.getElementById('btnLandscape');

    let styleTag = document.getElementById('dynamicPageStyle');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamicPageStyle';
      document.head.appendChild(styleTag);
    }

    if (mode === 'portrait') {
      if (portraitSheet) portraitSheet.style.display = 'flex';
      if (landscapeSheet) landscapeSheet.style.display = 'none';
      if (btnPortrait) btnPortrait.classList.add('active');
      if (btnLandscape) btnLandscape.classList.remove('active');
      styleTag.innerHTML = '@page { size: A4 portrait; margin: 8mm 9mm; }';
    } else {
      if (portraitSheet) portraitSheet.style.display = 'none';
      if (landscapeSheet) landscapeSheet.style.display = 'flex';
      if (btnPortrait) btnPortrait.classList.remove('active');
      if (btnLandscape) btnLandscape.classList.add('active');
      styleTag.innerHTML = '@page { size: A4 landscape; margin: 8mm 9mm; }';
    }
    scheduleAutoSave();
  }

  function changeMonth(delta) {
    let m = state.month + delta;
    let y = state.year;
    if (m < 1) {
      m = 12;
      y--;
    } else if (m > 12) {
      m = 1;
      y++;
    }
    state.month = m;
    state.year = y;
    updateCalendar();
    scheduleAutoSave();
    const t = I18N[state.lang] || I18N.tr;
    showToast(`${t.monthsSelect[m - 1]} ${y}`);
  }

  function clearDateBadges() {
    document.querySelectorAll('.cal-date-badge').forEach(b => {
      b.textContent = '';
      b.style.visibility = 'visible';
      b.style.border = '1px solid #000000';
    });
    document.querySelectorAll('.cal-cell').forEach(c => {
      c.style.opacity = '1';
    });
    showToast('Tarihler temizlendi (elle yazmaya uygun)');
  }

  // =========================================================
  // JSON EXPORT & IMPORT
  // =========================================================
  function exportJson() {
    const fileName = `planner-${state.year}-${String(state.month).padStart(2, '0')}.json`;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute('download', fileName);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    showToast(`Dışa aktarıldı: ${fileName}`);
  }

  function triggerImportJson() {
    const input = document.getElementById('jsonFileInput');
    if (input) input.click();
  }

  function handleImportFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && typeof parsed === 'object') {
          mergeState(parsed);
          renderAll();
          switchOrientation(state.orientation);
          saveToStorage(false);
          const t = I18N[state.lang] || I18N.tr;
          showToast(t.toastImported || 'Plan yüklendi');
        } else {
          throw new Error('Geçersiz dosya formatı');
        }
      } catch (err) {
        alert('JSON yükleme hatası: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // =========================================================
  // EVENT DELEGATION & TWO-WAY BINDING
  // =========================================================
  function setupEventListeners() {
    // Checkbox toggles and status selections
    document.addEventListener('click', function (e) {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.dataset.action;
      const pIdx = target.dataset.projectIndex !== undefined ? parseInt(target.dataset.projectIndex, 10) : null;
      const tIdx = target.dataset.taskIndex !== undefined ? parseInt(target.dataset.taskIndex, 10) : null;
      const nIdx = target.dataset.noteIndex !== undefined ? parseInt(target.dataset.noteIndex, 10) : null;
      const sIdx = target.dataset.statusIndex !== undefined ? parseInt(target.dataset.statusIndex, 10) : null;

      if (action === 'toggle-project' && pIdx !== null && state.currentProjects[pIdx]) {
        state.currentProjects[pIdx].status = state.currentProjects[pIdx].status === 3 ? 0 : 3;
        renderCurrentProjects();
        scheduleAutoSave();
      } else if (action === 'toggle-task' && pIdx !== null && tIdx !== null && state.currentProjects[pIdx]) {
        const task = state.currentProjects[pIdx].tasks[tIdx];
        if (task) {
          task.done = !task.done;
          renderCurrentProjects();
          scheduleAutoSave();
        }
      } else if (action === 'set-status' && pIdx !== null && sIdx !== null && state.currentProjects[pIdx]) {
        state.currentProjects[pIdx].status = sIdx;
        renderCurrentProjects();
        scheduleAutoSave();
      } else if (action === 'toggle-note' && nIdx !== null && state.notes[nIdx]) {
        state.notes[nIdx].done = !state.notes[nIdx].done;
        renderNotes();
        scheduleAutoSave();
      }
    });

    // Contenteditable input bindings
    document.addEventListener('input', function (e) {
      const target = e.target;

      // Focus strip binding
      if (target.id === 'pFocusText' || target.id === 'lsFocusText') {
        state.focus = target.textContent;
        // Sync to sibling orientation
        const other = target.id === 'pFocusText' ? document.getElementById('lsFocusText') : document.getElementById('pFocusText');
        if (other && other.textContent !== state.focus) {
          other.textContent = state.focus;
        }
        scheduleAutoSave();
        return;
      }

      // Calendar cell notes binding
      if (target.classList.contains('cal-note-line') && target.dataset.dateKey) {
        const dateKey = target.dataset.dateKey;
        const lineIdx = parseInt(target.dataset.lineIndex || '0', 10);
        if (!state.calendarNotes[dateKey]) state.calendarNotes[dateKey] = [];
        state.calendarNotes[dateKey][lineIdx] = target.textContent;

        // Sync note to the other view (Portrait <-> Landscape)
        document.querySelectorAll(`.cal-note-line[data-date-key="${dateKey}"][data-line-index="${lineIdx}"]`).forEach(sibling => {
          if (sibling !== target && sibling.textContent !== target.textContent) {
            sibling.textContent = target.textContent;
          }
        });

        scheduleAutoSave();
        return;
      }

      // Structured Data Property Binding: data-bind="path.to.prop"
      const bindPath = target.dataset.bind;
      if (bindPath) {
        const parts = bindPath.split('.');
        let curr = state;
        for (let i = 0; i < parts.length - 1; i++) {
          curr = curr[parts[i]];
          if (!curr) return;
        }
        curr[parts[parts.length - 1]] = target.textContent;

        // Sync to identical data-bind targets across orientations
        document.querySelectorAll(`[data-bind="${bindPath}"]`).forEach(sibling => {
          if (sibling !== target && sibling.textContent !== target.textContent) {
            sibling.textContent = target.textContent;
          }
        });

        scheduleAutoSave();
      }
    });

    // Keyboard Shortcuts (Ctrl/Cmd + S to save, Ctrl/Cmd + P to print)
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveToStorage(true);
      }
    });

    // Month & Year Select Event Listeners
    const mSelect = document.getElementById('monthSelect');
    if (mSelect) {
      mSelect.addEventListener('change', function () {
        state.month = parseInt(mSelect.value, 10);
        updateCalendar();
        scheduleAutoSave();
      });
    }

    const ySelect = document.getElementById('yearSelect');
    if (ySelect) {
      ySelect.addEventListener('change', function () {
        state.year = parseInt(ySelect.value, 10);
        updateCalendar();
        scheduleAutoSave();
      });
    }
  }

  // =========================================================
  // INITIALIZATION (BOOTSTRAP)
  // =========================================================
  function init() {
    // 1. Build DOM calendar cells (42 cells each)
    createGridCells('portraitCalCells', false);
    createGridCells('landscapeCalCells', true);

    // 2. Parse URL parameters for overrides
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    const paramMode = urlParams.get('mode');
    const paramYear = urlParams.get('year');
    const paramMonth = urlParams.get('month');

    // 3. Load from localStorage or initialize defaults
    const hasStored = loadFromStorage();
    if (!hasStored) {
      loadSampleData(paramLang || 'tr');
    }

    // URL parameter overrides take precedence
    if (paramLang && I18N[paramLang]) state.lang = paramLang;
    if (paramMode === 'landscape' || paramMode === 'portrait') state.orientation = paramMode;
    if (paramYear && Number.isInteger(Number(paramYear))) state.year = parseInt(paramYear, 10);
    if (paramMonth && Number.isInteger(Number(paramMonth))) state.month = parseInt(paramMonth, 10);

    // 4. Render initial view
    renderAll();
    switchOrientation(state.orientation);

    // 5. Setup event delegation
    setupEventListeners();
  }

  // Expose global methods required by toolbar buttons
  window.setLanguage = setLanguage;
  window.switchOrientation = switchOrientation;
  window.changeMonth = changeMonth;
  window.clearNumbers = clearDateBadges;
  window.populateSampleData = function () {
    loadSampleData(state.lang);
    renderAll();
    scheduleAutoSave();
    showToast('Örnek veriler dolduruldu');
  };
  window.clearAllData = clearAllData;
  window.savePlanToStorage = function (manual) { saveToStorage(manual); };
  window.exportPlanJson = exportJson;
  window.triggerImportJson = triggerImportJson;
  window.handleImportJson = handleImportFile;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
