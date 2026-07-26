/* =========================================================
   Torneo — motore generico del tabellone (stile mondiale)
   8 a sinistra e 8 a destra che convergono verso la finale
   al centro. Usato da tutte le pagine di gioco.
   ========================================================= */

(function (global) {
  'use strict';

  const ROUND_LABELS = {
    8: 'Ottavi di Finale',
    4: 'Quarti di Finale',
    2: 'Semifinale',
    1: 'Finale'
  };

  const ROW_HEIGHT_FALLBACK = 260; // usato solo prima della prima misura reale

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
      this.left = { rounds: this._buildRoundsFor(participants.slice(0, half)) };
      this.right = { rounds: this._buildRoundsFor(participants.slice(half)) };
      this.final = { a: null, b: null, winner: null };
      this.rowHeight = ROW_HEIGHT_FALLBACK;

      this._renderShell();
      this.render();
    }

    // Misura l'altezza reale di un match (dipende dalla larghezza della
    // colonna, che è responsive via CSS/vw) creandone uno di prova invisibile
    // in un contenitore FISSO e separato dal tabellone vero e proprio: se lo
    // svuotassimo e misurassimo dentro di esso, per un istante la pagina
    // diventerebbe più corta e il browser forzerebbe lo scroll in cima
    // (bug: "torna su" ad ogni click). Il box di misura vive sempre fuori
    // dal flusso (position:fixed, fuori schermo), quindi non influenza mai
    // l'altezza della pagina né la posizione di scroll.
    _measureRowHeight() {
      const sample = { a: this.participants[0], b: this.participants[1] || this.participants[0], winner: null };
      const matchEl = this._renderMatch(sample, () => {});
      this._measureBox.appendChild(matchEl);
      const height = Math.ceil(matchEl.getBoundingClientRect().height);
      matchEl.remove();
      return height > 0 ? height + 16 : ROW_HEIGHT_FALLBACK;
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
          <p class="scroll-hint">← Scorri per vedere tutti i turni →</p>
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
            <button class="btn btn-primary" id="restartBtn">↻ Rigioca</button>
          </div>
        </div>
        <div class="lightbox" id="lightbox">
          <button class="lightbox-close" id="lightboxClose">✕</button>
          <img id="lightboxImg" alt="">
          <div class="lightbox-name" id="lightboxName"></div>
        </div>
      `;

      this._measureBox = el('div', 'round');
      this._measureBox.style.position = 'fixed';
      this._measureBox.style.top = '0';
      this._measureBox.style.left = '-9999px';
      this._measureBox.style.visibility = 'hidden';
      this._measureBox.style.pointerEvents = 'none';
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

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this._closeLightbox();
          this.overlay.classList.remove('show');
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
      this.rowHeight = this._measureRowHeight();

      [...this.bracketEl.children].forEach((c) => {
        if (c !== this.svg) c.remove();
      });

      const left = this._renderSide('left');
      const finalCol = this._renderFinalCol();
      const right = this._renderSide('right');

      this.bracketEl.appendChild(left.sideEl);
      this.bracketEl.appendChild(finalCol.colEl);
      this.bracketEl.appendChild(right.sideEl);

      this._leftRoundEls = left.roundEls;
      this._rightRoundEls = right.roundEls;
      this._finalMatchEl = finalCol.matchEl;

      this._updateRoundIndicator();
      requestAnimationFrame(() => this._drawConnectors());
    }

    _renderSide(key) {
      const sideObj = this[key];
      const totalLeaves = sideObj.rounds[0].length;
      const sideEl = el('div', 'side side-' + key);
      const columns = [];

      sideObj.rounds.forEach((matches, r) => {
        const span = Math.pow(2, r);
        const col = el('div', 'round');

        const label = el('div', 'round-label', roundLabel(matches.length * 2));
        col.appendChild(label);

        const grid = el('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateRows = `repeat(${totalLeaves}, ${this.rowHeight}px)`;
        grid.style.rowGap = '0';
        grid.style.columnGap = '0';

        const matchEls = [];
        matches.forEach((m, j) => {
          const start = j * span + 1;
          const cell = el('div');
          cell.style.gridRow = `${start} / span ${span}`;
          cell.style.display = 'flex';
          cell.style.alignItems = 'center';
          cell.style.padding = '6px 0';

          const matchEl = this._renderMatch(m, (side) => this._selectSideWinner(key, r, j, side));
          matchEls.push(matchEl);
          cell.appendChild(matchEl);
          grid.appendChild(cell);
        });

        col.appendChild(grid);
        columns.push({ colEl: col, matchEls });
      });

      // sul lato destro le colonne vanno mostrate specularmente:
      // la semifinale vicino al centro, gli ottavi verso l'esterno.
      const order = key === 'right' ? [...columns].reverse() : columns;
      order.forEach((c) => sideEl.appendChild(c.colEl));

      return { sideEl, roundEls: columns.map((c) => c.matchEls) };
    }

    _renderFinalCol() {
      const col = el('div', 'round final-round final-col');
      const label = el('div', 'round-label', roundLabel(1));
      col.appendChild(label);
      const matchEl = this._renderMatch(this.final, (side) => this._selectFinalWinner(side));
      col.appendChild(matchEl);
      return { colEl: col, matchEl };
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
        // Categorie audio (es. "musica"): bandiera al posto della foto
        // e un bottone play/pausa per ascoltare il brano.
        thumb.classList.add('thumb-flag');
        const flagSvg = global.TorneoFlags && global.TorneoFlags[participant.flagCode];
        if (flagSvg) {
          thumb.innerHTML = flagSvg;
        } else {
          thumb.textContent = '🎵';
        }

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
      } else {
        thumb.textContent = 'TBD';
      }

      const name = el('div', 'name', isTbd ? 'Da definire' : participant.name);
      if (!isTbd) name.title = participant.name;

      slot.appendChild(thumb);
      if (participant && participant.country) {
        slot.appendChild(el('div', 'country', participant.country));
      }
      slot.appendChild(name);

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
    // (il match torna indecisо); se si sceglie l'altro, il vincitore viene
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
        this.final[key === 'left' ? 'a' : 'b'] = winner;
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
        this.final[key === 'left' ? 'a' : 'b'] = null;
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
      const leftIdx = this._sideProgress('left');
      const rightIdx = this._sideProgress('right');
      const minIdx = Math.min(leftIdx, rightIdx);
      const sideRounds = this.left.rounds;

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

      this._drawSideConnectors(this._leftRoundEls);
      this._drawSideConnectors(this._rightRoundEls);

      const leftLast = this._leftRoundEls[this._leftRoundEls.length - 1][0];
      const rightLast = this._rightRoundEls[this._rightRoundEls.length - 1][0];
      if (leftLast) this._drawElbow(leftLast, leftLast, this._finalMatchEl);
      if (rightLast) this._drawElbow(rightLast, rightLast, this._finalMatchEl);
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

    _drawElbow(s1El, s2El, targetEl) {
      const bracketRect = this.bracketEl.getBoundingClientRect();
      const r1 = s1El.getBoundingClientRect();
      const r2 = s2El.getBoundingClientRect();
      const rt = targetEl.getBoundingClientRect();

      const towardRight = r1.left + r1.width / 2 <= rt.left + rt.width / 2;

      const x1 = (towardRight ? r1.right : r1.left) - bracketRect.left;
      const y1 = r1.top + r1.height / 2 - bracketRect.top;
      const y2 = r2.top + r2.height / 2 - bracketRect.top;
      const xt = (towardRight ? rt.left : rt.right) - bracketRect.left;
      const yt = rt.top + rt.height / 2 - bracketRect.top;
      const midX = x1 + (xt - x1) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M${x1},${y1} L${midX},${y1} L${midX},${y2} M${x1},${y2} L${midX},${y2} M${midX},${(y1 + y2) / 2} L${xt},${yt}`;
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

      if (winner.audio) {
        imgEl.style.display = 'none';
        flagEl.style.display = 'flex';
        const flagSvg = global.TorneoFlags && global.TorneoFlags[winner.flagCode];
        flagEl.innerHTML = flagSvg || '🎵';

        this.winnerPlayBtn.style.display = 'inline-flex';
        this.winnerPlayBtn.classList.remove('playing');
        this.winnerPlayBtn.setAttribute('aria-label', `Riproduci ${winner.name}`);
        this.winnerPlayBtn.onclick = () => this._togglePlay(winner, this.winnerPlayBtn);
      } else {
        imgEl.style.display = 'block';
        imgEl.src = winner.img;
        imgEl.alt = winner.name;
        flagEl.style.display = 'none';
        this.winnerPlayBtn.style.display = 'none';
        this.winnerPlayBtn.onclick = null;
      }

      overlay.querySelector('#winnerName').textContent = winner.name;
      overlay.classList.add('show');
      this._confetti();
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
