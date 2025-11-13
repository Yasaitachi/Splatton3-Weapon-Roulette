// --- Global Variables / グローバル変数 ---------------------------------------------------------
const APP_VERSION = '1.0.0'; // Application version. Change this number when updating. / アプリケーションのバージョン。更新時にこの数値を変更する。

const RESET_TIMEOUT_MS = 10000; // 10 seconds / 10秒
const state = {
  running: false,
  resetTimer: null,
  pool: [],
  playerNames: [],
  history: [],
  interval: 50,
  lang: 'ja', 
  theme: 'system',
  saveDataEnabled: true, // Default to saving data
  probTableSort: {}
};

const ICONS = {
  FULLSCREEN: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
  EXIT_FULLSCREEN: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0-2-2h-3M3 16h3a2 2 0 0 0 2-2v-3"/></svg>`,
  CROWN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path><path d="M5 16h14"></path></svg>`,
  MIC_OFF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  MORE_VERTICAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>`,
  LOCK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
};

const IMAGE_PATH_CONFIG = {
  weapon: 'images/weapons/',
  sub: 'images/sub/',
  special: 'images/special/',
  class: 'images/class/',
};

const $ = (sel) => document.querySelector(sel);

// ブキ種の画像ファイル名マッピング
const CLASS_IMAGES = {
  'シューター': 'Wst_Class_Shooter.png',
  'ブラスター': 'Wst_Class_Blaster.png',
  'ローラー': 'Wst_Class_Roller.png',
  'フデ': 'Wst_Class_Brush.png',
  'チャージャー': 'Wst_Class_Charger.png',
  'スロッシャー': 'Wst_Class_Slosher.png',
  'スピナー': 'Wst_Class_Splatling.png',
  'マニューバー': 'Wst_Class_Dualie.png',
  'シェルター': 'Wst_Class_Brella.png',
  'ワイパー': 'Wst_Class_Splatana.png',
  'ストリンガー': 'Wst_Class_Stringer.png',
};

// サブ・スペシャルの画像ファイル名マッピング
const SUB_WEAPON_IMAGES = {
  'スプラッシュボム': 'Sub_Splash_Bomb.png',
  'キューバンボム': 'Sub_Suction_Bomb.png',
  'クイックボム': 'Sub_Burst_Bomb.png',
  'タンサンボム': 'Sub_Fizzy_Bomb.png',
  'カーリングボム': 'Sub_Curling_Bomb.png',
  'ロボットボム': 'Sub_Autobomb.png',
  'ジャンプビーコン': 'Sub_Squid_Beakon.png',
  'スプリンクラー': 'Sub_Sprinkler.png',
  'トラップ': 'Sub_Ink_Mine.png',
  'ポイズンミスト': 'Sub_Toxic_Mist.png',
  'ポイントセンサー': 'Sub_Point_Sensor.png',
  'スプラッシュシールド': 'Sub_Splat_Wall.png',
  'ラインマーカー': 'Sub_Angle_Shooter.png',
  'トーピード': 'Sub_Torpedo.png',
};

const SPECIAL_WEAPON_IMAGES = {
  'ウルトラショット': 'SP_Ultra_Shot.png',
  'グレートバリア': 'SP_Great_Barrier.png',
  'メガホンレーザー5.1ch': 'SP_Megaphone_Laser_5_1ch.png',
  'ホップソナー': 'SP_Hop_Sonar.png',
  'キューインキ': 'SP_Ink_Vac.png',
  'カニタンク': 'SP_Crab_Tank.png',
  'サメライド': 'SP_Shark_Ride.png',
  'ショクワンダー': 'SP_Zipcaster.png',
  'ウルトラハンコ': 'SP_Ultra_Stamp.png',
  'トリプルトルネード': 'SP_Triple_Tornado.png',
  'エナジースタンド': 'SP_Energy_Stand.png',
  'ジェットパック': 'SP_Jet_Pack.png',
  'アメフラシ': 'SP_Ink_Storm.png',
  'ナイスダマ': 'SP_Nice_Ball.png',
  'マルチミサイル': 'SP_Multi_Missile.png',
  'デコイチラシ': 'SP_Decoy_Flyer.png',
  'テイオウイカ': 'SP_Super_Ika.png',
  'スミナガシート': 'SP_Suminagashi_Sheet.png',
  'ウルトラチャクチ': 'SP_Ultra_Landing.png',
};

const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const ui = {
  historyEl: $('#history'),
  historyCount: $('#historyCount'),
  noRepeat: $('#noRepeat'),
  playerCountInput: $('#playerCount'),
  resultContainer: $('#resultContainer'),
  fullscreenBtn: $('#fullscreenBtn'),
  settingsBtn: $('#settingsBtn'),
  settingsModal: $('#settingsModal'),
  filterGridContainer: $('#filter-grid-container'),
  closeSettingsBtn: $('#closeSettingsBtn'),
  preventSleepToggle: $('#preventSleep'),
  presetMenuBtn: $('#preset-menu-btn'),
  presetMenu: $('#preset-menu'),
  fullscreenStatusBar: $('#fullscreen-status-bar'),
  settingsPlayerNameInput: $('#settingsPlayerNameInput'), // プレイヤー設定モーダルの名前入力欄
  playerNameModal: $('#playerNameModal'),
  playerNameList: $('#playerNameList'),
  closePlayerNameModalBtn: $('#closePlayerNameModalBtn'),
  probTableWrap: $('#probTableWrap'),
  startDrawWithNamesBtn: $('#startDrawWithNamesBtn'),
  spinBtn: $('#spinBtn'),
};

// --- Application Logic / アプリケーションロジック ----------------------------------------------

function getWeaponName(weapon) {
  return weapon.name;
}

/**
 * プレイヤー名の入力値を検証し、許可されていない文字を削除します。
 * 許可される文字: 半角英数字、日本語（ひらがな、カタカナ、漢字）、スペース、ハイフン、アンダースコア。
 * @param {HTMLInputElement} inputElement 検証対象の入力要素
 */
function validatePlayerName(inputElement) {
  // 許可されていない文字（半角英数字、日本語文字、スペース、ハイフン、アンダースコア以外）にマッチする正規表現
  const allowedCharsRegex = /[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\s_-]/g;
  inputElement.value = inputElement.value.replace(allowedCharsRegex, '');
}

/**
 * Escapes HTML to prevent XSS attacks.
 * @param {string} str The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

/**
 * Displays a toast notification.
 * @param {string} message - The message to display. / 表示するメッセージ
 * @param {string} [type='info'] - The type of toast ('success', 'error', 'warning', 'info'). / トーストの種類 ('success', 'error', 'warning', 'info')
 * @param {number} [duration=3000] - The display duration in milliseconds. / 表示時間 (ミリ秒)
 */
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const messageEl = document.createElement('div');
  messageEl.className = 'toast-message';
  messageEl.textContent = message;
  toast.appendChild(messageEl);

  // Add a progress bar. / プログレスバーを追加
  const progressBar = document.createElement('div');
  progressBar.className = 'toast-progress-bar';
  progressBar.style.animationDuration = `${duration}ms`; // Sync with toast display time / トーストの表示時間と同期
  toast.appendChild(progressBar);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remove 'show' class after the specified duration to fade out. / 指定時間後に 'show' クラスを削除し、フェードアウトさせる
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove the element from the DOM after the transition ends. / トランジション完了後に要素をDOMから削除
    toast.addEventListener('transitionend', () => toast.remove());
  }, duration);
}

/**
 * Formats and displays server-related errors to the user.
 * @param {string} userMessage - The message to display to the user (translated). / ユーザーに表示するメッセージ (翻訳済み)
 * @param {Error} error - The error object that occurred. / 発生したエラーオブジェクト
 */
function showServerError(userMessage, error) {
  console.error(`${userMessage}:`, error); // 開発者向けにコンソールに詳細なエラーを出力
  const errorCode = error.code ? ` (Code: ${error.code})` : '';
  showToast(`${userMessage}${errorCode}`, 'error', 6000); // エラーは少し長めに表示
}

function getWeaponDetailsHtml(weapon) {
  const classDetail = `<div class="detail-line"><span class="detail-label">${t('prob-class')}:</span><span class="detail-item">${CLASS_IMAGES[weapon.class] ? `<img src="${IMAGE_PATH_CONFIG.class}${CLASS_IMAGES[weapon.class]}" alt="${t(weapon.class)}" class="detail-icon">` : ''}<span>${t(weapon.class)}</span></span></div>`;
  const subDetail = `<div class="detail-line"><span class="detail-label">${t('prob-sub')}:</span><span class="detail-item">${SUB_WEAPON_IMAGES[weapon.sub] ? `<img src="${IMAGE_PATH_CONFIG.sub}${SUB_WEAPON_IMAGES[weapon.sub]}" alt="${t(weapon.sub)}" class="detail-icon">` : ''}<span>${t(weapon.sub)}</span></span></div>`;
  const spDetail = `<div class="detail-line"><span class="detail-label">${t('prob-special')}:</span><span class="detail-item">${SPECIAL_WEAPON_IMAGES[weapon.sp] ? `<img src="${IMAGE_PATH_CONFIG.special}${SPECIAL_WEAPON_IMAGES[weapon.sp]}" alt="${t(weapon.sp)}" class="detail-icon">` : ''}<span>${t(weapon.sp)}</span></span></div>`;

  return `${classDetail}${subDetail}${spDetail}`;
}

function getActivePool() {
  const enabledClass = $$('input[data-class]:checked').map(i => i.getAttribute('data-class'));
  const enabledSub = $$('input[data-sub]:checked').map(i => i.getAttribute('data-sub'));
  const enabledSp = $$('input[data-sp]:checked').map(i => i.getAttribute('data-sp'));
  return weapons.filter(w =>
    enabledClass.includes(w.class) &&
    enabledSub.includes(w.sub) &&
    enabledSp.includes(w.sp)
  );
}

function updatePool() {
  const base = getActivePool();
  const filteredBase = ui.noRepeat.checked ? base.filter(w => !state.history.some(h => h.name === w.name)) : base;

  state.pool = filteredBase.length > 0 ? filteredBase : base;
  updateProbText();
  renderProbTable();
}

function updateProbText() {
  const n = state.pool.length;
  const prob = n ? (100 / n) : 0;
  const resultDetailsEl = $('#resultDetails');

  // Determine by the presence of i18n key to avoid overwriting class display during result display. / 結果表示中はクラス表示を上書きしないように、i18nキーの有無で判定
  if (resultDetailsEl && resultDetailsEl.hasAttribute('data-i18n-key')) {
    if (n) {
      resultDetailsEl.textContent = t('current-candidates', { n: n, prob: prob.toFixed(3) });
    } else {
      resultDetailsEl.textContent = t('no-candidates-filter');
    }
  }
}

/**
 * Adds one draw result to the history and updates the UI.
 * @param {Object} weapon - The drawn weapon object. / 抽選されたブキオブジェクト
 * @param {string} batchTime - The timestamp of the draw group. / 抽選グループのタイムスタンプ
 * @param {number} playerNum - The player number. / プレイヤー番号
 * @param {number} totalPlayers - The total number of players. / 合計プレイヤー数
 */
function pushHistoryItem(weapon, batchTime, playerNum, totalPlayers, playerName) {
  const historyItem = { // eslint-disable-line
    ...weapon,
    time: batchTime,
    playerNum,
    totalPlayers,
    playerName: playerName || null,
  };
  state.history.push(historyItem);
  renderHistory(); // Update history display / 履歴の表示を更新
}

function renderHistory() {
  const groupedHistory = state.history.reduce((acc, item) => {
    (acc[item.time] = acc[item.time] || []).push(item);
    return acc;
  }, {});

  const sortedBatchTimes = Object.keys(groupedHistory).sort((a, b) => b.localeCompare(a));

  historyCount.textContent = t('history-count-value', { batches: sortedBatchTimes.length, total: state.history.length });

  if (sortedBatchTimes.length === 0) {
    ui.historyEl.innerHTML = `<div class="empty" data-i18n-key="history-empty">${t('history-empty')}</div>`;
    return;
  }

  ui.historyEl.innerHTML = sortedBatchTimes.map(batchTime => {
    const batchItems = groupedHistory[batchTime];
    const time = new Date(batchTime);

    const itemsHtml = batchItems.map(h => {
      const playerName = h.playerName || (h.totalPlayers > 1 ? t('player-result-list', { i: h.playerNum }) : null);
      const imageHtml = h.imageId ? `<img src="${IMAGE_PATH_CONFIG.weapon}${h.imageId}.png" class="history-weapon-image" alt="${getWeaponName(h)}">` : '';
      
      return `
        <div class="history-item" style="${!h.imageId ? 'gap: 0;' : ''}">
          <div class="history-item__main">
            ${playerName ? `<div class="history-player-name">${escapeHTML(playerName)}</div>` : ''}
            <div class="history-weapon-name">${getWeaponName(h)}</div>
            <div class="history-weapon-details muted">
              <div class="detail-item">${CLASS_IMAGES[h.class] ? `<img src="${IMAGE_PATH_CONFIG.class}${CLASS_IMAGES[h.class]}" alt="${t(h.class)}" class="detail-icon">` : ''}<span>${t(h.class)}</span></div>
              <div class="detail-item">${SUB_WEAPON_IMAGES[h.sub] ? `<img src="${IMAGE_PATH_CONFIG.sub}${SUB_WEAPON_IMAGES[h.sub]}" alt="${t(h.sub)}" class="detail-icon">` : ''}<span>${t(h.sub)}</span></div>
              <div class="detail-item">${SPECIAL_WEAPON_IMAGES[h.sp] ? `<img src="${IMAGE_PATH_CONFIG.special}${SPECIAL_WEAPON_IMAGES[h.sp]}" alt="${t(h.sp)}" class="detail-icon">` : ''}<span>${t(h.sp)}</span></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="history-batch">
        <div class="history-batch-header">
          <span class="history-batch-time muted">${time.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
          <button class="btn secondary icon" data-delete-batch="${batchTime}" data-i18n-title="history-delete-item" title="${t('history-delete-item')}">×</button>
        </div>
        <div class="history-batch-body">${itemsHtml}</div>
      </div>`;
  }).join('');

  // Scroll to the top to show the latest result.
  ui.historyEl.scrollTop = 0;
}

function handleDeleteHistoryItem(e) {
  const target = e.target.closest('[data-delete-batch]');
  if (!target) return;

  const batchTime = target.dataset.deleteBatch;
  if (batchTime) {
    // Filter out all items with the matching batch time
    state.history = state.history.filter(item => item.time !== batchTime);
    renderHistory();
    saveHistory();
    updatePool();
  }
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getInteractiveControls = () => [
  ...$$('.main-controls button:not(#fullscreenBtn), .main-controls input, #history button'),
  ...$$('#filter-grid-container input, #filter-grid-container button')
];

function setControlsDisabled(disabled) {
  getInteractiveControls().forEach(c => c.disabled = disabled);
}

/**
 * Runs a single draw animation and returns the resulting weapon object.
 * @param {Array} pool - The array of weapons to draw from. / 抽選対象のブキ配列
 * @param {Object|null} finalPickOverride - The weapon that should be ultimately selected (specified by the server). / 最終的に選択されるべきブキ（サーバーから指定）
 * @returns {Promise<Object|null>} - The drawn weapon object. / 抽選されたブキオブジェクト
 */
function runSingleAnimation(pool, finalPickOverride = null) {
    return new Promise((resolve) => {
        if (!pool || pool.length === 0) {
            resolve(null);
            return;
        }

        let t = 0;
        let interval = 40;
        // Set a random duration between 5 and 7.5 seconds. / 5秒から7.5秒の間でランダムな時間を設定
        const duration = Math.random() * 2500 + 5000;
        const start = performance.now();
        let lastPickForAnim;

        const tick = (now) => {
            if (!state.running) {
                resolve(null);
                return;
            }

            if (now - t >= interval) {
                t = now;
                const w = pickRandom(pool);
                lastPickForAnim = w;
                showSpinningText(w);

                const progress = Math.min(1, (now - start) / duration);
                interval = 40 + progress * 180;

                if (progress >= 1) {
                    // If a weapon is specified by the server, use it; otherwise, use the last animated weapon as the final result.
                    const finalPick = finalPickOverride ?? lastPickForAnim ?? pickRandom(pool);
                    // Ensure the last frame of the animation displays the correct final weapon.
                    // アニメーションの最後のフレームが、正しい最終結果のブキを表示するようにする
                    showSpinningText(finalPick);
                    // Wait a moment for the final frame to render before resolving the promise.
                    // プロミスを解決する前に、最終フレームが描画されるのを少し待つ
                    setTimeout(() => resolve(finalPick), 100);
                } else {
                    requestAnimationFrame(tick);
                }
            } else {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    });
}

/**
 * Generates draw results (common logic for online/local).
 * @returns {Array<Object>|null} An array of weapon objects for the results, or null if conditions are not met. / 抽選結果のブキ配列、または条件を満たさない場合はnull
 */
function getDrawResults() {
    const playerCount = parseInt(ui.playerCountInput.value, 10);
    const useNoRepeat = ui.noRepeat.checked;

    if (useNoRepeat && state.pool.length < playerCount) {
        showToast(t('no-candidates-alert', { poolCount: state.pool.length, playerCount: playerCount }), 'error');
        return null;
    }
    if (state.pool.length === 0) {
        showToast(t('no-candidates-alert-title'), 'error');
        return null;
    }

  // Create a shuffled and de-clustered pool to draw from.
  // これにより、連続して同じような種類のブキが出にくくなる。
  const shuffledPool = [...state.pool];
  shuffleArray(shuffledPool);
  const finalPool = deClusterPool(shuffledPool);

  const results = [];
  const drawnNames = new Set();

  for (const weapon of finalPool) {
    if (results.length >= playerCount) break;

    if (useNoRepeat) {
      if (!drawnNames.has(weapon.name)) {
        results.push(weapon);
        drawnNames.add(weapon.name);
      }
    } else {
      results.push(weapon);
        }
    }
  return results;
}

/**
 * Persists the draw results (saves to history and sends Discord notification).
 * @param {Array<Object>} finalResults - An array of the draw results. / 抽選結果の配列
 * @param {string} drawTime - The ISO string of the draw time. / 抽選時刻のISO文字列
 */
async function persistResults(finalResults, drawTime) {
  finalResults.forEach((result, i) => {
    const playerName = state.playerNames[i];
    pushHistoryItem(result, drawTime, i + 1, finalResults.length, playerName);
  });
  saveHistory();
}

/**
 * Handles post-draw actions like saving history and sending notifications.
 * @param {Array<Object>} finalResults - The final results of the draw.
 */
async function handlePostDrawActions(finalResults) {
  const drawTime = new Date().toISOString();

  await persistResults(finalResults, drawTime);
  updatePool();

  if ($('#autoCopy')?.checked) {
    await copyResultToClipboard(finalResults);
  }
  await sendToDiscordWebhook(finalResults);

  state.resetTimer = setTimeout(() => {
    ui.resultContainer.innerHTML = `
      <div id="resultName" class="name" data-i18n-key="reset-display-name">${t('reset-display-name')}</div>
      <div id="resultDetails" class="details" data-i18n-key="reset-display-class">${t('reset-display-class')}</div>
    `;
    ui.spinBtn.querySelector('span').textContent = t('spin');
    const resultImage = $('#resultImage');
    if (resultImage) resultImage.style.display = 'none';
  }, RESET_TIMEOUT_MS);
}

/**
 * Main function to orchestrate the spinning process.
 * @param {Array<Object>} finalResults - An array of weapon objects for the results.
 * @param {Array<Object>} pool - The pool used for the draw.
 */
async function runRoulette(finalResults, pool) {
  state.running = true; // Set running state
  setControlsDisabled(true); // Disable controls
  const progressContainer = $('#multi-draw-progress-container');
  const progressBar = $('#multi-draw-progress-bar');

  try {
    if (finalResults.length === 1) {
      const result = finalResults[0];
      await runSingleAnimation(pool, result);
      // showFinalResult will handle the highlight and wait
      await showFinalResult([result]);
    } else {
      // Prepare the list for multiple players
      ui.resultContainer.innerHTML = `<div class="result-grid"></div>`;
      progressContainer.style.display = 'block';
      progressBar.style.width = '0%';
      const gridEl = ui.resultContainer.querySelector('.result-grid');

      // Create placeholder list items
      finalResults.forEach((_, i) => {
        const card = document.createElement('div');
        card.className = 'result-card'; // eslint-disable-line
        card.innerHTML = `
          <span class="player-label">${t('player-result-list', { i: i + 1 })}</span>
          <div class="weapon-image-container"><div class="weapon-image-placeholder"></div></div>
          <div class="weapon-name">${t('player-draw-wait')}</div>
          <div class="weapon-sub-sp muted">...</div>
        `;
        gridEl.appendChild(card);
      });

      // Run animation and update list for each player
      for (let i = 0; i < finalResults.length; i++) {
        const result = finalResults[i];
        // Highlight current player
        $$('.result-card').forEach(card => card.classList.remove('active'));
        const resultItem = gridEl.children[i];
        resultItem.classList.add('active');

        // Reset the main display for the next player's animation.
        ui.resultContainer.innerHTML = `
          <div id="resultName" class="name">${t('player-draw-wait')}</div>
          <div id="resultDetails" class="details">...</div>
        `;

        const playerName = state.playerNames[i] || t('player-result-list', { i: i + 1 });
        resultItem.querySelector('.player-label').textContent = playerName;
        await new Promise(resolve => setTimeout(resolve, 800));

        await runSingleAnimation(pool, result); // This updates the main display
        // Update progress bar after animation
        progressBar.style.width = `${((i + 1) / finalResults.length) * 100}%`;
        await showFinalResultInList(result, resultItem); // Update the specific list item
        await new Promise(resolve => setTimeout(resolve, 1200)); // 少し短縮してテンポアップ

        // Scroll to the top of the page to show the final results grid after each draw.
        // 各プレイヤーの抽選が終わるたびに、最終的な結果グリッドが見えるようにページのトップにスクロールします。
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Wait a bit after scrolling up before starting the next player's draw.
        // 次のプレイヤーの抽選を開始する前に、少し待機します。
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (finalResults.length > 0) {
      await handlePostDrawActions(finalResults);
    }
  } catch (error) {
    console.error("An error occurred during the roulette animation:", error);
    showToast(t('error-failed-draw'), 'error');
  } finally {
    state.running = false;
    setControlsDisabled(false);
    progressContainer.style.display = 'none';
    ui.spinBtn.querySelector('span').textContent = t('spin-next');
  }
}

/**
 * Opens the modal for entering player names.
 */
function openPlayerNameModal() {
  const playerCount = parseInt(ui.playerCountInput.value, 10);
  ui.playerNameList.innerHTML = '';
  for (let i = 1; i <= playerCount; i++) {
    const defaultName = state.playerNames[i - 1] || '';
    const inputGroup = document.createElement('div');
    inputGroup.className = 'setting-item';
    inputGroup.innerHTML = `
      <label for="playerNameInput-${i}">${t('player-name-input-label', { i })}</label>
      <input type="text" id="playerNameInput-${i}" class="input-text" value="${escapeHTML(defaultName)}" maxlength="10">
    `;
    const inputElement = inputGroup.querySelector(`#playerNameInput-${i}`);
    ui.playerNameList.appendChild(inputGroup);
    inputElement.addEventListener('input', () => validatePlayerName(inputElement));
  }
  ui.playerNameModal.style.display = 'flex';
}

/**
 * Proceeds with the roulette spin after names are entered or for a single player.
 */
async function proceedWithSpin() {
  // Close the filter details section when spinning the roulette.
  const filterDetails = document.getElementById('filter-details');
  if (filterDetails) {
    filterDetails.open = false;
  }

  // Remove any existing highlights from the probability table
  $$('#probTable tbody tr.highlight').forEach(row => {
    row.classList.remove('highlight');
  });

  // Clear any pending reset timer
  clearTimeout(state.resetTimer);

  // Immediately clear the previous result and show a "drawing" state.
  // 直前の結果をクリアし、「抽選中」の状態を表示する。
  ui.resultContainer.innerHTML = `
      <div id="resultName" class="name">${t('player-draw-wait')}</div>
      <div id="resultDetails" class="details">...</div>
  `;
  const resultImage = $('#resultImage');
  if (resultImage) resultImage.style.display = 'none';

  updatePool();

  ui.spinBtn.querySelector('span').textContent = t('spin');
  try {
    const finalResults = getDrawResults();
    if (finalResults) {
      // For multi-player, ensure playerNames state is updated
      if (finalResults.length > 1) {
        state.playerNames = [];
        for (let i = 1; i <= finalResults.length; i++) {
          const input = $(`#playerNameInput-${i}`);
          state.playerNames.push(input.value.trim() || t('player-result-list', { i }));
        }
      }
      await runRoulette(finalResults, state.pool);
    } else {
      // If getDrawResults returns null (e.g., not enough weapons), reset the UI.
      resetAll();
    }
  } catch (error) {
    console.error("An error occurred in startSpin:", error);
    setControlsDisabled(false);
  }
}

async function startSpin() {
  if (state.running) return;

  const playerCount = parseInt(ui.playerCountInput.value, 10);
  if (playerCount > 1) {
    openPlayerNameModal();
  } else {
    state.playerNames = []; // Clear names for single player mode
    await proceedWithSpin();
  }
}

function showSpinningText(weapon) {
    if (!weapon) return;
    
    let imageEl = $('#resultImage');
    let nameEl = $('#resultName');
    let detailsEl = $('#resultDetails');

    // If elements don't exist (e.g., after showing multi-player list), recreate them.
    if (!nameEl || !detailsEl || !imageEl) {
        ui.resultContainer.innerHTML = `
            <img id="resultImage" class="weapon-image" src="" alt="">
            <div id="resultName" class="name"></div>
            <div id="resultDetails" class="details"></div>
        `;
        imageEl = $('#resultImage');
        nameEl = $('#resultName');
        detailsEl = $('#resultDetails');
    }

    imageEl.style.display = 'block';

    // Add animation classes
    imageEl.classList.add('spin-out');
    nameEl.classList.add('spin-out');
    detailsEl.classList.add('spin-out');

    // After the 'out' animation, change the text and trigger the 'in' animation
    setTimeout(() => {
        if (weapon.imageId) {
            imageEl.src = `${IMAGE_PATH_CONFIG.weapon}${weapon.imageId}.png`;
            imageEl.alt = getWeaponName(weapon);
        }
        imageEl.classList.remove('spin-out');
        imageEl.classList.add('spin-in');

        nameEl.textContent = getWeaponName(weapon);
        detailsEl.innerHTML = getWeaponDetailsHtml(weapon);
        nameEl.classList.remove('spin-out');
        detailsEl.classList.remove('spin-out');
        nameEl.classList.add('spin-in');
        detailsEl.classList.add('spin-in');
    }, 80); // This duration should be slightly less than the animation time
}

/**
 * Displays the final draw results on the screen.
 * @param {Array<Object>} results - An array of weapon objects to display. / 表示するブキオブジェクトの配列
 */
async function showFinalResult(results) {
  const resultImage = $('#resultImage');
  if (!results || results.length === 0) {
    if (resultImage) resultImage.style.display = 'none';
    ui.resultContainer.innerHTML = `
      <div id="resultName" class="name">${t('error')}</div>
      <div id="resultDetails" class="details">${t('error-failed-draw')}</div>
    `;
    return;
  }

  if (results.length === 1) {
    const w = results[0];
    let imageEl = $('#resultImage');
    let nameEl = $('#resultName');
    let detailsEl = $('#resultDetails');

    if (!nameEl || !detailsEl || !imageEl) {
        ui.resultContainer.innerHTML = `
            <img id="resultImage" class="weapon-image" src="" alt="">
            <div id="resultName" class="name"></div>
            <div id="resultDetails" class="details"></div>
        `;
        imageEl = $('#resultImage');
        nameEl = $('#resultName');
        detailsEl = $('#resultDetails');
    }

    if (w.imageId) {
        imageEl.src = `${IMAGE_PATH_CONFIG.weapon}${w.imageId}.png`;
        imageEl.alt = getWeaponName(w);
        imageEl.style.display = 'block';
    }

    // Final result animation
    imageEl.classList.add('final-result');
    nameEl.classList.add('final-result');
    detailsEl.classList.add('final-result');

    nameEl.textContent = getWeaponName(w);
    // Highlight the weapon in the probability table
    const probRow = $(`#probTable tr[data-weapon-name="${escapeHTML(getWeaponName(w))}"]`);
    if (probRow) {
      // Scroll the table to bring the row into view
      probRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      probRow.classList.add('highlight');
      // Wait for the scroll to finish (approx. 500ms), then wait an additional 1 second.
      // スクロール完了を待機し（約500ms）、さらに1秒待機します。
      await new Promise(resolve => setTimeout(resolve, 500)); // スクロールアニメーション待機
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
    }
    detailsEl.innerHTML = getWeaponDetailsHtml(w);

  } else {
    // For multiple players, the final result is the list itself, which is already built.
    // We just need to hide the main single-result image if it exists.
    if (resultImage) resultImage.style.display = 'none';
  }
}

/**
 * Updates a specific list item in the multi-player result view.
 * @param {Object} weapon - The weapon object for the result.
 * @param {HTMLElement} listItem - The <li> element to update.
 * @param {HTMLElement} cardItem - The <div> element for the result card to update.
 */
async function showFinalResultInList(weapon, cardItem) {
  const nameEl = cardItem.querySelector('.weapon-name');
  const subSpEl = cardItem.querySelector('.weapon-sub-sp');
  const imageContainer = cardItem.querySelector('.weapon-image-container');

  nameEl.textContent = getWeaponName(weapon);
  subSpEl.innerHTML = `${t(weapon.sub)} / ${t(weapon.sp)}`;
  imageContainer.innerHTML = weapon.imageId ? `<img src="${IMAGE_PATH_CONFIG.weapon}${weapon.imageId}.png" class="result-list-weapon-image" alt="${getWeaponName(weapon)}">` : '';
  cardItem.classList.add('final-result');

  // 確率表で武器をハイライトする
  const probRow = $(`#probTable tr[data-weapon-name="${escapeHTML(getWeaponName(weapon))}"]`);
  if (probRow) {
    // Scroll the table to bring the row into view
    probRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    probRow.classList.add('highlight');
    // Wait for the scroll to finish (approx. 500ms) before proceeding.
    // 処理を続行する前に、スクロールが完了するのを待ちます（約500ms）。
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

/**
 * Copies the draw results to the clipboard.
 * @param {Array<Object>} results - An array of weapon objects from the draw results. / 抽選結果のブキオブジェクトの配列
 */
async function copyResultToClipboard(results) {
  if (!results || results.length === 0) return;

  const textToCopy = results.map((w, i) => {
    const playerName = state.playerNames[i] || (results.length > 1 ? t('player-result-list', { i: i + 1 }) : null);
    const weaponName = getWeaponName(w);
    const subWeapon = t(w.sub);
    const specialWeapon = t(w.sp);

    const resultParts = [];
    if (playerName) resultParts.push(playerName);
    resultParts.push(weaponName, subWeapon, specialWeapon);

    return resultParts.join('\n');
  }).join('\n\n');

  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast(t('results-copied-to-clipboard'), 'success');
  } catch (err) {
    console.error('Failed to copy result to clipboard:', err);
    showToast(t('copy-failed'), 'error');
  }
}

/**
 * Sends the draw results to a Discord webhook if configured.
 * @param {Array<Object>} results - An array of weapon objects from the draw results.
 */
async function sendToDiscordWebhook(results) {
  const enableWebhook = document.getElementById('enableDiscordWebhook')?.checked;
  const customUrlInput = document.getElementById('discordWebhookUrl');
  const webhookUrl = customUrlInput.value.trim();

  // If not enabled, or URL is invalid, do nothing.
  if (!enableWebhook || !webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
    return;
  }

  const playerCount = results.length;

  // --- Default Embed Format ---
  const fields = results.map((w, i) => {
    let weaponName = getWeaponName(w);
    const details = `${t('prob-class')}: ${t(w.class)}\n${t('prob-sub')}: ${t(w.sub)}\n${t('prob-special')}: ${t(w.sp)}`;

    // For multi-player, add a link to the weapon image in the name.
    if (playerCount > 1 && w.imageId) {
      // const imageUrl = `${IMAGE_PATH_CONFIG.remote}${w.imageId}.png`;
      weaponName = `${weaponName}`; // eslint-disable-line
    }

    const playerName = state.playerNames[i] || t('player-result-list', { i: i + 1 });
    return {
      name: playerCount > 1 ? playerName : weaponName,
      value: playerCount > 1 ? `${weaponName}\n${details}` : details,
      inline: playerCount > 1, // Show side-by-side for multiple players
    };
  });

  const embed = {
    title: t('discord-embed-title'),
    color: 0x7cf3d2, // --accent color
    fields: fields,
    timestamp: new Date().toISOString(),
  };

  // Add thumbnail image if only one weapon is drawn
  if (results.length === 1 && results[0].imageId) {
    embed.thumbnail = {
        url: `${IMAGE_PATH_CONFIG.weapon}${results[0].imageId}.png`
    };
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.error('Failed to send to Discord webhook:', err);
    // Optionally, show a toast notification to the user
    // showToast('Discordへの投稿に失敗しました。', 'error');
  }
}

function resetAll() {
  state.running = false;

  ui.noRepeat.checked = false;
  $$('#filter-grid-container input[type="checkbox"]').forEach(i => i.checked = true);
  state.playerNames = [];
  state.boostedWeapons = {};

  state.history = [];

  // Remove highlights from the probability table
  $$('#probTable tbody tr.highlight').forEach(row => {
    row.classList.remove('highlight');
  });
  renderHistory();
  saveHistory();

  ui.resultContainer.innerHTML = `
    <div id="resultName" class="name" data-i18n-key="reset-display-name">${t('reset-display-name')}</div>
    <div id="resultDetails" class="details" data-i18n-key="reset-display-class">${t('reset-display-class')}</div>
  `;
  const resultImage = $('#resultImage');
  if (resultImage) resultImage.style.display = 'none';
  
  updatePool();
  saveSettings();
}
function sortProbTable(column) {
  const { probTableSort } = state;
  if (probTableSort.column === column) {
    probTableSort.direction = probTableSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    probTableSort.column = column;
    probTableSort.direction = 'asc';
  }
  renderProbTable();
}

function getSortIndicator(column) {
  const { probTableSort } = state;
  if (probTableSort.column !== column) {
    return '';
  }
  return probTableSort.direction === 'asc' ? ' ▲' : ' ▼';
}

function renderProbTable() {
  const probTable = document.getElementById('probTable');
  if (!probTable) return;

  // Get all weapons that pass the current filters, regardless of the 'no-repeat' setting.
  const basePool = getActivePool();

  if (!basePool.length) {
    probTable.innerHTML = `<tbody><tr><td colspan="6" class="muted prob-table-empty" data-i18n-key="prob-no-candidates">${t('prob-no-candidates')}</td></tr></tbody>`;
    return;
  }

  // Create a set of drawn weapon names if 'no-repeat' is active.
  const drawnWeaponNames = ui.noRepeat.checked
    ? new Set(state.history.map(h => getWeaponName(h)))
    : new Set();

  const headerHtml = `
    <tr class="prob-table-header">
      <th data-i18n-key="prob-weapon-name">${t('prob-weapon-name')}</th>
      <th data-i18n-key="prob-class">${t('prob-class')}</th>
      <th data-i18n-key="prob-sub">${t('prob-sub')}</th>
      <th data-i18n-key="prob-special">${t('prob-special')}</th>
      <th class="prob-value" data-i18n-key="prob-value">${t('prob-value')}</th>
    </tr>`;

  const weaponsWithProb = basePool.map(w => {
      const isDrawn = drawnWeaponNames.has(getWeaponName(w));
      const countInPool = state.pool.filter(item => item.name === w.name).length;
      const prob = state.pool.length > 0 ? (countInPool / state.pool.length) * 100 : 0;
      return { ...w, prob, isDrawn };
    });

  const bodyHtml = weaponsWithProb.map(w => {
      const imageHtml = w.imageId ? `<img src="${IMAGE_PATH_CONFIG.weapon}${w.imageId}.png" class="prob-weapon-image" alt="${getWeaponName(w)}">` : '';
      // Add the 'drawn' class if the weapon has been drawn.
      return `<tr data-weapon-name="${escapeHTML(getWeaponName(w))}" class="${w.isDrawn ? 'drawn' : ''}">
        <td class="prob-weapon-cell">${imageHtml}${getWeaponName(w)}</td>
        <td>${t(w.class)}</td>
        <td><span class="detail-item">${SUB_WEAPON_IMAGES[w.sub] ? `<img src="${IMAGE_PATH_CONFIG.sub}${SUB_WEAPON_IMAGES[w.sub]}" alt="${t(w.sub)}" class="detail-icon">` : ''}<span>${t(w.sub)}</span></span></td>
        <td><span class="detail-item">${SPECIAL_WEAPON_IMAGES[w.sp] ? `<img src="${IMAGE_PATH_CONFIG.special}${SPECIAL_WEAPON_IMAGES[w.sp]}" alt="${t(w.sp)}" class="detail-icon">` : ''}<span>${t(w.sp)}</span></span></td>
        <td class="prob-value">
          <div class="prob-bar-container">
            <div class="prob-bar">
              <div class="prob-bar-inner" style="width: ${w.prob.toFixed(3)}%;"></div>
            </div>
            <span>${w.prob.toFixed(3)}%</span>
          </div>
        </td>
      </tr>`;
    }).join('');

  const totalProb = weaponsWithProb.reduce((sum, w) => sum + w.prob, 0);

  const footerHtml = `
    <tr class="prob-table-footer">
      <td colspan="4" style="text-align: right; font-weight: bold;" data-i18n-key="prob-total">合計</td>
      <td class="prob-value"><span>${totalProb.toFixed(3)}%</span></td>
    </tr>
  `;

  probTable.innerHTML = `<thead>${headerHtml}</thead><tbody>${bodyHtml}</tbody><tfoot>${footerHtml}</tfoot>`;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      showToast(`${t('fullscreen-error')}: ${err.message}`, 'error');
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function updateFullscreenButton() {
  if (!fullscreenBtn) return;
  if (document.fullscreenElement) {
    fullscreenBtn.innerHTML = ICONS.EXIT_FULLSCREEN;
    fullscreenBtn.title = t('exit-fullscreen');
    fullscreenBtn.setAttribute('aria-label', t('exit-fullscreen'));
    // ▼▼▼ Added from here / ここから追加 ▼▼▼
    if (ui.fullscreenStatusBar) {
      ui.fullscreenStatusBar.style.display = 'flex';
      // ▼▼▼ Modified from here / ここから変更 ▼▼▼
      // Update both statuses when entering fullscreen
      updateBatteryStatus();
    }
    // ▲▲▲ Added up to here / ここまで追加 ▲▲▲
  } else {
    fullscreenBtn.innerHTML = ICONS.FULLSCREEN;
    fullscreenBtn.title = t('fullscreen'); // Use translation key 'fullscreen' / 翻訳キー 'fullscreen' を使用
    fullscreenBtn.setAttribute('aria-label', t('fullscreen-toggle')); // Use translation key 'fullscreen-toggle' / 翻訳キー 'fullscreen-toggle' を使用
    // ▼▼▼ Added from here / ここから追加 ▼▼▼
    if (ui.fullscreenStatusBar) {
      ui.fullscreenStatusBar.style.display = 'none';
    }
    // ▲▲▲ Added up to here / ここまで追加 ▲▲▲
  }
}

/**
 * Updates the current time display in the fullscreen status bar.
 */
function updateTime() {
  const dateEl = $('#current-date');
  const timeEl = $('#current-time');
  if (dateEl && timeEl && dateEl.parentElement) {
    dateEl.parentElement.style.display = 'flex';
    timeEl.parentElement.style.display = 'flex';

    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(state.lang, { month: 'numeric', day: 'numeric', weekday: 'short' });

    if (document.fullscreenElement) {
      // 全画面表示: 時刻（時:分:秒）を表示し、秒の前のコロンを点滅させる
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const hoursEl = $('#current-time-hours');
      const colonEl = $('#current-time-colon');
      const minutesEl = $('#current-time-minutes');
      const colon2El = $('#current-time-colon2');
      const secondsEl = $('#current-time-seconds');

      // 要素が存在しない場合（前回の非全画面表示でinnerHTMLが上書きされたなど）の堅牢性確保
      if (!hoursEl || !colonEl || !minutesEl || !colon2El || !secondsEl) {
        // このケースは、elseブロックの修正により発生しないはずですが、念のためログを出力
        console.error("Time display elements not found in fullscreen mode. HTML structure might be corrupted.");
        // 構造を再構築する代わりに、ここでは処理を中断します。
        // 理想的には、elseブロックでinnerHTMLを破壊しないようにすることで解決されます。
        return;
      }

      if (hoursEl && colonEl && minutesEl && colon2El && secondsEl) {
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;

        colonEl.style.visibility = 'visible'; // 時と分の間のコロンは常に表示
        colon2El.style.visibility = 'visible'; // 分と秒の間のコロンは常に表示
        secondsEl.style.display = 'inline'; // 秒の要素を表示
      }
    } else {
      // 全画面表示でない: 通常の時刻表示 (時:分)
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      const hoursEl = $('#current-time-hours');
      const colonEl = $('#current-time-colon');
      const minutesEl = $('#current-time-minutes');
      const colon2El = $('#current-time-colon2');
      const secondsEl = $('#current-time-seconds');

      if (hoursEl && colonEl && minutesEl && colon2El && secondsEl) {
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;

        colonEl.style.visibility = 'visible'; // 時と分の間のコロンは常に表示
        colon2El.style.visibility = 'hidden'; // 分と秒の間のコロンは非表示
        secondsEl.style.display = 'none'; // 秒の要素自体を非表示
      } else {
        // 要素が見つからない場合のフォールバック（index.htmlに存在するため、通常は発生しないはず）
        timeEl.textContent = now.toLocaleTimeString(state.lang, { hour: '2-digit', minute: '2-digit' });
      }
    }
  }
}

// --- Wake Lock Feature / Wake Lock 機能 ----------------------------------------------------
let wakeLockSentinel = null;

// ▼▼▼ Added from here / ここから追加 ▼▼▼
/**
 * Reflects the battery status in the UI.
 */
async function updateBatteryStatus() {
  const batteryStatusEl = $('#battery-status');
  if (!batteryStatusEl || !('getBattery' in navigator)) {
    if (batteryStatusEl) batteryStatusEl.style.display = 'none';
    return;
  }

  try {
    batteryStatusEl.style.display = 'flex';
    const battery = await navigator.getBattery();

    const level = Math.floor(battery.level * 100);
    const isCharging = battery.charging;
    const isPowerSave = level <= 20 && !isCharging;

    $('#battery-level').textContent = `${level}%`;
    const iconEl = $('#battery-icon');
    iconEl.style.setProperty('--battery-level', battery.level);

    // Toggle power save icon
    $('#battery-icon-powersave').style.display = isPowerSave ? 'inline-block' : 'none';

    batteryStatusEl.classList.toggle('low', level <= 20);
    batteryStatusEl.classList.toggle('charging', isCharging);
    $('#battery-icon-charging').style.display = isCharging ? 'inline-block' : 'none';

    // ▼▼▼ ここから追加 ▼▼▼
    const fullscreenBatteryEstimateEl = $('#fullscreen-status-bar #battery-estimate');
    if (fullscreenBatteryEstimateEl) {
      if (isCharging) {
        if (battery.chargingTime === Infinity) {
          fullscreenBatteryEstimateEl.textContent = t('battery-charging-estimate-calculating');
        } else {
          const hours = Math.floor(battery.chargingTime / 3600);
          const minutes = Math.floor((battery.chargingTime % 3600) / 60);
          fullscreenBatteryEstimateEl.textContent = t('battery-charging-estimate', { hours, minutes });
        }
        fullscreenBatteryEstimateEl.style.display = 'flex';
      } else {
        // 充電中でない場合は非表示にする
        fullscreenBatteryEstimateEl.textContent = '';
        fullscreenBatteryEstimateEl.style.display = 'none';
      }
    }
    // ▲▲▲ ここまで追加 ▲▲▲
    // Add listeners for subsequent changes
    battery.addEventListener('levelchange', updateBatteryStatus);
    battery.addEventListener('chargingchange', updateBatteryStatus);

    // To avoid adding listeners multiple times, we can use a flag
    updateBatteryStatus.initialized = true;
  } catch (err) {
    console.error('Could not get battery status:', err);
    batteryStatusEl.style.display = 'none';
  }
}

// ▲▲▲ Added up to here / ここまで追加 ▲▲▲

const requestWakeLock = async () => {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => { // センチネルがシステムによって解放された場合
        console.log('Screen Wake Lock was released');
        wakeLockSentinel = null;
      });
      console.log('Screen Wake Lock is active');
      showToast(t('wake-lock-acquired'), 'success');
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
      showToast(t('wake-lock-failed'), 'error');
    }
  }
};

const releaseWakeLock = async () => {
  if (wakeLockSentinel !== null) {
    await wakeLockSentinel.release();
    wakeLockSentinel = null;
  }
};

const handleVisibilityChange = async () => {
  if (ui.preventSleepToggle.checked && wakeLockSentinel === null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
};

// --- Settings and History Save/Restore / 設定と履歴の保存・復元 ----------------------------------------------

function saveSettings() {
  if (!state.saveDataEnabled) return;
  try {
    const settings = {
      class: $$('input[data-class]').reduce((acc, cb) => ({ ...acc, [cb.dataset.class]: cb.checked }), {}),
      sub: $$('input[data-sub]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sub]: cb.checked }), {}),
      sp: $$('input[data-sp]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sp]: cb.checked }), {}),
      noRepeat: ui.noRepeat.checked,
      playerCount: ui.playerCountInput.value,
      theme: state.theme,
      saveDataEnabled: state.saveDataEnabled,
      preventSleep: ui.preventSleepToggle.checked,
      discordWebhookSelection: $('#discordWebhookSelect')?.value || '',
      autoAdjustProb: $('#autoAdjustProb')?.checked ?? false,
      enableDiscordWebhook: $('#enableDiscordWebhook')?.checked ?? false,
      discordWebhookUrl: $('#discordWebhookUrl')?.value || '',
    };
    localStorage.setItem('splaRouletteSettings', JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}

function loadAndApplySettings() {
  const saved = localStorage.getItem('splaRouletteSettings');
  if (!saved) return;
  try {
    const settings = JSON.parse(saved);
    $$('input[data-class]').forEach(cb => { if (settings.class?.[cb.dataset.class] !== undefined) cb.checked = settings.class[cb.dataset.class]; });
    $$('input[data-sub]').forEach(cb => { if (settings.sub?.[cb.dataset.sub] !== undefined) cb.checked = settings.sub[cb.dataset.sub]; });
    $$('input[data-sp]').forEach(cb => { if (settings.sp?.[cb.dataset.sp] !== undefined) cb.checked = settings.sp[cb.dataset.sp]; });
    ui.noRepeat.checked = settings.noRepeat ?? false;
    ui.playerCountInput.value = settings.playerCount ?? 1;
    // Set data saving preference. Default to true if not set.
    state.saveDataEnabled = true;

    setLanguage('ja');
    applyTheme(settings.theme || 'system');
    const autoCopy = $('#autoCopy');
    if (autoCopy) {
      autoCopy.checked = settings.autoCopy ?? false;
    }
    if ('preventSleep' in settings && 'wakeLock' in navigator && ui.preventSleepToggle) {
      ui.preventSleepToggle.checked = settings.preventSleep;
      if (ui.preventSleepToggle.checked) {
        requestWakeLock();
      }
    }
    const enableDiscordWebhookToggle = $('#enableDiscordWebhook');
    if (enableDiscordWebhookToggle && 'enableDiscordWebhook' in settings) {
      enableDiscordWebhookToggle.checked = settings.enableDiscordWebhook;
    }
    const discordWebhookUrlInput = $('#discordWebhookUrl');
    if (discordWebhookUrlInput && 'discordWebhookUrl' in settings) {
      discordWebhookUrlInput.value = settings.discordWebhookUrl;
    }
  } catch (e) {
    console.error("Failed to load settings:", e);
    localStorage.removeItem('splaRouletteSettings');
  }
}

function saveHistory() {
  if (!state.saveDataEnabled) return;
  try {
    localStorage.setItem('splaRouletteHistory', JSON.stringify(state.history));
  } catch (e) {
    console.error("Failed to save history:", e);
  }
}

function loadHistory() {
  if (!state.saveDataEnabled) return;
  const saved = localStorage.getItem('splaRouletteHistory');
  if (!saved) return;
  try {
    state.history = JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load history:", e);
    localStorage.removeItem('splaRouletteHistory');
  }
}

// --- Internationalization (i18n) / 国際化 (i18n) ----------------------------------------------------

function t(key, replacements = {}) {
  let text = translations['ja']?.[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function updateUIText() {
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.dataset.i18nKey;
    const target = el.dataset.i18nTarget || 'textContent';

    // ボタン（子要素を持たない）の場合は、spanを内部に作成してテキストを設定
    if (el.tagName === 'BUTTON' && el.children.length === 0) {
      el.innerHTML = `<span>${t(key)}</span>`;
    } else if (target === 'innerHTML') {
      el.innerHTML = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Also update text for dynamically generated UI. / 動的に生成されるUIのテキストも更新
  updateProbText();
  renderHistory();
  renderProbTable();
  updateFullscreenButton();
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  updateUIText();
}

// --- Theme Management / テーマ管理 ---------------------------------------------------------

const systemThemeListener = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  state.theme = theme;
  const radio = $(`input[name="theme"][value="${theme}"]`);
  if (radio) radio.checked = true;

  if (theme === 'system') {
    document.documentElement.dataset.theme = systemThemeListener.matches ? 'dark' : 'light';
  } else {
    document.documentElement.dataset.theme = theme;
  }
  saveSettings();
}

function handleSystemThemeChange(e) {
  if (state.theme === 'system') {
    document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
  }
}

// --- Filter Presets / フィルタープリセット ----------------------------------------------------

function getFilterState() {
  return {
    class: $$('input[data-class]').reduce((acc, cb) => ({ ...acc, [cb.dataset.class]: cb.checked }), {}),
    sub: $$('input[data-sub]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sub]: cb.checked }), {}),
    sp: $$('input[data-sp]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sp]: cb.checked }), {}),
    noRepeat: ui.noRepeat.checked,
  };
}

function applyFilterState(preset) {
  if (!preset) return;
  $$('input[data-class]').forEach(cb => { if (preset.class?.[cb.dataset.class] !== undefined) cb.checked = preset.class[cb.dataset.class]; });
  $$('input[data-sub]').forEach(cb => { if (preset.sub?.[cb.dataset.sub] !== undefined) cb.checked = preset.sub[cb.dataset.sub]; });
  $$('input[data-sp]').forEach(cb => { if (preset.sp?.[cb.dataset.sp] !== undefined) cb.checked = preset.sp[cb.dataset.sp]; });
  ui.noRepeat.checked = preset.noRepeat ?? false;
  handleFilterChange();
}

function getPresets() {
  try {
    return JSON.parse(localStorage.getItem('splaRoulettePresets') || '{}');
  } catch (e) {
    console.error("Failed to load presets:", e);
    return {};
  }
}

function savePresets(presets) {
  if (!state.saveDataEnabled) return;
  try {
    localStorage.setItem('splaRoulettePresets', JSON.stringify(presets));
  } catch (e) {
    console.error("Failed to save presets:", e);
  }
}

function renderPresetMenu() {
  const presets = getPresets();
  const presetItems = Object.keys(presets).map(name => `
    <div class="dropdown-item preset-dropdown-item">
      <span class="load-preset-name">${escapeHTML(name)}</span>
      <button class="btn secondary icon" data-action="load-preset" data-name="${escapeHTML(name)}" title="${t('settings-presets-load-btn')}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </button>
      <button class="btn danger icon" data-action="delete-preset" data-name="${escapeHTML(name)}" title="${t('settings-presets-delete-btn')}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
      </button>
    </div>
  `).join('');

  ui.presetMenu.innerHTML = `
    ${presetItems}
    ${Object.keys(presets).length > 0 ? '<div class="dropdown-divider"></div>' : ''}
    <div class="dropdown-item-form">
      <input type="text" id="new-preset-name" class="input-text" placeholder="${t('settings-presets-save-placeholder')}" maxlength="20">
      <button id="save-preset-btn" class="btn secondary" data-i18n-key="settings-presets-save-btn">${t('settings-presets-save-btn')}</button>
    </div>
  `;
}

function handlePresetMenuClick(e) {
  const target = e.target.closest('button');
  if (!target) return;

  const action = target.dataset.action;
  const name = target.dataset.name;

  if (action === 'load-preset') {
    const presets = getPresets();
    const presetData = presets[name];
    if (presetData) {
      applyFilterState(presetData);
      showToast(t('settings-presets-loaded', { name }), 'success');
      ui.presetMenu.classList.remove('show');

      // If host in a room, notify other players
      if (state.isHost && state.roomRef) {
        state.roomRef.child('presetLoaded').set({
          presetName: name,
          filters: presetData,
          hostName: state.playerName,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
      }
    }
  } else if (action === 'delete-preset') {
    if (confirm(t('settings-presets-delete-confirm', { name }))) {
      const presets = getPresets();
      delete presets[name];
      savePresets(presets);
      renderPresetMenu();
    }
  } else if (target.id === 'save-preset-btn') {
    const input = $('#new-preset-name');
    const newName = input.value.trim();
    if (newName) {
      const presets = getPresets();
      presets[newName] = getFilterState();
      savePresets(presets);
      renderPresetMenu();
      showToast(t('settings-presets-saved', { name: newName }), 'success');
      input.value = '';
    }
  }
}

/**
 * Preloads all necessary images for a smooth user experience.
 * @returns {Promise<void>} A promise that resolves when all images are loaded.
 */
async function preloadImages() {
  const imageUrls = new Set();

  // Collect weapon images
  weapons.forEach(w => {
    if (w.imageId) imageUrls.add(`${IMAGE_PATH_CONFIG.weapon}${w.imageId}.png`);
  });

  // Collect class, sub, and special images
  Object.values(CLASS_IMAGES).forEach(img => imageUrls.add(`${IMAGE_PATH_CONFIG.class}${img}`));
  Object.values(SUB_WEAPON_IMAGES).forEach(img => imageUrls.add(`${IMAGE_PATH_CONFIG.sub}${img}`));
  Object.values(SPECIAL_WEAPON_IMAGES).forEach(img => imageUrls.add(`${IMAGE_PATH_CONFIG.special}${img}`));

  const promises = [...imageUrls].map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = () => {
        // Resolve even on error to not block the app, but log it.
        console.warn(`Failed to load image: ${src}`);
        resolve();
      };
      img.src = src;
    });
  });

  await Promise.all(promises);
}

// --- Initialization and Event Listener Setup / 初期化とイベントリスナー設定 ------------------------------------

function buildFilterUI() {
  const allSubs = [...new Set(weapons.map(w => w.sub))].filter(Boolean).sort();
  const allSps = [...new Set(weapons.map(w => w.sp))].filter(Boolean).sort();
  const container = ui.filterGridContainer;
  // Note: Text content will be set by updateUIText(). / 注: テキストコンテンツはupdateUIText()によって設定されます
  container.innerHTML = `
  <div class="filter-group collapsed">
    <div class="filter-header" data-collapsible-group="class">
      <strong data-i18n-key="filter-class"></strong>
      <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    <div class="grid">
      <button class="btn-filter" data-toggle-group="class" data-i18n-key="filter-toggle" data-i18n-title="filter-toggle-all-help"></button>
      ${[...new Set(weapons.map(w => w.class))].sort().map(cls => { // eslint-disable-line
        const imageName = CLASS_IMAGES[cls];
        const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.class}${imageName}" alt="${cls}">` : '';
        return `<label class="chip"><input type="checkbox" data-class="${cls}" checked> ${imageTag} <span data-i18n-key="${cls}">${cls}</span></label>`;
      }).join('')}
    </div>
  </div>
  <div class="filter-group collapsed">
    <div class="filter-header" data-collapsible-group="sub">
      <strong data-i18n-key="filter-sub"></strong>
      <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    <div class="grid">
      <button class="btn-filter" data-toggle-group="sub" data-i18n-key="filter-toggle" data-i18n-title="filter-toggle-all-help"></button>
      ${allSubs.map(sub => { // eslint-disable-line
        const imageName = SUB_WEAPON_IMAGES[sub];
        const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.sub}${imageName}" alt="${sub}">` : '';
        return `<label class="chip"><input type="checkbox" data-sub="${sub}" checked> ${imageTag} <span data-i18n-key="${sub}">${sub}</span></label>`;
      }).join('')}
    </div>
  </div>
  <div class="filter-group collapsed">
    <div class="filter-header" data-collapsible-group="sp">
      <strong data-i18n-key="filter-special"></strong>
      <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    <div class="grid">
      <button class="btn-filter" data-toggle-group="sp" data-i18n-key="filter-toggle" data-i18n-title="filter-toggle-all-help"></button>
      ${allSps.map(sp => { // eslint-disable-line
        const imageName = SPECIAL_WEAPON_IMAGES[sp];
        const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.special}${imageName}" alt="${sp}">` : '';
        return `<label class="chip"><input type="checkbox" data-sp="${sp}" checked> ${imageTag} <span data-i18n-key="${sp}">${sp}</span></label>`;
      }).join('')}
    </div>
  </div>
  `;
}

function setupEventListeners() {
  ui.spinBtn.addEventListener('click', startSpin);
  $('#resetBtn').addEventListener('click', resetAll);
  ui.playerCountInput.addEventListener('change', saveSettings);

  // Realtime controls. / リアルタイムコントロール

  if (ui.settingsPlayerNameInput) {
    ui.settingsPlayerNameInput.addEventListener('input', () => validatePlayerName(ui.settingsPlayerNameInput));
  }

  ui.fullscreenBtn?.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullscreenButton);

  // Settings Modal. / 設定モーダル
  ui.settingsBtn.addEventListener('click', () => {
    ui.settingsModal.style.display = 'flex';
  });
  ui.closeSettingsBtn.addEventListener('click', () => ui.settingsModal.style.display = 'none');
  ui.settingsModal.addEventListener('click', (e) => {
    if (e.target === ui.settingsModal) ui.settingsModal.style.display = 'none';
  });
  ui.closePlayerNameModalBtn.addEventListener('click', () => ui.playerNameModal.style.display = 'none');
  ui.playerNameModal.addEventListener('click', (e) => {
    if (e.target === ui.playerNameModal) ui.playerNameModal.style.display = 'none';
  });
  ui.startDrawWithNamesBtn.addEventListener('click', async () => {
    ui.playerNameModal.style.display = 'none'; // モーダルを閉じる
    await proceedWithSpin();
  });
  $$('input[name="theme"]').forEach(radio => radio.addEventListener('change', (e) => applyTheme(e.target.value)));

  $('#autoCopy')?.addEventListener('change', saveSettings);
  // Wake Lock Toggle. / Wake Lockのトグル
  function showSettingToast(settingNameKey, isEnabled) {
    const key = isEnabled ? 'toast-setting-on' : 'toast-setting-off';
    showToast(t(key, { settingName: t(settingNameKey) }), 'info', 2000);
  }
  if ('wakeLock' in navigator && ui.preventSleepToggle) {
    ui.preventSleepToggle.addEventListener('change', async (e) => {
      if (e.target.checked) { // When trying to turn ON. / ONにしようとした時
        if ('getBattery' in navigator) {
          try {
            const battery = await navigator.getBattery();
            if (battery.level <= 0.2 && !battery.charging) {
              e.target.checked = false; // Force the switch back to OFF. / スイッチを強制的にOFFに戻す
              showToast(t('battery-low-prevent-sleep'), 'error');
              return; // Abort processing. / 処理を中断
            }
          } catch (err) {
            console.warn('Could not get battery status.', err);
          }
        }
        requestWakeLock(); // Turn on only if battery check passes. / バッテリーチェックを通過した場合のみONにする
      } else { // When turned OFF. / OFFにした時
        releaseWakeLock();
      }
      showSettingToast('settings-prevent-sleep', e.target.checked);
      saveSettings();
    });
  }

  systemThemeListener.addEventListener('change', handleSystemThemeChange);

  ui.historyEl.addEventListener('click', handleDeleteHistoryItem);

  // Listener for when individual filter checkboxes are changed. / フィルターのチェックボックス（個別）が変更されたときのリスナー
  $('#filter-grid-container').addEventListener('change', handleFilterChange);
  // Listener for when "No Duplicates" checkbox is changed. / 「重複なし」チェックボックスが変更されたときのリスナー
  ui.noRepeat.addEventListener('change', handleFilterChange);

  // Event delegation for filter controls
  ui.filterGridContainer.addEventListener('click', e => {
    const collapsibleHeader = e.target.closest('[data-collapsible-group]');
    const toggleBtn = e.target.closest('[data-toggle-group]');

    if (collapsibleHeader) {
      const clickedGroup = collapsibleHeader.parentElement;
      const isOpening = clickedGroup.classList.contains('collapsed');

      // まず、すべてのグループを閉じる
      $$('.filter-group').forEach(group => {
        group.classList.add('collapsed');
      });

      // もしクリックされたグループが閉じていた状態なら、それを開く
      if (isOpening) {
        clickedGroup.classList.remove('collapsed');
      }
      // クリックされたグループが開いていた場合は、他のグループが閉じるだけで、自身も閉じたままになる

      // 状態の保存は、一度に一つしか開かないため不要になります。
      // 必要であれば、現在開いているグループを保存するロジックをここに追加します。
    }

    if (toggleBtn) {
      const group = toggleBtn.dataset.toggleGroup;
      const checkboxes = $$(`input[data-${group}]`);
      if (checkboxes.length === 0) return;

      const allCurrentlyChecked = checkboxes.every(cb => cb.checked);
      const newCheckedState = !allCurrentlyChecked;
      checkboxes.forEach(cb => cb.checked = newCheckedState);
      handleFilterChange(); // Apply changes / 変更を適用
    }
  });

  // Preset menu
  ui.presetMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ui.presetMenu.classList.toggle('show');
    if (ui.presetMenu.classList.contains('show')) {
      renderPresetMenu();
    }
  });
  ui.presetMenu.addEventListener('click', handlePresetMenuClick);
  document.addEventListener('click', (e) => {
    if (!ui.presetMenu.contains(e.target) && !ui.presetMenuBtn.contains(e.target)) {
      ui.presetMenu.classList.remove('show');
    }
  });

  // Disable default fullscreen on F11 and replace with app's toggle function. / F11キーによるデフォルトの全画面表示を無効化し、アプリのトグル機能に置き換える
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
      e.preventDefault();
      // Call the application's custom fullscreen toggle function. / アプリケーションのカスタム全画面切り替え機能を呼び出す
      toggleFullscreen();
    }
  });

  // Warn user before leaving if data saving is disabled and there's history.
  // データ保存が無効で履歴がある場合に、ページを離れる前に警告を表示します。
  window.addEventListener('beforeunload', (e) => {
    if (!state.saveDataEnabled && state.history.length > 0) {
      e.preventDefault(); // Required for some browsers
      e.returnValue = t('leave-page-warning-save-disabled'); // Standard way to trigger the prompt
      return t('leave-page-warning-save-disabled'); // For older browsers
    }
  });
}
/**
 * Deletes all application data stored in localStorage and reloads the page.
 * localStorageに保存されているすべてのアプリケーションデータを削除し、ページをリロードします。
 * @param {boolean} [reload=true] - Whether to reload the page after deleting data.
 */
function resetApplicationData(reload = true) {
  const doReset = reload ? confirm(t('settings-reset-data-confirm')) : true;
  if (doReset) {
    localStorage.removeItem('splaRouletteSettings');
    localStorage.removeItem('splaRouletteHistory');
    localStorage.removeItem('splaRoulettePresets');
    localStorage.removeItem('splaRouletteVersion');
    localStorage.removeItem('splaRouletteFilterCollapse');
    localStorage.removeItem('splaRoulettePlayerId'); // Legacy
    localStorage.removeItem('splaRoulettePlayerName'); // Legacy
    if (reload) location.reload();
  }
}

/**
 * Handles filter changes, updates the UI, and syncs with Firebase.
 * @param {Event} [event] - The checkbox change event (optional). / チェックボックスの変更イベント（オプション）
 */
function handleFilterChange(event) {
  // If an event is passed, prevent the last checkbox from being turned off. / イベントが渡された場合、最後のチェックボックスがオフにされるのを防ぐ
  if (event && event.target && event.target.matches('input[type="checkbox"]')) {
    const group = event.target.dataset.class ? 'class' : event.target.dataset.sub ? 'sub' : 'sp';
    if (group || event.target.dataset.season) {
      const selector = `input[data-${group}]`;
      const checkboxes = $$(selector);
      const checkedCount = checkboxes.filter(cb => cb.checked).length;
      if (checkedCount === 0) {
        event.target.checked = true; // Revert the check. / チェックを元に戻す
      }
    }
  }

  updatePool();
  saveSettings();
  if (state.isHost) {
    updateFiltersOnFirebase();
  }
}

/**
 * ブキ画像の数をカウントし、正常に読み込めるかを確認する（開発者向け機能）
 */
async function countValidWeaponImages() {
  console.log(`現在のブキ総数: ${weapons.length} 種類`);

  let validImageCount = 0;
  const promises = weapons.map(weapon => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        validImageCount++;
        resolve();
      };
      img.onerror = () => {
        console.warn(`画像が見つかりません: ${weapon.imageId}.png`);
        resolve(); // エラーでも次に進む
      };
      img.src = `images/weapons/${weapon.imageId}.png`;
    });
  });

  await Promise.all(promises);
  console.log(`正常に読み込めたブキ画像の数: ${validImageCount} / ${weapons.length}`);
}
/**
 * Initializes the application.
 * This function is async to handle asynchronous operations like preloading images.
 */
async function init() {
  document.body.classList.add('loading');
  // --- Version Check and Forced Reload / バージョンチェックと強制リロード ---
  // Compare the locally saved version with the current app version. / ローカルに保存されたバージョンと現在のアプリバージョンを比較
  const savedVersion = localStorage.getItem('splaRouletteVersion');
  if (savedVersion && savedVersion !== APP_VERSION) { // If versions differ, clear data and reload. / バージョンが異なったらデータをクリアしてリロード
    // If versions differ, clear old settings and history and force a reload
    // to prevent errors from incompatible changes.
    // バージョンが異なる場合、互換性のない変更によるエラーを防ぐため、古い設定と履歴をクリアしてページを強制的にリロードする。
    console.log(`App updated from ${savedVersion} to ${APP_VERSION}. Showing update notes.`);
    localStorage.removeItem('splaRouletteSettings');
    localStorage.removeItem('splaRouletteHistory');
    localStorage.removeItem('splaRoulettePlayerName');
    localStorage.setItem('splaRouletteVersion', APP_VERSION); // Save the new version. / 新しいバージョンを保存
    showUpdateNotes(APP_VERSION);
    return; // Abort further initialization until user closes the modal and page reloads.
  }

  // Save the current version to local storage. / 現在のバージョンをローカルストレージに保存
  localStorage.setItem('splaRouletteVersion', APP_VERSION);

  // The `weapons` variable is loaded into the global scope from `weapons.js`. / `weapons`変数は`weapons.js`からグローバルスコープに読み込まれている
  if (typeof weapons === 'undefined' || weapons.length === 0) {
    console.error('ブキデータが見つかりません。weapons.jsが正しく読み込まれているか確認してください。');
    setLanguage('ja'); // Set language to show error message correctly
    ui.resultContainer.innerHTML = `
      <div id="resultName" class="name">${t('error')}</div>
      <div id="resultClass" class="class">${t('error-loading-weapons')}</div>
    `;
    return;
  }

  // Preload all images and wait for them to finish.
  await preloadImages();

  // countValidWeaponImages(); // ブキ画像の数をカウント
  // Add original index to each weapon for default sorting.
  weapons.forEach((w, i) => w.originalIndex = i);

  buildFilterUI();
  setupEventListeners();
  loadAndApplySettings();

  loadHistory();

  // Wake Lock UI display control. / Wake Lock UIの表示制御
  if ('wakeLock' in navigator && ui.preventSleepToggle) {
    $('#wakeLockSetting').style.display = 'flex';
    $('#wakeLockHelp').style.display = 'block';
    document.addEventListener('visibilitychange', handleVisibilityChange);






    // Add battery monitoring function. / バッテリー監視機能を追加
    if ('getBattery' in navigator && ui.preventSleepToggle) {
      navigator.getBattery().then(battery => {
        const handleBatteryChange = () => {
          // If sleep prevention is active, battery is <= 20%, and not charging. / スリープ防止が有効な状態で、バッテリーが20%以下かつ充電中でない場合
          if (preventSleepToggle.checked && battery.level <= 0.2 && !battery.charging) {
            releaseWakeLock(); // Release WakeLock. / WakeLockを解放
            preventSleepToggle.checked = false; // Also turn off the UI switch. / UIのスイッチもOFFにする
            saveSettings(); // Save settings. / 設定を保存
            showToast(t('battery-low-prevent-sleep'), 'error');
          }
        };
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      }).catch(err => console.warn('Cannot monitor battery status.', err));
    }

  }

  // Hide loader and show app content
  document.body.classList.remove('loading');
  $('#loader-overlay').classList.remove('visible');

  updateTime();
  setInterval(updateTime, 1000); // Update time every second

  // Reset all settings on startup
  // resetAll(); // This would clear history, which we want to preserve.
  // Instead, manually reset parts of the state but keep history.
  renderHistory(); // Render the loaded history
  updatePool();
}

document.addEventListener('DOMContentLoaded', init);
