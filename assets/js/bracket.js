/* =========================================================
   Torneo — motore generico del tabellone (stile mondiale).
   8 sopra e 8 sotto che convergono verso la finale al centro,
   ciascuna partita con i due sfidanti affiancati orizzontalmente.
   Usato da tutte le pagine di gioco.
   ========================================================= */

(function (global) {
  'use strict';

  const ROUND_LABELS = {
    8: 'Ottavi di Finale',
    4: 'Quarti di Finale',
    2: 'Semifinale',
    1: 'Finale'
  };

  const ROW_H_FALLBACK = 180; // usato solo prima della prima misura reale

  function roundLabel(matchCount) {
    return ROUND_LABELS[matchCount] || `Turno (${matchCount})`;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  class TorneoBracket {
    constructor(opts) {
      this.title = opts.title;
      this.emoji = opts.emoji || '🏆';
      this.description = opts.description || '';
      this.backLink = opts.backLink || 'index.html';
      this.categoryKey = opts.categoryKey || null;
      this.container = document.getElementById(opts.containerId || 'app');
      this.random = opts.random !== false;

      let participants = opts.participants.slice();
      if (this.random) participants = shuffle(participants);

      // Se in una cartella ci sono più elementi del necessario, ne
      // prendiamo solo "size" a caso (16 di default) per la partita.
      const size = opts.size || 16;
      if (participants.length > size) participants = participants.slice(0, size);

      const totalRounds = Math.log2(participants.length);
      if (!Number.isInteger(totalRounds) || totalRounds < 2) {
        console.error('Servono almeno 4 partecipanti, in numero pari a una potenza di 2 (4, 8, 16, 32...).');
      }

      this.participants = participants;
      const half = participants.length / 2;
      // "top" e "bottom" sono i due metà-tabelloni (sopra/sotto) che
      // convergono verso la finale al centro — l'equivalente ruotato di
      // "sinistra/destra".
      this.top = { rounds: this._buildRoundsFor(participants.slice(0, half)) };
      this.bottom = { rounds: this._buildRoundsFor(participants.slice(half)) };
      this.final = { a: null, b: null, winner: null };

      this._renderShell();
      this.render();
    }

    // Calcola quanto grande può essere la foto di ciascun turno in modo che
    // l'INTERO tabellone — tutte le righe-turno impilate, tutte le partite
    // di una riga affiancate — entri nello schermo sia in verticale che in
    // orizzontale, senza bisogno di scorrere. È la versione "ruotata di 90°"
    // dello stesso identico algoritmo usato quando i turni erano colonne
    // affiancate orizzontalmente invece di righe impilate verticalmente:
    //  1) misura quanto spazio "di contorno" occupa una partita (ora
    //     orizzontale: i due sfidanti affiancati) rendendone una di prova
    //     con una foto di riferimento nota, in un contenitore FISSO e
    //     separato dal tabellone vero e proprio (se lo svuotassimo e
    //     misurassimo dentro di esso, per un istante la pagina diventerebbe
    //     più corta e il browser forzerebbe lo scroll in cima — bug: "torna
    //     su" ad ogni click — ecco perché il box di misura vive fuori dal
    //     flusso);
    //  2) l'asse "semplice" ora è la LARGHEZZA (le partite degli ottavi,
    //     affiancate, dividono equamente lo spazio orizzontale disponibile:
    //     è l'equivalente ruotato di come prima l'ALTEZZA si divideva per
    //     le righe impilate); da lì calcola la foto "ideale" turno per
    //     turno (i turni successivi hanno celle più larghe — coprono più
    //     colonne-unità — quindi possono avere foto più grandi);
    //  3) l'asse "vincolato" ora è l'ALTEZZA (le 7 righe-turno impilate
    //     devono starci tutte): se le altezze ideali sforano, le
    //     rimpicciolisce verso un'altezza minima comune interpolando in
    //     proporzione, così gli ottavi restano leggibili e la crescita
    //     verso la finale resta visibile, solo più contenuta.
    _computeLayout() {
      const leafCols = this.top.rounds[0].length;
      const roundsPerSide = this.top.rounds.length;
      const REF_THUMB = 100;
      const ROW_GAP = 10;
      document.documentElement.style.setProperty('--thumb-h', REF_THUMB + 'px');
      document.documentElement.style.setProperty('--row-gap', ROW_GAP + 'px');

      // Match di prova orizzontale (i due sfidanti affiancati): misuriamo
      // l'ingombro "di contorno" attorno a una foto in altezza (chromeH) e
      // attorno a due foto affiancate in larghezza (chromeW).
      const [longestA, longestB] = this._widestParticipants(2);
      const sample = { a: longestA, b: longestB, winner: null };
      const matchEl = this._renderMatch(sample, () => {});
      this._measureBox.appendChild(matchEl);
      const rect = matchEl.getBoundingClientRect();
      const sampleHeight = Math.ceil(rect.height);
      const sampleWidth = Math.ceil(rect.width);
      matchEl.remove();
      const refThumbW = REF_THUMB * 4 / 3;
      const chromeH = Math.max(0, sampleHeight - REF_THUMB);
      const chromeW = Math.max(0, sampleWidth - refThumbW * 2);

      const wrap = this.container.querySelector('.bracket-wrap');
      const wrapH = wrap ? wrap.clientHeight : 0;
      const wrapW = wrap ? wrap.clientWidth : 0;
      const BRACKET_PADDING_V = 8; // deve rispecchiare il padding verticale di .bracket
      const BRACKET_PADDING_H = 12; // deve rispecchiare il padding orizzontale di .bracket
      const WRAP_PADDING_H = 32; // deve rispecchiare il padding orizzontale di .bracket-wrap
      const LABEL_W = 96; // spazio fisso per l'etichetta a sinistra di ogni riga-turno
      const MIN_THUMB = 44; // il segno di spunta ora sporge fuori dall'angolo della card, non serve più tenerlo grande per evitare sovrapposizioni con la didascalia
      const MAX_THUMB = 320;
      const MIN_ROW_H = 58; // altezza minima di una riga-turno (foto minima + contorno)

      // --- Budget orizzontale (asse semplice): le partite della riga più
      // affollata (gli ottavi, leafCols partite affiancate) fissano
      // un'unità di larghezza costante, condivisa da ogni riga-turno. ---
      const availableW = Math.max(0, wrapW - WRAP_PADDING_H - BRACKET_PADDING_H - LABEL_W);
      const unitW = leafCols > 0 ? Math.floor(availableW / leafCols) : availableW;

      const spans = [];
      for (let r = 0; r < roundsPerSide; r++) spans.push(Math.pow(2, r));
      const spanSet = new Set(spans);
      spanSet.add(leafCols); // la finale copre la stessa larghezza della semifinale

      // Larghezza "ideale" della foto per ciascun turno, vincolata solo
      // dalla larghezza disponibile (semplice/diretta, come prima lo era
      // l'altezza-riga).
      const idealThumbWBySpan = new Map();
      spanSet.forEach((span) => {
        const cellW = unitW * span;
        const raw = Math.floor((cellW - chromeW) / 2);
        idealThumbWBySpan.set(span, Math.min(MAX_THUMB * 4 / 3, Math.max(MIN_THUMB * 4 / 3, raw)));
      });
      const idealRowH = (span) => (idealThumbWBySpan.get(span) * 3 / 4) + chromeH;

      // --- Budget verticale (asse vincolato): tutte le righe-turno
      // impilate (ottavi, quarti, semifinale, finale, semifinale, quarti,
      // ottavi) devono starci. Agli OTTAVI (il primo turno) viene data la
      // PRIORITÀ: prendono tutta l'altezza che il loro ideale — vincolato
      // solo dalla larghezza della colonna — consente, anche a scapito
      // della crescita progressiva dei turni successivi. I turni
      // successivi si dividono quel che resta. ---
      const allRowSpans = [...spans, leafCols, ...[...spans].reverse()];
      const gapsTotal = ROW_GAP * (allRowSpans.length - 1);
      const availableH = Math.max(0, wrapH - BRACKET_PADDING_V - gapsTotal);

      const ottaviRows = allRowSpans.filter((s) => s === 1).length;
      const otherRowSpans = allRowSpans.filter((s) => s !== 1);

      const ottaviIdealH = Math.max(MIN_ROW_H, idealRowH(1));
      const otherMinTotal = MIN_ROW_H * otherRowSpans.length;
      const ottaviBudget = Math.max(MIN_ROW_H * ottaviRows, availableH - otherMinTotal);
      const ottaviRowH = Math.min(ottaviIdealH, ottaviBudget / ottaviRows);

      const remainingH = Math.max(0, availableH - ottaviRowH * ottaviRows);
      const otherIdealTotal = otherRowSpans.reduce((sum, span) => sum + Math.max(MIN_ROW_H, idealRowH(span)), 0);

      let t; // 0 = turni successivi al minimo, 1 = turni successivi al loro ideale
      if (otherIdealTotal <= otherMinTotal) {
        t = remainingH >= otherMinTotal ? 1 : 0;
      } else {
        t = Math.max(0, Math.min(1, (remainingH - otherMinTotal) / (otherIdealTotal - otherMinTotal)));
      }

      const sizeBySpan = new Map();
      spanSet.forEach((span) => {
        const rowH = span === 1
          ? Math.round(ottaviRowH)
          : Math.round(MIN_ROW_H + t * (Math.max(MIN_ROW_H, idealRowH(span)) - MIN_ROW_H));
        const heightDerivedThumbH = Math.max(MIN_THUMB, Math.floor(rowH - chromeH));
        // La larghezza "ideale" (quella che il budget orizzontale può
        // garantire per questo turno) resta SEMPRE il tetto massimo: quando
        // MIN_ROW_H allarga la riga oltre quanto l'immagine richiederebbe,
        // quello spazio extra resta margine vuoto, non viene usato per
        // ingrandirla oltre la larghezza disponibile (altrimenti le
        // partite affiancate sforerebbero lo schermo).
        const idealThumbH = idealThumbWBySpan.get(span) * 3 / 4;
        const thumbH = Math.round(Math.max(MIN_THUMB, Math.min(idealThumbH, heightDerivedThumbH)));
        // Se il pavimento MIN_THUMB ha forzato una foto più alta di quanto
        // l'altezza di riga interpolata prevedesse, la riga deve crescere
        // di conseguenza: altrimenti la partita del turno successivo le
        // si sovrapporrebbe.
        const finalRowH = Math.max(rowH, thumbH + chromeH);
        sizeBySpan.set(span, { thumbH, rowH: finalRowH });
      });

      this._sizeBySpan = sizeBySpan;
      this._unitW = unitW;
      document.documentElement.style.setProperty('--thumb-h', sizeBySpan.get(1).thumbH + 'px');
    }

    // Dimensione (foto + riga) già calcolata da _computeLayout per un
    // turno la cui cella copre "span" unità-colonna (2 per i quarti, 4 per
    // la semifinale, ecc.).
    _sizeForSpan(span) {
      return this._sizeBySpan.get(span) || this._sizeBySpan.get(1);
    }

    _widestParticipants(n) {
      const probe = document.createElement('span');
      probe.style.cssText = 'position:fixed; top:-9999px; left:-9999px; white-space:nowrap; font-size:0.78rem; font-weight:600;';
      document.body.appendChild(probe);
      const ranked = this.participants
        .filter((p) => p && p.name)
        .map((p) => {
          probe.textContent = p.name;
          return { p, w: probe.getBoundingClientRect().width };
        })
        .sort((a, b) => b.w - a.w);
      probe.remove();
      const top = ranked.slice(0, n).map((x) => x.p);
      while (top.length < n) top.push(this.participants[0]);
      return top;
    }

    _buildRoundsFor(participantsArr) {
      const numRounds = Math.log2(participantsArr.length);
      const rounds = [];
      const first = [];
      for (let i = 0; i < participantsArr.length; i += 2) {
        first.push({ a: participantsArr[i], b: participantsArr[i + 1], winner: null });
      }
      rounds.push(first);

      for (let r = 1; r < numRounds; r++) {
        const count = rounds[r - 1].length / 2;
        const matches = [];
        for (let i = 0; i < count; i++) matches.push({ a: null, b: null, winner: null });
        rounds.push(matches);
      }
      return rounds;
    }

    _renderShell() {
      this.container.innerHTML = `
        <header class="torneo-header">
          <a class="back-link" href="${this.backLink}">&larr; Categorie</a>
          <h1 class="torneo-title"><span class="emoji">${this.emoji}</span>${this.title}</h1>
          <p class="torneo-desc">${this.description}</p>
          <span class="round-indicator" id="roundIndicator"></span>
          <p class="scroll-hint">↕ Scorri per vedere tutti i turni ↕</p>
        </header>
        <div class="bracket-wrap">
          <div class="bracket" id="bracketEl">
            <svg class="connectors" id="connectorsSvg"></svg>
          </div>
        </div>
        <div class="winner-overlay" id="winnerOverlay">
          <button class="lightbox-close" id="winnerClose" aria-label="Torna al tabellone">✕</button>
          <div class="winner-card">
            <div class="trophy">🏆</div>
            <div class="label">Il vincitore è</div>
            <div class="frame">
              <img id="winnerImg" alt="">
              <div class="frame-flag" id="winnerFlag"></div>
            </div>
            <h2 id="winnerName"></h2>
            <button class="btn winner-play-btn" id="winnerPlayBtn" type="button" aria-label="Riproduci il brano vincitore" style="display:none"></button>
            <p class="sub">Grazie per aver giocato!</p>
            <div class="winner-actions">
              <button class="btn" id="podiumBtn" type="button">🏅 Podio</button>
              <button class="btn" id="historyBtn" type="button">📜 Storico</button>
              <button class="btn btn-primary" id="restartBtn" type="button">↻ Rigioca</button>
            </div>
          </div>
        </div>
        <div class="podium-overlay" id="podiumOverlay">
          <button class="lightbox-close" id="podiumClose" aria-label="Chiudi il podio">✕</button>
          <div class="podium-card">
            <canvas id="podiumCanvas"></canvas>
            <div class="podium-actions">
              <button class="btn btn-primary" id="podiumDownloadBtn" type="button">📥 Salva Immagine</button>
              <button class="btn" id="podiumShareBtn" type="button" style="display:none">📤 Condividi</button>
            </div>
          </div>
        </div>
        <div class="history-overlay" id="historyOverlay">
          <button class="lightbox-close" id="historyClose" aria-label="Chiudi lo storico">✕</button>
          <div class="history-card">
            <h2>📜 Storico Risultati</h2>
            <div class="history-fav" id="historyFav"></div>
            <div class="history-list" id="historyList"></div>
          </div>
        </div>
        <div class="lightbox" id="lightbox">
          <button class="lightbox-close" id="lightboxClose">✕</button>
          <img id="lightboxImg" alt="">
          <div class="lightbox-name" id="lightboxName"></div>
        </div>
      `;

      this._measureBox = el('div', 'round round-leaf');
      this._measureBox.style.position = 'fixed';
      this._measureBox.style.top = '0';
      this._measureBox.style.left = '-9999px';
      this._measureBox.style.visibility = 'hidden';
      this._measureBox.style.pointerEvents = 'none';
      // Non ereditare larghezze fisse da colonne/righe: qui dentro dobbiamo
      // misurare la dimensione NATURALE del match, non quella imposta da un
      // contenitore — altrimenti la misura risulterebbe falsata.
      this._measureBox.style.width = 'max-content';
      document.body.appendChild(this._measureBox);

      // Riproduzione audio (categorie tipo "musica"): un solo elemento
      // <audio> condiviso, riusato per qualsiasi brano venga fatto partire.
      this._audioEl = new Audio();
      this._playingId = null;
      this._playingBtn = null;
      this._audioEl.addEventListener('ended', () => this._setPlayingState(null, null));

      this.bracketEl = this.container.querySelector('#bracketEl');
      this.svg = this.container.querySelector('#connectorsSvg');
      this.roundIndicator = this.container.querySelector('#roundIndicator');
      this.overlay = this.container.querySelector('#winnerOverlay');
      this.lightbox = this.container.querySelector('#lightbox');
      this.lightboxImg = this.container.querySelector('#lightboxImg');
      this.lightboxName = this.container.querySelector('#lightboxName');
      this.podiumOverlay = this.container.querySelector('#podiumOverlay');
      this.historyOverlay = this.container.querySelector('#historyOverlay');

      this.container.querySelector('#restartBtn').addEventListener('click', () => {
        location.reload();
      });

      this.container.querySelector('#lightboxClose').addEventListener('click', () => this._closeLightbox());
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) this._closeLightbox();
      });

      // L'overlay del vincitore si può chiudere senza ricaricare la pagina,
      // per poter tornare indietro e cambiare una scelta anche a torneo finito.
      this.container.querySelector('#winnerClose').addEventListener('click', () => {
        this.overlay.classList.remove('show');
      });
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.overlay.classList.remove('show');
      });

      this.container.querySelector('#podiumBtn').addEventListener('click', () => this._openPodium());
      this.container.querySelector('#podiumClose').addEventListener('click', () => {
        this.podiumOverlay.classList.remove('show');
      });
      this.podiumOverlay.addEventListener('click', (e) => {
        if (e.target === this.podiumOverlay) this.podiumOverlay.classList.remove('show');
      });
      this.container.querySelector('#podiumDownloadBtn').addEventListener('click', () => this._downloadPodiumImage());
      this.container.querySelector('#podiumShareBtn').addEventListener('click', () => this._sharePodiumImage());

      this.container.querySelector('#historyBtn').addEventListener('click', () => this._openHistory());
      this.container.querySelector('#historyClose').addEventListener('click', () => {
        this.historyOverlay.classList.remove('show');
      });
      this.historyOverlay.addEventListener('click', (e) => {
        if (e.target === this.historyOverlay) this.historyOverlay.classList.remove('show');
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this._closeLightbox();
          this.overlay.classList.remove('show');
          this.podiumOverlay.classList.remove('show');
          this.historyOverlay.classList.remove('show');
        }
      });

      this.winnerPlayBtn = this.container.querySelector('#winnerPlayBtn');

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => this.render(), 150);
      });
    }

    _openLightbox(participant) {
      this.lightboxImg.src = participant.img;
      this.lightboxImg.alt = participant.name;
      this.lightboxName.textContent = participant.name;
      this.lightbox.classList.add('show');
    }

    _closeLightbox() {
      this.lightbox.classList.remove('show');
    }

    // Play/pausa per le categorie audio (es. "musica"): un solo brano alla
    // volta. Il bottone non mostra testo in JS: l'icona ▶/⏸ arriva dal CSS
    // in base alla classe "playing", così funziona identico sia sulle card
    // del tabellone sia sul bottone della finale/vincitore.
    _togglePlay(participant, btn) {
      if (this._playingId === participant.id) {
        this._audioEl.pause();
        this._setPlayingState(null, null);
        return;
      }
      this._audioEl.src = participant.audio;
      this._audioEl.currentTime = 0;
      this._audioEl.play().catch(() => {});
      this._setPlayingState(participant.id, btn);
    }

    _setPlayingState(id, btn) {
      if (this._playingBtn) this._playingBtn.classList.remove('playing');
      this._playingId = id;
      this._playingBtn = btn;
      if (btn) btn.classList.add('playing');
    }

    render() {
      // Ricostruire il tabellone butta via le card correnti: fermiamo
      // l'eventuale brano in riproduzione per non lasciarlo "orfano" senza
      // più un bottone visibile che lo controlli.
      this._audioEl.pause();
      this._setPlayingState(null, null);

      // La misura va fatta PRIMA di toccare il DOM del tabellone: leggere
      // getBoundingClientRect forza un layout dell'INTERA pagina (non solo
      // dell'elemento misurato), quindi se il tabellone fosse già stato
      // svuotato la pagina risulterebbe momentaneamente più corta e il
      // browser forzerebbe lo scroll in cima.
      this._computeLayout();

      [...this.bracketEl.children].forEach((c) => {
        if (c !== this.svg) c.remove();
      });

      const top = this._renderSide('top');
      const finalRow = this._renderFinalRow();
      const bottom = this._renderSide('bottom');

      this.bracketEl.appendChild(top.sideEl);
      this.bracketEl.appendChild(finalRow.rowEl);
      this.bracketEl.appendChild(bottom.sideEl);

      this._topRoundEls = top.roundEls;
      this._bottomRoundEls = bottom.roundEls;
      this._finalMatchEl = finalRow.matchEl;

      this._updateRoundIndicator();
      requestAnimationFrame(() => this._drawConnectors());
    }

    _renderSide(key) {
      const sideObj = this[key];
      const totalLeaves = sideObj.rounds[0].length;
      const sideEl = el('div', 'side side-' + key);
      const rows = [];

      sideObj.rounds.forEach((matches, r) => {
        const span = Math.pow(2, r);
        const row = el('div', r === 0 ? 'round round-leaf' : 'round');
        const { thumbH, rowH } = this._sizeForSpan(span);
        row.style.setProperty('--thumb-h', thumbH + 'px');
        row.style.height = rowH + 'px';

        const label = el('div', 'round-label', roundLabel(matches.length * 2));
        row.appendChild(label);

        const grid = el('div', 'round-grid');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${totalLeaves}, ${this._unitW}px)`;
        grid.style.gridTemplateRows = 'minmax(0, 1fr)';
        grid.style.rowGap = '0';
        grid.style.columnGap = '0';

        const matchEls = [];
        matches.forEach((m, j) => {
          const start = j * span + 1;
          const cell = el('div');
          cell.style.gridColumn = `${start} / span ${span}`;
          cell.style.display = 'flex';
          cell.style.justifyContent = 'center';
          cell.style.padding = '0 2px';

          const matchEl = this._renderMatch(m, (side) => this._selectSideWinner(key, r, j, side));
          matchEls.push(matchEl);
          cell.appendChild(matchEl);
          grid.appendChild(cell);
        });

        row.appendChild(grid);
        rows.push({ rowEl: row, matchEls });
      });

      // sul lato "bottom" le righe vanno specchiate: la semifinale vicino
      // al centro, gli ottavi verso il bordo esterno (in basso).
      const order = key === 'bottom' ? [...rows].reverse() : rows;
      order.forEach((rw) => sideEl.appendChild(rw.rowEl));

      return { sideEl, roundEls: rows.map((rw) => rw.matchEls) };
    }

    _renderFinalRow() {
      const row = el('div', 'round final-round final-row');
      // La finale è la partita più importante e, come la semifinale, ha a
      // disposizione tutta la larghezza del tabellone: le diamo la stessa
      // foto grande.
      const leafCols = this.top.rounds[0].length;
      const { thumbH, rowH } = this._sizeForSpan(leafCols);
      row.style.setProperty('--thumb-h', thumbH + 'px');
      row.style.height = rowH + 'px';
      const label = el('div', 'round-label', roundLabel(1));
      row.appendChild(label);
      const matchEl = this._renderMatch(this.final, (side) => this._selectFinalWinner(side));
      row.appendChild(matchEl);
      return { rowEl: row, matchEl };
    }

    _renderMatch(match, onSelect) {
      const wrap = el('div', 'match');
      wrap.appendChild(this._renderSlot(match, 'a', onSelect));
      wrap.appendChild(this._renderSlot(match, 'b', onSelect));
      return wrap;
    }

    _renderSlot(match, side, onSelect) {
      const participant = match[side];
      const isTbd = !participant;
      const isWinner = match.winner && participant && match.winner.id === participant.id;
      const isEliminated = match.winner && participant && !isWinner;
      // Una volta noti entrambi gli sfidanti, lo slot resta sempre cliccabile:
      // si può scegliere, cambiare idea (scambiare il vincitore) o annullare
      // la scelta ricliccando chi ha già vinto, a qualsiasi turno.
      const selectable = !isTbd && match.a && match.b;

      const slot = el('div', 'slot');
      if (isTbd) slot.classList.add('tbd');
      if (isWinner) slot.classList.add('winner');
      if (isEliminated) slot.classList.add('eliminated');
      if (selectable) slot.classList.add('clickable');

      const thumb = el('div', 'thumb');
      if (participant && participant.audio) {
        // Categorie audio: copertina (album/artista/brano) al posto della
        // foto, con un bottone play/pausa per ascoltare il brano. Se la
        // copertina non è disponibile, ricade sulla bandiera come prima.
        const img = document.createElement('img');
        img.src = participant.img;
        img.alt = participant.name;
        img.loading = 'lazy';
        img.onerror = () => {
          thumb.classList.add('thumb-flag');
          const flagSvg = global.TorneoFlags && global.TorneoFlags[participant.flagCode];
          img.remove();
          thumb.insertAdjacentHTML('afterbegin', flagSvg || '🎵');
        };
        thumb.appendChild(img);

        const playBtn = el('button', 'play-btn');
        playBtn.type = 'button';
        playBtn.setAttribute('aria-label', `Riproduci ${participant.name}`);
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._togglePlay(participant, playBtn);
        });
        thumb.appendChild(playBtn);
      } else if (participant) {
        const img = document.createElement('img');
        img.src = participant.img;
        img.alt = participant.name;
        img.loading = 'lazy';
        thumb.appendChild(img);

        const zoomBtn = el('button', 'zoom-btn', '🔍');
        zoomBtn.type = 'button';
        zoomBtn.setAttribute('aria-label', `Ingrandisci ${participant.name}`);
        zoomBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._openLightbox(participant);
        });
        thumb.appendChild(zoomBtn);
      }

      // Nome (ed eventuale paese) come didascalia sovrapposta in basso sulla
      // foto, invece che in un blocco separato: libera spazio per la foto.
      const caption = el('div', 'caption');
      if (participant && participant.country) {
        caption.appendChild(el('div', 'country', participant.country));
      }
      const name = el('div', 'name', isTbd ? 'Da definire' : participant.name);
      if (!isTbd) name.title = participant.name;
      caption.appendChild(name);

      slot.appendChild(thumb);
      // La didascalia è "fratella" della foto (non dentro di essa): la foto
      // ha overflow:hidden per gli angoli arrotondati, ma un nome lungo che
      // va su più righe non deve mai restare tagliato/invisibile sotto quel
      // ritaglio — meglio che sporga leggermente sopra la foto che perdere
      // del testo.
      slot.appendChild(caption);

      if (selectable) {
        slot.addEventListener('click', () => onSelect(side));
        slot.title = isWinner
          ? 'Clicca per annullare questa scelta'
          : match.winner
            ? 'Clicca per scegliere questo invece'
            : 'Clicca per scegliere questo';
      }

      return slot;
    }

    // Selezionare uno sfidante è sempre permesso, anche se il match era già
    // deciso: se si sceglie chi aveva già vinto, la scelta viene annullata
    // (il match torna indeciso); se si sceglie l'altro, il vincitore viene
    // scambiato. In entrambi i casi, tutto ciò che nei turni successivi
    // dipendeva dal vecchio vincitore viene ripulito a cascata, così il
    // tabellone resta sempre coerente a qualunque turno si torni indietro.
    _selectSideWinner(key, r, matchIndex, side) {
      const rounds = this[key].rounds;
      const match = rounds[r][matchIndex];
      const clicked = match[side];

      if (match.winner === clicked) {
        this._clearDownstreamOf(key, r, matchIndex);
        match.winner = null;
      } else {
        if (match.winner) this._clearDownstreamOf(key, r, matchIndex);
        match.winner = clicked;
        this._propagateWinner(key, r, matchIndex, clicked);
      }

      this.render();
      this._maybeShowWinner();
    }

    _propagateWinner(key, r, matchIndex, winner) {
      const rounds = this[key].rounds;
      if (r + 1 < rounds.length) {
        const nextMatch = rounds[r + 1][Math.floor(matchIndex / 2)];
        const nextSlot = matchIndex % 2 === 0 ? 'a' : 'b';
        nextMatch[nextSlot] = winner;
      } else {
        this.final[key === 'top' ? 'a' : 'b'] = winner;
      }
    }

    // Ripulisce a cascata tutto ciò che, nei turni successivi di questo
    // lato (fino alla finale), era stato costruito sopra al vincitore
    // attuale del match (r, matchIndex), prima che quel vincitore cambi
    // o venga annullato.
    _clearDownstreamOf(key, r, matchIndex) {
      const rounds = this[key].rounds;
      if (r + 1 < rounds.length) {
        const nextIndex = Math.floor(matchIndex / 2);
        const nextMatch = rounds[r + 1][nextIndex];
        const nextSlot = matchIndex % 2 === 0 ? 'a' : 'b';
        if (nextMatch.winner) {
          this._clearDownstreamOf(key, r + 1, nextIndex);
          nextMatch.winner = null;
        }
        nextMatch[nextSlot] = null;
      } else {
        if (this.final.winner) {
          this.final.winner = null;
          this.overlay.classList.remove('show');
        }
        this.final[key === 'top' ? 'a' : 'b'] = null;
      }
    }

    _selectFinalWinner(side) {
      const clicked = this.final[side];
      if (this.final.winner === clicked) {
        this.final.winner = null;
        this.overlay.classList.remove('show');
      } else {
        this.final.winner = clicked;
      }
      this.render();
      this._maybeShowWinner();
    }

    _maybeShowWinner() {
      if (this._isComplete()) {
        setTimeout(() => this._showWinner(this.final.winner), 650);
      }
    }

    _isComplete() {
      return !!this.final.winner;
    }

    _sideProgress(key) {
      const rounds = this[key].rounds;
      const idx = rounds.findIndex((matches) => matches.some((m) => !m.winner && m.a && m.b));
      return idx === -1 ? rounds.length : idx;
    }

    _updateRoundIndicator() {
      if (this._isComplete()) {
        this.roundIndicator.textContent = 'Torneo completato';
        return;
      }
      const topIdx = this._sideProgress('top');
      const bottomIdx = this._sideProgress('bottom');
      const minIdx = Math.min(topIdx, bottomIdx);
      const sideRounds = this.top.rounds;

      if (minIdx < sideRounds.length) {
        this.roundIndicator.textContent = roundLabel(sideRounds[minIdx].length * 2);
      } else {
        this.roundIndicator.textContent = roundLabel(1);
      }
    }

    _drawConnectors() {
      this.svg.setAttribute('width', this.bracketEl.scrollWidth);
      this.svg.setAttribute('height', this.bracketEl.scrollHeight);
      this.svg.innerHTML = '';

      this._drawSideConnectors(this._topRoundEls);
      this._drawSideConnectors(this._bottomRoundEls);

      const topLast = this._topRoundEls[this._topRoundEls.length - 1][0];
      const bottomLast = this._bottomRoundEls[this._bottomRoundEls.length - 1][0];
      if (topLast) this._drawElbow(topLast, topLast, this._finalMatchEl);
      if (bottomLast) this._drawElbow(bottomLast, bottomLast, this._finalMatchEl);
    }

    _drawSideConnectors(roundEls) {
      for (let r = 0; r < roundEls.length - 1; r++) {
        const sources = roundEls[r];
        const targets = roundEls[r + 1];
        targets.forEach((targetEl, t) => {
          const s1 = sources[t * 2];
          const s2 = sources[t * 2 + 1];
          if (!s1 || !s2) return;
          this._drawElbow(s1, s2, targetEl);
        });
      }
    }

    // Versione ruotata di 90° del connettore "a gomito": invece di due
    // sorgenti impilate verticalmente che raggiungono orizzontalmente una
    // spina comune (e poi giù al bersaglio), qui due sorgenti affiancate
    // orizzontalmente raggiungono verticalmente una spina comune (e poi di
    // lato al bersaglio).
    _drawElbow(s1El, s2El, targetEl) {
      const bracketRect = this.bracketEl.getBoundingClientRect();
      const r1 = s1El.getBoundingClientRect();
      const r2 = s2El.getBoundingClientRect();
      const rt = targetEl.getBoundingClientRect();

      const towardBottom = r1.top + r1.height / 2 <= rt.top + rt.height / 2;

      const y1 = (towardBottom ? r1.bottom : r1.top) - bracketRect.top;
      const x1 = r1.left + r1.width / 2 - bracketRect.left;
      const x2 = r2.left + r2.width / 2 - bracketRect.left;
      const yt = (towardBottom ? rt.top : rt.bottom) - bracketRect.top;
      const xt = rt.left + rt.width / 2 - bracketRect.left;
      const midY = y1 + (yt - y1) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M${x1},${y1} L${x1},${midY} L${x2},${midY} M${x2},${y1} L${x2},${midY} M${(x1 + x2) / 2},${midY} L${xt},${yt}`;
      path.setAttribute('d', d);
      path.setAttribute('stroke', 'rgba(255,255,255,0.18)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      this.svg.appendChild(path);
    }

    _showWinner(winner) {
      const overlay = this.overlay;
      const imgEl = overlay.querySelector('#winnerImg');
      const flagEl = overlay.querySelector('#winnerFlag');

      const showFlagFallback = () => {
        imgEl.style.display = 'none';
        flagEl.style.display = 'flex';
        const flagSvg = global.TorneoFlags && global.TorneoFlags[winner.flagCode];
        flagEl.innerHTML = flagSvg || '🎵';
      };

      if (winner.img) {
        imgEl.style.display = 'block';
        imgEl.onerror = winner.audio ? showFlagFallback : null;
        imgEl.src = winner.img;
        imgEl.alt = winner.name;
        flagEl.style.display = 'none';
      } else {
        showFlagFallback();
      }

      if (winner.audio) {
        this.winnerPlayBtn.style.display = 'inline-flex';
        this.winnerPlayBtn.classList.remove('playing');
        this.winnerPlayBtn.setAttribute('aria-label', `Riproduci ${winner.name}`);
        this.winnerPlayBtn.onclick = () => this._togglePlay(winner, this.winnerPlayBtn);
      } else {
        this.winnerPlayBtn.style.display = 'none';
        this.winnerPlayBtn.onclick = null;
      }

      overlay.querySelector('#winnerName').textContent = winner.name;
      overlay.classList.add('show');
      this._confetti();

      this._lastPodium = this._computePodium();
      this._saveHistoryRecord(this._lastPodium);
    }

    // --- Podio e storico -------------------------------------------------

    // 2° posto = l'altro finalista. 3° posto = i due perdenti di semifinale
    // (uno per lato): non esiste una finalina, quindi li trattiamo come
    // ex aequo invece di sceglierne uno arbitrariamente.
    _computePodium() {
      const first = this.final.winner;
      const second = first === this.final.a ? this.final.b : this.final.a;

      const third = [this.top, this.bottom]
        .map((side) => side.rounds[side.rounds.length - 1][0])
        .filter((m) => m && m.winner)
        .map((m) => (m.winner === m.a ? m.b : m.a))
        .filter(Boolean);

      return { first, second, third };
    }

    _historyStorageKey() { return 'torneoHistory'; }

    _loadHistoryStore() {
      try {
        return JSON.parse(localStorage.getItem(this._historyStorageKey())) || {};
      } catch (e) {
        return {};
      }
    }

    _saveHistoryRecord(podium) {
      if (!this.categoryKey) return;
      try {
        const store = this._loadHistoryStore();
        const list = store[this.categoryKey] || [];
        list.unshift({
          date: new Date().toISOString(),
          winner: { id: podium.first.id, name: podium.first.name },
          second: podium.second ? { id: podium.second.id, name: podium.second.name } : null,
          third: podium.third.map((p) => ({ id: p.id, name: p.name }))
        });
        store[this.categoryKey] = list.slice(0, 50);
        localStorage.setItem(this._historyStorageKey(), JSON.stringify(store));
      } catch (e) {
        // storage non disponibile (modalità privata, quota piena, ecc.): va bene, non è critico.
      }
    }

    _getHistory() {
      if (!this.categoryKey) return [];
      return this._loadHistoryStore()[this.categoryKey] || [];
    }

    _openHistory() {
      const favEl = this.container.querySelector('#historyFav');
      const listEl = this.container.querySelector('#historyList');
      const history = this._getHistory();

      if (!history.length) {
        favEl.innerHTML = '';
        listEl.innerHTML = '<p class="history-empty">Nessuna partita salvata ancora per questa categoria.</p>';
      } else {
        const counts = new Map();
        history.forEach((h) => counts.set(h.winner.name, (counts.get(h.winner.name) || 0) + 1));
        let favName = null;
        let favCount = 0;
        counts.forEach((c, name) => {
          if (c > favCount) { favCount = c; favName = name; }
        });

        favEl.innerHTML = favCount > 1
          ? `<div class="history-fav-badge">⭐ Il tuo preferito di sempre: <strong>${favName}</strong> (${favCount} vittorie su ${history.length} partite)</div>`
          : `<div class="history-fav-badge">Partite giocate finora: <strong>${history.length}</strong></div>`;

        listEl.innerHTML = history.map((h) => {
          const d = new Date(h.date);
          const dateStr = `${d.toLocaleDateString('it-IT')} ${d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
          return `<div class="history-row"><span class="history-date">${dateStr}</span><span class="history-winner">🏆 ${h.winner.name}</span></div>`;
        }).join('');
      }

      this.historyOverlay.classList.add('show');
    }

    _loadImageSafe(src) {
      return new Promise((resolve) => {
        if (!src) { resolve(null); return; }
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    }

    _podiumAvatarSource(participant) {
      if (!participant) return null;
      if (participant.img) return participant.img;
      return this._podiumFlagSource(participant);
    }

    _podiumFlagSource(participant) {
      if (!participant || !participant.audio) return null;
      const svg = global.TorneoFlags && global.TorneoFlags[participant.flagCode];
      if (svg) return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      return null;
    }

    _drawAvatar(ctx, participant, cx, cy, r) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = '#20263f';
      ctx.fill();
      const img = participant && participant._podiumImg;
      if (img) {
        const scale = Math.max((r * 2) / img.width, (r * 2) / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
      } else {
        ctx.font = `${Math.round(r * 1.1)}px 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎵', cx, cy + r * 0.05);
      }
      ctx.restore();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();
    }

    // Badge della medaglia disegnato come forma vettoriale (cerchio + numero)
    // invece che con l'emoji 🥇🥈🥉: il rendering degli emoji dentro un
    // <canvas> dipende dai font di sistema disponibili ed è molto meno
    // affidabile di quello normale nel DOM, quindi qui evitiamo del tutto
    // quella dipendenza.
    _drawMedalBadge(ctx, cx, cy, r, color, label) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.stroke();
      ctx.fillStyle = '#1a0b02';
      ctx.font = `800 ${Math.round(r * 1.1)}px 'Poppins', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, cx, cy + r * 0.08);
      ctx.restore();
    }

    _wrapName(ctx, text, maxWidth) {
      const words = (text || '').split(' ');
      const lines = [];
      let line = '';
      words.forEach((w) => {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = w;
        } else {
          line = test;
        }
      });
      if (line) lines.push(line);
      return lines.slice(0, 2);
    }

    async _openPodium() {
      if (!this._lastPodium) return;
      await this._renderPodiumCanvas(this._lastPodium);
      this.podiumOverlay.classList.add('show');

      const shareBtn = this.container.querySelector('#podiumShareBtn');
      const canSharePodium = !!(navigator.canShare && navigator.share);
      shareBtn.style.display = canSharePodium ? 'inline-flex' : 'none';
    }

    async _renderPodiumCanvas(podium) {
      const canvas = this.container.querySelector('#podiumCanvas');
      const W = 960;
      const H = 1180;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const all = [podium.first, podium.second, ...podium.third];
      await Promise.all(all.filter(Boolean).map(async (p) => {
        p._podiumImg = await this._loadImageSafe(this._podiumAvatarSource(p));
        if (!p._podiumImg && p.audio) {
          p._podiumImg = await this._loadImageSafe(this._podiumFlagSource(p));
        }
      }));

      try { await document.fonts.ready; } catch (e) { /* ignora: va bene usare il font di fallback */ }

      // Sfondo
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#121933');
      bg.addColorStop(1, '#1a1024');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(W / 2, 420, 40, W / 2, 420, 520);
      glow.addColorStop(0, 'rgba(245,158,11,0.22)');
      glow.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Titolo
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = "800 46px 'Poppins', sans-serif";
      ctx.fillText(`${this.emoji}  ${this.title}`, W / 2, 86);
      ctx.font = "600 22px 'Poppins', sans-serif";
      ctx.fillStyle = '#a6aec4';
      ctx.fillText('Podio finale', W / 2, 126);

      const platform = (cx, topY, width, height, color, label) => {
        ctx.fillStyle = color;
        ctx.fillRect(cx - width / 2, topY, width, height);
        ctx.font = "800 54px 'Poppins', sans-serif";
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillText(label, cx, topY + height / 2 + 18);
      };

      const nameBlock = (p, cx, y, maxWidth = 240, fontSize = 26) => {
        if (!p) return;
        ctx.font = `700 ${fontSize}px 'Poppins', sans-serif`;
        ctx.fillStyle = '#ffffff';
        const lines = this._wrapName(ctx, p.name, maxWidth);
        const lineH = fontSize + 6;
        lines.forEach((line, i) => ctx.fillText(line, cx, y + i * lineH));
        if (p.country) {
          ctx.font = `500 ${Math.round(fontSize * 0.7)}px 'Inter', sans-serif`;
          ctx.fillStyle = '#a6aec4';
          ctx.fillText(p.country, cx, y + lines.length * lineH);
        }
      };

      const PLATFORM_BOTTOM = 1040;
      const SECOND_CX = W / 2 - 300;
      const THIRD_CX = W / 2 + 290;

      // --- 1° posto (centro) ---
      const firstCy = 330;
      const firstR = 120;
      this._drawAvatar(ctx, podium.first, W / 2, firstCy, firstR);
      this._drawMedalBadge(ctx, W / 2 + firstR * 0.78, firstCy - firstR * 0.78, 36, '#f59e0b', '1');
      nameBlock(podium.first, W / 2, 490);
      platform(W / 2, PLATFORM_BOTTOM - 230, 280, 230, '#f59e0b', '1°');

      // --- 2° posto (sinistra) ---
      if (podium.second) {
        const secondCy = 400;
        const secondR = 92;
        this._drawAvatar(ctx, podium.second, SECOND_CX, secondCy, secondR);
        this._drawMedalBadge(ctx, SECOND_CX + secondR * 0.78, secondCy - secondR * 0.78, 30, '#cbd5e1', '2');
        nameBlock(podium.second, SECOND_CX, 530);
        platform(SECOND_CX, PLATFORM_BOTTOM - 150, 250, 150, '#cbd5e1', '2°');
      }

      // --- 3° posto (destra, ex aequo se sono due: nessuna finalina) ---
      const third = podium.third;
      if (third.length === 1) {
        const thirdCy = 420;
        const thirdR = 92;
        this._drawAvatar(ctx, third[0], THIRD_CX, thirdCy, thirdR);
        this._drawMedalBadge(ctx, THIRD_CX + thirdR * 0.78, thirdCy - thirdR * 0.78, 30, '#c2793d', '3');
        nameBlock(third[0], THIRD_CX, 550);
      } else if (third.length >= 2) {
        const pairCy = 420;
        const pairR = 56;
        const pairOffset = 78;
        this._drawAvatar(ctx, third[0], THIRD_CX - pairOffset, pairCy, pairR);
        this._drawAvatar(ctx, third[1], THIRD_CX + pairOffset, pairCy, pairR);
        this._drawMedalBadge(ctx, THIRD_CX, pairCy - pairR - 24, 28, '#c2793d', '3');
        ctx.font = "600 18px 'Poppins', sans-serif";
        ctx.fillStyle = '#a6aec4';
        ctx.fillText('Ex aequo', THIRD_CX, 500);
        nameBlock(third[0], THIRD_CX - pairOffset, 528, 150, 19);
        nameBlock(third[1], THIRD_CX + pairOffset, 528, 150, 19);
      }
      if (third.length) {
        platform(THIRD_CX, PLATFORM_BOTTOM - 100, 250, 100, '#c2793d', '3°');
      }

      // Firma
      ctx.font = "600 18px 'Poppins', sans-serif";
      ctx.fillStyle = '#a6aec4';
      const dateStr = new Date().toLocaleDateString('it-IT');
      ctx.fillText(`Torneo • ${dateStr}`, W / 2, H - 36);
    }

    _downloadPodiumImage() {
      const canvas = this.container.querySelector('#podiumCanvas');
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `podio-${this.categoryKey || 'torneo'}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }, 'image/png');
    }

    _sharePodiumImage() {
      const canvas = this.container.querySelector('#podiumCanvas');
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const file = new File([blob], `podio-${this.categoryKey || 'torneo'}.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: this.title, text: `Il podio di ${this.title}!` });
          }
        } catch (e) {
          // l'utente ha annullato la condivisione, o il browser non la supporta del tutto: nessun problema.
        }
      }, 'image/png');
    }

    _confetti() {
      const colors = ['#e11d48', '#f59e0b', '#22c55e', '#3b82f6', '#eab308', '#ffffff'];
      for (let i = 0; i < 90; i++) {
        const piece = el('div', 'confetti');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = 2.4 + Math.random() * 1.8 + 's';
        piece.style.animationDelay = Math.random() * 0.6 + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 5000);
      }
    }
  }

  global.TorneoBracket = TorneoBracket;
})(window);
