(() => {
  'use strict';

  const STORAGE_KEY = 'mpi-trigonometri-literasi-v1';
  const TOTAL_QUESTIONS = 12;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const cases = [
    {
      title: 'Kasus 01 · Seberapa tinggi tiang bendera?',
      story: 'Tim numerasi ingin memperkirakan tinggi tiang bendera sekolah tanpa harus memanjatnya. Dari titik A, seorang pengamat berdiri 12 m secara mendatar dari kaki tiang. Sudut elevasi dari tinggi mata pengamat menuju puncak tiang adalah 38°. Tinggi mata pengamat 1,5 m. Pengukuran ulang dari titik B dilakukan pada jarak 10 m dengan sudut 43°.',
      facts: ['Jarak A: 12 m', 'Sudut A: 38°', 'Jarak B: 10 m', 'Sudut B: 43°', 'Tinggi mata: 1,5 m'],
      visual: `<svg viewBox="0 0 560 190" role="img" aria-label="Sketsa sudut elevasi dari pengamat ke puncak tiang bendera"><line x1="22" y1="160" x2="535" y2="160" stroke="#8291a5" stroke-width="3"/><rect x="438" y="38" width="18" height="122" rx="4" fill="#2867e8"/><path d="M447 38 V17 l17 9 -17 9" fill="#e4a42e"/><circle cx="85" cy="113" r="8" fill="#14a99c"/><path d="M85 122 V157 M85 132 L73 147 M85 132 L98 147" stroke="#14a99c" stroke-width="5" stroke-linecap="round"/><line x1="95" y1="113" x2="447" y2="38" stroke="#df9c28" stroke-width="3" stroke-dasharray="8 6"/><line x1="85" y1="113" x2="85" y2="160" stroke="#14a99c" stroke-dasharray="4 4"/><path d="M129 113 A44 44 0 0 0 128 104" fill="none" stroke="#df9c28" stroke-width="2.5"/><text x="145" y="101" fill="#bc8421" font-size="15" font-weight="700">38°</text><text x="260" y="178" fill="#728198" font-size="13" text-anchor="middle">12 m mendatar</text><text x="465" y="74" fill="#2867e8" font-size="13" font-weight="700">Tiang</text><text x="55" y="101" fill="#0b8e84" font-size="12">Mata</text><text x="447" y="178" fill="#728198" font-size="11" text-anchor="middle">Kaki</text></svg>`,
      table: `<div class="table-wrap"><table class="data-table"><thead><tr><th>Titik</th><th>Jarak mendatar</th><th>Sudut elevasi</th></tr></thead><tbody><tr><td>A</td><td>12 m</td><td>38°</td></tr><tr><td>B</td><td>10 m</td><td>43°</td></tr></tbody></table></div>`,
      questions: [
        {
          id: 'flag-1', type: 'choice', kind: 'Memilih model',
          prompt: 'Rasio trigonometri apa yang tepat untuk menghubungkan selisih tinggi dari mata, jarak mendatar, dan sudut elevasi?',
          options: [
            { value: 'sin', label: 'Sinus: depan ÷ miring' },
            { value: 'cos', label: 'Kosinus: samping ÷ miring' },
            { value: 'tan', label: 'Tangen: depan ÷ samping' },
            { value: 'pyth', label: 'Pythagoras: jumlah kuadrat sisi' }
          ],
          answer: 'tan',
          explain: 'Tangen menghubungkan sisi depan (selisih tinggi dari mata ke puncak) dengan sisi samping (jarak mendatar). Modelnya: tan 38° = h ÷ 12.'
        },
        {
          id: 'flag-2', type: 'number', kind: 'Menghitung',
          prompt: 'Berapa selisih tinggi antara puncak tiang dan tinggi mata pengamat dari titik A? Bulatkan ke 0,1 m.',
          target: 9.4, tolerance: 0.15, unit: 'm',
          explain: 'h = 12 × tan 38° = 12 × 0,7813 ≈ 9,38 m. Jika dibulatkan satu angka di belakang koma, hasilnya 9,4 m.'
        },
        {
          id: 'flag-3', type: 'number', kind: 'Menafsirkan',
          prompt: 'Tentukan perkiraan tinggi seluruh tiang dengan menambahkan tinggi mata pengamat sebesar 1,5 m. Bulatkan ke 0,1 m.',
          target: 10.9, tolerance: 0.15, unit: 'm',
          explain: 'Tinggi tiang ≈ 9,38 + 1,5 = 10,88 m, sehingga perkiraan tinggi seluruh tiang adalah 10,9 m.'
        },
        {
          id: 'flag-4', type: 'choice', kind: 'Menganalisis data',
          prompt: 'Pengukuran dari titik B menghasilkan tinggi sekitar 10,8 m. Kesimpulan apa yang paling masuk akal jika dibandingkan dengan hasil titik A?',
          options: [
            { value: 'support', label: 'Kedua hasil saling mendukung karena nilainya berdekatan.' },
            { value: 'exact', label: 'Pengukuran salah karena hasilnya harus sama persis.' },
            { value: 'invalid', label: 'Data titik B tidak dapat digunakan karena jaraknya lebih pendek.' },
            { value: 'higher', label: 'Titik B membuktikan tinggi tiang bertambah.' }
          ],
          answer: 'support',
          explain: 'Dari titik B: 10 × tan 43° + 1,5 ≈ 10,83 m. Hasil titik A sekitar 10,88 m. Selisihnya hanya sekitar 0,05 m, sehingga hasil keduanya saling mendukung dalam konteks pengukuran lapangan.'
        }
      ]
    },
    {
      title: 'Kasus 02 · Rancangan jalur menuju perpustakaan',
      story: 'Sekolah merancang jalur miring untuk menghubungkan halaman dengan teras perpustakaan. Ketinggian teras adalah 0,72 m di atas halaman. Tim teknis mengusulkan dua rancangan: A memiliki jarak mendatar 6 m dan B memiliki jarak mendatar 8 m. Ruang mendatar yang tersedia dibatasi hingga 7 m.',
      facts: ['Kenaikan vertikal: 0,72 m', 'Jarak A: 6 m', 'Jarak B: 8 m', 'Batas ruang: 7 m'],
      visual: `<svg viewBox="0 0 560 190" role="img" aria-label="Perbandingan dua segitiga rancangan jalur miring"><path d="M22 150 L225 150 L225 104 Z" fill="#dce9ff" stroke="#2867e8" stroke-width="3"/><path d="M310 150 L535 150 L535 104 Z" fill="#d6f4ee" stroke="#14a99c" stroke-width="3"/><text x="122" y="91" fill="#2867e8" font-size="17" font-weight="800" text-anchor="middle">A</text><text x="420" y="91" fill="#0b9186" font-size="17" font-weight="800" text-anchor="middle">B</text><text x="122" y="174" fill="#2867e8" font-size="13" font-weight="700" text-anchor="middle">6 m mendatar</text><text x="420" y="174" fill="#0b9186" font-size="13" font-weight="700" text-anchor="middle">8 m mendatar</text><text x="234" y="124" fill="#2867e8" font-size="11">0,72 m</text><text x="544" y="124" fill="#0b9186" font-size="11">0,72 m</text></svg>`,
      table: `<div class="table-wrap"><table class="data-table"><thead><tr><th>Rancangan</th><th>Kenaikan vertikal</th><th>Jarak mendatar</th></tr></thead><tbody><tr><td>A</td><td>0,72 m</td><td>6 m</td></tr><tr><td>B</td><td>0,72 m</td><td>8 m</td></tr></tbody></table></div>`,
      questions: [
        {
          id: 'ramp-1', type: 'number', kind: 'Mengolah data',
          prompt: 'Hitung persentase kemiringan Rancangan A dengan rumus (kenaikan ÷ jarak mendatar) × 100%.',
          target: 12, tolerance: 0.2, unit: '%',
          explain: 'Kemiringan A = (0,72 ÷ 6) × 100% = 12%. Artinya, setiap 100 satuan jarak mendatar terdapat kenaikan 12 satuan tinggi.'
        },
        {
          id: 'ramp-2', type: 'choice', kind: 'Membandingkan',
          prompt: 'Rancangan mana yang memiliki sudut kemiringan lebih kecil (lebih landai)?',
          options: [
            { value: 'A', label: 'Rancangan A, karena jarak mendatarnya lebih pendek.' },
            { value: 'B', label: 'Rancangan B, karena kenaikan sama tetapi jarak mendatarnya lebih panjang.' },
            { value: 'same', label: 'Keduanya sama karena kenaikan vertikalnya sama.' },
            { value: 'cannot', label: 'Tidak dapat dibandingkan tanpa mengetahui panjang sisi miring.' }
          ],
          answer: 'B',
          explain: 'Untuk kenaikan yang sama, jarak mendatar yang lebih panjang menghasilkan rasio tangen dan sudut yang lebih kecil. A: 0,72/6 = 0,12; B: 0,72/8 = 0,09. Jadi B lebih landai.'
        },
        {
          id: 'ramp-3', type: 'number', kind: 'Menghitung panjang',
          prompt: 'Hitung panjang permukaan jalur Rancangan A. Bulatkan hasil ke dua angka di belakang koma.',
          target: 6.04, tolerance: 0.08, unit: 'm',
          explain: 'Panjang jalur adalah sisi miring: √(6² + 0,72²) = √36,5184 ≈ 6,04 m.'
        },
        {
          id: 'ramp-4', type: 'choice', kind: 'Mengambil keputusan',
          prompt: 'Jika batas ruang mendatar hanya 7 m, keputusan apa yang sesuai dengan data yang tersedia?',
          options: [
            { value: 'A', label: 'Pilih A karena memerlukan 6 m; B memerlukan 8 m dan melewati batas.' },
            { value: 'B', label: 'Pilih B karena lebih landai, meskipun jarak 8 m melewati batas.' },
            { value: 'both', label: 'Keduanya sesuai karena tinggi kenaikannya sama.' },
            { value: 'none', label: 'Tidak ada yang sesuai karena keduanya memiliki sisi miring.' }
          ],
          answer: 'A',
          explain: 'A membutuhkan jarak mendatar 6 m sehingga memenuhi batas 7 m. B lebih landai, tetapi membutuhkan 8 m. Keputusan ini hanya berdasarkan batas ruang; aspek keselamatan dan ketentuan teknis tetap perlu diperiksa oleh pihak berwenang.'
        }
      ]
    },
    {
      title: 'Kasus 03 · Menguatkan tiang jaringan sekolah',
      story: 'Teknisi memasang kabel penyangga dari titik ikat pada tiang jaringan menuju pasak di tanah. Panjang satu kabel 15 m dan sudut antara kabel dengan permukaan tanah adalah 52°. Ada tiga kabel identik yang akan dipasang. Teknisi menambahkan cadangan kabel sebesar 8% dari total panjang kabel terpasang.',
      facts: ['Panjang kabel: 15 m', 'Sudut terhadap tanah: 52°', 'Jumlah kabel: 3', 'Cadangan: 8%'],
      visual: `<svg viewBox="0 0 560 190" role="img" aria-label="Kabel penyangga sepanjang 15 meter membentuk sudut 52 derajat terhadap tanah"><line x1="20" y1="155" x2="535" y2="155" stroke="#8291a5" stroke-width="3"/><rect x="430" y="40" width="18" height="115" rx="4" fill="#2867e8"/><line x1="65" y1="155" x2="439" y2="40" stroke="#e4a42e" stroke-width="4"/><circle cx="65" cy="155" r="6" fill="#e4a42e"/><path d="M111 155 A46 46 0 0 0 109 141" fill="none" stroke="#14a99c" stroke-width="3"/><text x="126" y="145" fill="#0b9186" font-size="16" font-weight="700">52°</text><text x="245" y="85" fill="#b67e1f" font-size="15" font-weight="700" text-anchor="middle">15 m</text><text x="439" y="174" fill="#728198" font-size="12" text-anchor="middle">Tiang</text><text x="65" y="174" fill="#728198" font-size="12" text-anchor="middle">Pasak</text><text x="255" y="178" fill="#728198" font-size="11" text-anchor="middle">Jarak mendatar</text></svg>`,
      table: '',
      questions: [
        {
          id: 'cable-1', type: 'choice', kind: 'Memilih model',
          prompt: 'Rasio apa yang tepat untuk menentukan tinggi titik ikat jika diketahui panjang kabel dan sudut kabel terhadap tanah?',
          options: [
            { value: 'sin', label: 'Sinus: tinggi ÷ panjang kabel' },
            { value: 'cos', label: 'Kosinus: jarak mendatar ÷ panjang kabel' },
            { value: 'tan', label: 'Tangen: tinggi ÷ jarak mendatar' },
            { value: 'pyth', label: 'Pythagoras saja, tanpa rasio trigonometri' }
          ],
          answer: 'sin',
          explain: 'Tinggi adalah sisi depan terhadap sudut 52°, sedangkan kabel 15 m adalah sisi miring. Gunakan sin 52° = tinggi ÷ 15.'
        },
        {
          id: 'cable-2', type: 'number', kind: 'Menghitung tinggi',
          prompt: 'Berapa tinggi titik ikat kabel pada tiang dari permukaan tanah? Bulatkan ke 0,01 m.',
          target: 11.82, tolerance: 0.08, unit: 'm',
          explain: 'Tinggi = 15 × sin 52° ≈ 15 × 0,7880 = 11,82 m.'
        },
        {
          id: 'cable-3', type: 'number', kind: 'Menghitung jarak',
          prompt: 'Berapa jarak mendatar dari kaki tiang ke pasak kabel? Bulatkan ke 0,01 m.',
          target: 9.23, tolerance: 0.08, unit: 'm',
          explain: 'Jarak mendatar = 15 × cos 52° ≈ 15 × 0,6157 = 9,23 m.'
        },
        {
          id: 'cable-4', type: 'number', kind: 'Merencanakan kebutuhan',
          prompt: 'Hitung total kabel minimal untuk tiga kabel dengan cadangan 8%.',
          target: 48.6, tolerance: 0.15, unit: 'm',
          explain: 'Kebutuhan terpasang = 3 × 15 = 45 m. Cadangan 8% = 0,08 × 45 = 3,6 m. Jadi total minimal = 45 + 3,6 = 48,6 m.'
        }
      ]
    }
  ];

  let state = { theme: null, answers: {}, results: {} };
  let activeCase = 0;
  let toastTimer = null;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') {
        state.answers = saved.answers && typeof saved.answers === 'object' ? saved.answers : {};
        state.results = saved.results && typeof saved.results === 'object' ? saved.results : {};
        state.theme = saved.theme || null;
      }
    } catch (error) {
      state = { theme: null, answers: {}, results: {} };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // MPI tetap berjalan meskipun penyimpanan lokal dinonaktifkan browser.
    }
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function formatNumber(value, digits = 2) {
    return Number(value).toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function currentCaseQuestionIds(index) {
    return cases[index].questions.map(question => question.id);
  }

  function getCounts() {
    let checked = 0;
    let correct = 0;
    for (const item of cases) {
      for (const question of item.questions) {
        const result = state.results[question.id];
        if (result && typeof result.correct === 'boolean') {
          checked += 1;
          if (result.correct) correct += 1;
        }
      }
    }
    return { checked, correct, score: checked ? Math.round(correct / TOTAL_QUESTIONS * 100) : null };
  }

  function updateSummary() {
    const counts = getCounts();
    $('#summaryScore').textContent = counts.score === null ? '—' : String(counts.score);
    $('#summaryTitle').textContent = counts.checked === TOTAL_QUESTIONS
      ? 'Seluruh tantangan telah diperiksa.'
      : `${counts.checked} dari ${TOTAL_QUESTIONS} pertanyaan telah diperiksa.`;
    $('#summaryText').textContent = counts.checked === TOTAL_QUESTIONS
      ? `Kamu menjawab benar ${counts.correct} dari ${TOTAL_QUESTIONS} pertanyaan. Gunakan umpan balik untuk memperbaiki cara berpikirmu.`
      : `Jawaban benar saat ini ${counts.correct}. Periksa ketiga kasus untuk memperoleh rekap lengkap; skor menggunakan total ${TOTAL_QUESTIONS} pertanyaan.`;
    $('#caseProgress').textContent = `${currentCaseQuestionIds(activeCase).filter(id => state.results[id]).length}/4 diperiksa`;
  }

  function renderQuestion(question, number) {
    const savedAnswer = state.answers[question.id] ?? '';
    const result = state.results[question.id];
    let answerControl = '';
    if (question.type === 'choice') {
      answerControl = `<div class="option-list">${question.options.map(option => `
        <label class="answer-option"><input type="radio" name="${escapeHTML(question.id)}" value="${escapeHTML(option.value)}" ${String(savedAnswer) === option.value ? 'checked' : ''}><span>${escapeHTML(option.label)}</span></label>
      `).join('')}</div>`;
    } else {
      answerControl = `<label class="numeric-answer"><input type="text" inputmode="decimal" autocomplete="off" name="${escapeHTML(question.id)}" value="${escapeHTML(savedAnswer)}" placeholder="Masukkan angka" aria-label="Jawaban pertanyaan ${number}"><span>${escapeHTML(question.unit)}</span></label>`;
    }
    const feedback = result ? `<div class="question-feedback ${result.correct ? 'correct' : 'incorrect'}"><strong>${result.correct ? '✓ Tepat!' : '↗ Belum tepat, pelajari kembali.'}</strong>${escapeHTML(question.explain)}</div>` : '';
    return `<article class="question-card" data-question-id="${escapeHTML(question.id)}">
      <div class="question-top"><span class="question-number">${number}</span><span class="question-kind">${escapeHTML(question.kind)}</span></div>
      <p class="question-prompt">${escapeHTML(question.prompt)}</p>
      ${answerControl}
      ${feedback}
    </article>`;
  }

  function renderCase(index) {
    activeCase = index;
    const item = cases[index];
    $$('.case-choice').forEach(button => {
      const active = Number(button.dataset.openCase) === index;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#workspaceTitle').textContent = item.title;
    $('#caseStory').innerHTML = `<p class="story-text">${escapeHTML(item.story)}</p><div class="fact-grid">${item.facts.map(fact => `<span class="fact-chip">${escapeHTML(fact)}</span>`).join('')}</div><div class="case-visual">${item.visual}</div>${item.table}`;
    $('#questionList').innerHTML = item.questions.map((question, i) => renderQuestion(question, i + 1)).join('');
    $('#caseHint').textContent = 'Isi semua pertanyaan yang dapat kamu jawab, lalu periksa untuk melihat umpan balik.';
    updateSummary();
  }

  function readAnswer(question) {
    if (question.type === 'choice') {
      const selected = $(`input[name="${CSS.escape(question.id)}"]:checked`, $('#questionList'));
      return selected ? selected.value : '';
    }
    const input = $(`input[name="${CSS.escape(question.id)}"]`, $('#questionList'));
    return input ? input.value.trim() : '';
  }

  function evaluate(question, rawAnswer) {
    if (question.type === 'choice') return rawAnswer === question.answer;
    if (rawAnswer === '') return false;
    const normalized = String(rawAnswer).trim().replace(/\s/g, '').replace(',', '.');
    if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) return false;
    const numeric = Number(normalized);
    return Number.isFinite(numeric) && Math.abs(numeric - question.target) <= question.tolerance;
  }

  function checkActiveCase(event) {
    event.preventDefault();
    const item = cases[activeCase];
    let answered = 0;
    for (const question of item.questions) {
      const answer = readAnswer(question);
      if (answer === '') {
        delete state.results[question.id];
        continue;
      }
      answered += 1;
      state.answers[question.id] = answer;
      state.results[question.id] = { correct: evaluate(question, answer) };
    }
    if (!answered) {
      showToast('Isi setidaknya satu jawaban terlebih dahulu.');
      return;
    }
    saveState();
    renderCase(activeCase);
    const count = item.questions.filter(question => state.results[question.id]).filter(question => state.results[question.id].correct).length;
    showToast(`Kasus diperiksa: ${count} dari ${answered} jawaban benar.`);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    state.theme = theme;
    $('#themeIcon').textContent = theme === 'dark' ? '☼' : '◐';
    $('#themeToggle').setAttribute('aria-label', theme === 'dark' ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
    saveState();
  }

  function updateCalculator() {
    const angleInput = $('#angleRange');
    const distanceInput = $('#distanceInput');
    const eyeInput = $('#eyeInput');
    const angle = Number(angleInput.value);
    const distance = Number(distanceInput.value);
    const eye = Number(eyeInput.value);
    $('#angleValue').textContent = `${angle}°`;
    $('#calcAngleText').textContent = `${angle}°`;
    const rise = Math.min(115, Math.max(14, Math.tan(angle * Math.PI / 180) * 105));
    const yTop = 165 - rise;
    $('#calcSight').setAttribute('y2', String(yTop));
    const pole = $('#calcPole');
    if (pole) {
      pole.setAttribute('y', String(yTop));
      pole.setAttribute('height', String(205 - yTop));
    }
    if (!Number.isFinite(distance) || distance <= 0 || distance > 100 || !Number.isFinite(eye) || eye < 0 || eye > 3) {
      $('#heightDifference').innerHTML = '— <small>m</small>';
      $('#objectHeight').innerHTML = '— <small>m</small>';
      return;
    }
    const difference = distance * Math.tan(angle * Math.PI / 180);
    const total = difference + eye;
    $('#heightDifference').innerHTML = `${formatNumber(difference)} <small>m</small>`;
    $('#objectHeight').innerHTML = `${formatNumber(total)} <small>m</small>`;
  }

  function init() {
    loadState();
    const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(state.theme || preferredTheme);
    renderCase(0);
    updateCalculator();
    $('#yearNow').textContent = String(new Date().getFullYear());

    $$('.case-choice').forEach(button => button.addEventListener('click', () => renderCase(Number(button.dataset.openCase))));
    $('#caseForm').addEventListener('submit', checkActiveCase);
    $('#questionList').addEventListener('change', event => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const questionId = input.name;
      if (!questionId) return;
      state.answers[questionId] = input.value;
      delete state.results[questionId];
      saveState();
      updateSummary();
      const feedback = input.closest('.question-card')?.querySelector('.question-feedback');
      if (feedback) feedback.remove();
    });
    $('#questionList').addEventListener('input', event => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type === 'radio') return;
      state.answers[input.name] = input.value;
      delete state.results[input.name];
      saveState();
      updateSummary();
      const feedback = input.closest('.question-card')?.querySelector('.question-feedback');
      if (feedback) feedback.remove();
    });

    $('#themeToggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#fullscreenToggle').addEventListener('click', async () => {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      } catch (error) {
        showToast('Mode layar penuh tidak tersedia pada browser ini.');
      }
    });
    document.addEventListener('fullscreenchange', () => {
      $('#fullscreenToggle').setAttribute('aria-label', document.fullscreenElement ? 'Keluar dari layar penuh' : 'Aktifkan layar penuh');
    });

    ['angleRange', 'distanceInput', 'eyeInput'].forEach(id => {
      $(`#${id}`).addEventListener('input', updateCalculator);
      $(`#${id}`).addEventListener('change', updateCalculator);
    });
    $('#printAll').addEventListener('click', () => window.print());
    $('#resetProgress').addEventListener('click', () => {
      const confirmed = window.confirm('Hapus jawaban dan hasil latihan yang tersimpan pada perangkat ini?');
      if (!confirmed) return;
      state.answers = {};
      state.results = {};
      saveState();
      renderCase(activeCase);
      showToast('Progres latihan telah diatur ulang.');
    });

    const menuToggle = $('#menuToggle');
    const mobileNav = $('#mobileNav');
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    });
    $$('#mobileNav a').forEach(link => link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
