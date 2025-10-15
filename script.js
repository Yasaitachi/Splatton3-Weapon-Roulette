// --- Global Variables / グローバル変数 ---------------------------------------------------------
const APP_VERSION = '1.2.5'; // Application version. Change this number when updating. / アプリケーションのバージョン。更新時にこの数値を変更する。

const RESET_TIMEOUT_MS = 10000; // 10 seconds / 10秒
const state = {
  running: false,
  resetTimer: null,
  pool: [],
  boostedWeapons: {}, // For probability boost feature
  history: [],
  interval: 50,
  lang: 'ja',
  theme: 'system',
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

const historyEl = $('#history');
const historyCount = $('#historyCount');
const noRepeat = $('#noRepeat');
const playerCountInput = $('#playerCount');
const resultContainer = $('#resultContainer');
const fullscreenBtn = $('#fullscreenBtn');
const resultImage = $('#resultImage');
const settingsBtn = $('#settingsBtn');
const settingsModal = $('#settingsModal');
const closeSettingsBtn = $('#closeSettingsBtn');
const preventSleepToggle = $('#preventSleep');
const presetMenuBtn = $('#preset-menu-btn');
const presetMenu = $('#preset-menu');
const fullscreenStatusBar = $('#fullscreen-status-bar');

// --- Application Logic / アプリケーションロジック ----------------------------------------------

function getWeaponName(weapon) {
  return state.lang === 'en' && weapon.name_en ? weapon.name_en : weapon.name;
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

function getActivePool() {
  const enabledClass = $$('input[data-class]:checked').map(i => i.getAttribute('data-class'));
  const enabledSub = $$('input[data-sub]:checked').map(i => i.getAttribute('data-sub'));
  const enabledSp = $$('input[data-sp]:checked').map(i => i.getAttribute('data-sp'));
  const enabledCollection = $$('input[data-collection]:checked').map(i => i.getAttribute('data-collection'));
  return weapons.filter(w =>
    enabledClass.includes(w.class) &&
    enabledSub.includes(w.sub) &&
    enabledSp.includes(w.sp) &&
    enabledCollection.includes(w.collection)
  );
}

function updatePool() {
  const base = getActivePool();
  const filteredBase = noRepeat.checked ? base.filter(w => !state.history.some(h => h.name === w.name)) : base;

  // Create a new pool considering the boosted weapons
  let boostedPool = [];
  filteredBase.forEach(weapon => {
    const boostMultiplier = state.boostedWeapons[weapon.name] || 1;
    for (let i = 0; i < boostMultiplier; i++) {
      boostedPool.push(weapon);
    }
  });

  // If the pool is empty (e.g., due to no-repeat), fall back to the base pool without no-repeat.
  // This prevents the app from getting stuck with no weapons to draw.
  state.pool = boostedPool.length > 0 ? boostedPool : base;
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
      resultDetailsEl.textContent = t('current-candidates', { n: n, prob: prob.toFixed(1) });
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
function pushHistoryItem(weapon, batchTime, playerNum, totalPlayers) {
  const historyItem = {
    ...weapon,
    time: batchTime,
    playerNum,
    totalPlayers,
  };
  state.history.push(historyItem);
  renderHistory(); // Update history display / 履歴の表示を更新
}

function renderHistory() {
  const historyArray = [...state.history].sort((a, b) => a.time.localeCompare(b.time));
  const totalItems = historyArray.length;
  const batchIds = new Set(historyArray.map(h => h.time));
  historyCount.textContent = t('history-count-value', { batches: batchIds.size, total: totalItems });

  if (!totalItems) {
    historyEl.innerHTML = `<div class="empty" data-i18n-key="history-empty">${t('history-empty')}</div>`;
    return;
  }
  historyEl.innerHTML = historyArray.map((h, index) => {
    const time = new Date(h.time);
    // Separate draws from the same session with a line. / 同じ回の抽選は線で区切る
    const isNewBatch = (index === 0) || (h.time !== historyArray[index - 1].time);
    const batchClass = isNewBatch && index > 0 ? 'new-batch-separator' : '';

    // Display player number only for multiplayer.
    const playerLabel = h.totalPlayers > 1 ? `P${h.playerNum}: ` : '';

    const localIndex = state.history.findIndex(localItem => localItem.time === h.time && localItem.name === h.name);
    const imageHtml = h.imageId ? `<img src="${IMAGE_PATH_CONFIG.weapon}${h.imageId}.png" class="history-weapon-image" alt="${getWeaponName(h)}">` : '';
    const deleteButton = `<button class="btn secondary icon" data-delete-index="${localIndex}" data-i18n-title="history-delete-item" title="${t('history-delete-item')}">×</button>`;

    return `
      <div class="history-item ${batchClass}">
        ${imageHtml}
        <div class="history-item__main" style="${!h.imageId ? 'margin-left: 48px;' : ''}">
          <div class="history-weapon-name">${playerLabel}${getWeaponName(h)}</div>
          <div class="history-weapon-details muted">${t(h.class)} / ${t(h.sub)} / ${t(h.sp)}</div>
        </div>
        <div class="history-item__aside">
          <div class="history-item__meta muted">
            <div>${time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
          </div>
          ${deleteButton}
        </div>
      </div>
    `;
  }).join('');
  // Scroll to the bottom when history is added. / 履歴が追加されたら一番下までスクロールする
  historyEl.scrollTop = historyEl.scrollHeight;
}

function handleDeleteHistoryItem(e) {
  const target = e.target.closest('[data-delete-key], [data-delete-index]');
  if (!target) return;

  // Local mode: delete by index. / ローカルモード: インデックスで削除
  const index = parseInt(target.dataset.deleteIndex, 10);
  if (!isNaN(index)) {
    state.history.splice(index, 1);
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
  ...$$('#classFilters input, #classFilters button')
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
  const playerCount = parseInt(playerCountInput.value, 10);
  if (noRepeat.checked && state.pool.length < playerCount) {
    showToast(t('no-candidates-alert', { poolCount: state.pool.length, playerCount: playerCount }), 'error');
    return null;
  }
  if (state.pool.length === 0) {
    showToast(t('no-candidates-alert-title'), 'error');
    return null;
  }

const finalResults = [];
const tempPool = [...state.pool];
for (let i = 0; i < playerCount; i++) {
  if (tempPool.length === 0) break;
  const result = pickRandom(tempPool);
  if (result) {
    finalResults.push(result);
    if (noRepeat.checked) {
      const index = tempPool.findIndex(item => item.name === result.name);
      if (index > -1) tempPool.splice(index, 1);
    }
  }
}
return finalResults;
}

/**
 * Persists the draw results (saves to history and sends Discord notification).
 * @param {Array<Object>} finalResults - An array of the draw results. / 抽選結果の配列
 * @param {string} drawTime - The ISO string of the draw time. / 抽選時刻のISO文字列
 */
async function persistResults(finalResults, drawTime) {
  finalResults.forEach((result, i) => {
    pushHistoryItem(result, drawTime, i + 1, finalResults.length);
  });
  saveHistory();
}

/**
 * Displays the spin result on the screen.
 * @param {Array<Object>} finalResults - An array of weapon objects for the results. / 抽選結果のブキ配列
 * @param {Array<Object>} pool - The pool used for the draw. / 抽選に使われたプール
 */
async function displaySpinResult(finalResults, pool) {
  if (state.running) return;
  clearTimeout(state.resetTimer);

  state.running = true;
  setControlsDisabled(true);

  const playerCount = finalResults.length;

  if (playerCount === 1) {
      const result = finalResults[0];
      await runSingleAnimation(pool, result);
      await showFinalResult([result]);
  } else {
      for (let i = 0; i < playerCount; i++) {
          resultContainer.innerHTML = `
              <div id="resultName" class="name">${t('player-draw', { playerNum: i + 1 })}</div>
              <div id="resultDetails" class="details">${t('player-draw-wait')}</div>
          `;
          await new Promise(resolve => setTimeout(resolve, 1200));

          const result = finalResults[i];
          if (!result) break;

          await runSingleAnimation(pool, result);
          await showFinalResult([result]);
          await new Promise(resolve => setTimeout(resolve, 1500));
      }
      if (finalResults.length > 0) { // 1つずつ結果を更新
          await showFinalResult(finalResults);
      }
  }

  if (finalResults.length > 0) {
      const drawTime = new Date().toISOString();
      await persistResults(finalResults, drawTime);
      updatePool(); // 先にプールを更新
      if ($('#autoCopy')?.checked) {
          await copyResultToClipboard(finalResults);
      }
      await sendToDiscordWebhook(finalResults);

      state.resetTimer = setTimeout(() => {
          resultContainer.innerHTML = `
        <div id="resultName" class="name" data-i18n-key="reset-display-name">${t('reset-display-name')}</div>
        <div id="resultDetails" class="details" data-i18n-key="reset-display-class">${t('reset-display-class')}</div>
      `;
      }, RESET_TIMEOUT_MS);
  }

  state.running = false;
  setControlsDisabled(false);
  // Hide image after reset
  if (resultImage) {
    resultImage.style.display = 'none';
  }
}

async function startSpin() {
  if (state.running) return;

  // Local mode. / ローカルモード
  updatePool();
  const finalResults = getDrawResults();
  if (finalResults) {
    await displaySpinResult(finalResults, state.pool);
  }
}

function showSpinningText(weapon) {
    if (!weapon) return;
    
    let imageEl = $('#resultImage');
    let nameEl = $('#resultName');
    let detailsEl = $('#resultDetails');

    // If elements don't exist (e.g., after showing multi-player list), recreate them.
    if (!nameEl || !detailsEl || !imageEl) {
        resultContainer.innerHTML = `
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
        detailsEl.innerHTML = `
            <span>${t(weapon.class)}</span><span class="separator">/</span><span>${t(weapon.sub)}</span><span class="separator">/</span><span>${t(weapon.sp)}</span>
        `;
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
  if (!results || results.length === 0) {
    if (resultImage) resultImage.style.display = 'none';
    resultContainer.innerHTML = `
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
        resultContainer.innerHTML = `
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
    detailsEl.innerHTML = `<span>${t(w.class)}</span><span class="separator">/</span><span>${t(w.sub)}</span><span class="separator">/</span><span>${t(w.sp)}</span>`;

  } else {
    if (resultImage) resultImage.style.display = 'none';
    resultContainer.innerHTML = `<ul class="result-list"></ul>`;
    const listEl = resultContainer.querySelector('.result-list');

    // Display placeholders first. / まずはプレースホルダーを表示
    results.forEach((w, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="player-label">${t('player-result-list', { i: i + 1 })}</span>
        <div class="weapon-details">
          <div class="weapon-name">...</div>
          <div class="weapon-sub-sp muted">...</div>
        </div>
      `;
      listEl.appendChild(li);
    });

    // Update results one by one. / 1つずつ結果を更新
    for (let i = 0; i < results.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for 0.3 seconds / 0.3秒待つ
      const resultItem = listEl.children[i];
      const nameEl = resultItem.querySelector('.weapon-name');
      const subSpEl = resultItem.querySelector('.weapon-sub-sp');
      const w = results[i];
      nameEl.textContent = getWeaponName(w);
      subSpEl.textContent = `${t(w.class)} / ${t(w.sub)} / ${t(w.sp)}`;
    }
  }
}

/**
 * Copies the draw results to the clipboard.
 * @param {Array<Object>} results - An array of weapon objects from the draw results. / 抽選結果のブキオブジェクトの配列
 */
async function copyResultToClipboard(results) {
  if (!results || results.length === 0) return;

  const textToCopy = results.map((w, i) => {
    const playerLabel = results.length > 1 ? `${t('player-result-list', { i: i + 1 })}: ` : '';
    const weaponName = getWeaponName(w);
    const details = `${t(w.class)} / ${t(w.sub)} / ${t(w.sp)}`;
    return `${playerLabel}${weaponName}\n${details}`;
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
    const details = `${t(w.class)} / ${t(w.sub)} / ${t(w.sp)}`;

    // For multi-player, add a link to the weapon image in the name.
    if (playerCount > 1 && w.imageId) {
      const imageUrl = `${IMAGE_PATH_CONFIG.remote}${w.imageId}.png`;
      weaponName = `${weaponName}`;
    }

    return {
      name: playerCount > 1 ? `${t('player-result-list', { i: i + 1 })}` : weaponName,
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
  clearTimeout(state.resetTimer);

  state.boostedWeapons = {};
  noRepeat.checked = false;
  $$('#classFilters input[type="checkbox"]').forEach(i => i.checked = true);

  state.history = [];
  renderHistory();
  saveHistory();

  resultContainer.innerHTML = `
    <div id="resultName" class="name" data-i18n-key="reset-display-name">${t('reset-display-name')}</div>
    <div id="resultDetails" class="details" data-i18n-key="reset-display-class">${t('reset-display-class')}</div>
  `;
  if (resultImage) resultImage.style.display = 'none';
  
  updatePool();
  saveSettings();
}

function renderProbTable() {
  const probTable = document.getElementById('probTable');
  const pool = state.pool;
  if (!probTable) return;
  const uniquePool = [...new Set(pool.map(w => w.name))].map(name => pool.find(w => w.name === name));
  if (!uniquePool.length) {
    probTable.innerHTML = `<tr><td class="muted prob-table-empty" data-i18n-key="prob-no-candidates">${t('prob-no-candidates')}</td></tr>`;
    return;
  }
  probTable.innerHTML =
    `<tr class="prob-table-header">
      <th data-i18n-key="prob-weapon-name">${t('prob-weapon-name')}</th>
      <th data-i18n-key="prob-class">${t('prob-class')}</th>
      <th data-i18n-key="prob-sub">${t('prob-sub')}</th>
      <th data-i18n-key="prob-special">${t('prob-special')}</th>
      <th class="prob-value" data-i18n-key="prob-value">${t('prob-value')}</th>
      <th class="prob-boost-cell" data-i18n-key="prob-boost" data-i18n-title="prob-boost-tooltip" title="${t('prob-boost-tooltip')}">${t('prob-boost')}</th>
    </tr>` +
    uniquePool.sort((a, b) => getWeaponName(a).localeCompare(getWeaponName(b))).map(w => {
      const countInPool = pool.filter(item => item.name === w.name).length;
      const prob = uniquePool.length === 1 ? 100 : (countInPool / pool.length) * 100;
      const boostValue = state.boostedWeapons[w.name] || 1;
      return `<tr>
        <td>${getWeaponName(w)}</td>
        <td>${t(w.class)}</td>
        <td>${t(w.sub)}</td>
        <td>${t(w.sp)}</td>
        <td class="prob-value">${prob.toFixed(2)}%</td>
        <td class="prob-boost-cell" title="${t('prob-boost-tooltip')}">
          <input type="number" data-boost-weapon="${w.name}" min="1" max="10" value="${boostValue}" class="boost-input">
        </td>
      </tr>`;
    }).join('');
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
    fullscreenBtn.title = t('exit-fullscreen'); // Use translation key 'exit-fullscreen' / 翻訳キー 'exit-fullscreen' を使用
    fullscreenBtn.setAttribute('aria-label', t('exit-fullscreen')); // Use translation key 'exit-fullscreen' / 翻訳キー 'exit-fullscreen' を使用
    // ▼▼▼ Added from here / ここから追加 ▼▼▼
    if (fullscreenStatusBar) {
      fullscreenStatusBar.style.display = 'flex';
      updateBatteryStatus();
    }
    // ▲▲▲ Added up to here / ここまで追加 ▲▲▲
  } else {
    fullscreenBtn.innerHTML = ICONS.FULLSCREEN;
    fullscreenBtn.title = t('fullscreen'); // Use translation key 'fullscreen' / 翻訳キー 'fullscreen' を使用
    fullscreenBtn.setAttribute('aria-label', t('fullscreen-toggle')); // Use translation key 'fullscreen-toggle' / 翻訳キー 'fullscreen-toggle' を使用
    // ▼▼▼ Added from here / ここから追加 ▼▼▼
    if (fullscreenStatusBar) {
      fullscreenStatusBar.style.display = 'none';
    }
    // ▲▲▲ Added up to here / ここまで追加 ▲▲▲
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

    $('#battery-level').textContent = `${level}%`;
    const iconEl = $('#battery-icon');
    iconEl.style.setProperty('--battery-level', battery.level);

    batteryStatusEl.classList.toggle('low', level <= 20);
    batteryStatusEl.classList.toggle('charging', isCharging);
    $('#battery-icon-charging').style.display = isCharging ? 'inline-block' : 'none';
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
  if (preventSleepToggle.checked && wakeLockSentinel === null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
};

// --- Settings and History Save/Restore / 設定と履歴の保存・復元 ----------------------------------------------

function saveSettings() {
  try {
    const settings = {
      class: $$('input[data-class]').reduce((acc, cb) => ({ ...acc, [cb.dataset.class]: cb.checked }), {}),
      sub: $$('input[data-sub]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sub]: cb.checked }), {}),
      sp: $$('input[data-sp]').reduce((acc, cb) => ({ ...acc, [cb.dataset.sp]: cb.checked }), {}),
      noRepeat: noRepeat.checked,
      boostedWeapons: state.boostedWeapons,
      playerCount: playerCountInput.value,
      lang: state.lang,
      theme: state.theme,
      autoCopy: $('#autoCopy')?.checked ?? false,
      preventSleep: preventSleepToggle.checked,
      discordWebhookSelection: $('#discordWebhookSelect')?.value || '',
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
    noRepeat.checked = settings.noRepeat ?? false;
    state.boostedWeapons = settings.boostedWeapons || {};
    playerCountInput.value = settings.playerCount ?? 1;
    setLanguage(settings.lang || navigator.language.startsWith('ja') ? 'ja' : 'en');
    applyTheme(settings.theme || 'system');
    const autoCopy = $('#autoCopy');
    if (autoCopy) {
      autoCopy.checked = settings.autoCopy ?? false;
    }
    if ('preventSleep' in settings && 'wakeLock' in navigator) {
      preventSleepToggle.checked = settings.preventSleep;
      if (preventSleepToggle.checked) {
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
  try {
    localStorage.setItem('splaRouletteHistory', JSON.stringify(state.history));
  } catch (e) {
    console.error("Failed to save history:", e);
  }
}

function loadHistory() {
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
  let text = translations[state.lang]?.[key] || translations['en']?.[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function updateUIText() {
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.dataset.i18nKey;
    const target = el.dataset.i18nTarget || 'textContent';
    if (target === 'innerHTML') {
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
  populateWebhookSelect();
  updateFullscreenButton();
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  const radio = $(`input[name="language"][value="${lang}"]`);
  // Also update the language setting for speech recognition. / 音声認識の言語設定も更新
  if (state.recognition) {
    state.recognition.lang = lang;
  }
  if (radio) radio.checked = true;
  updateUIText();
  saveSettings();
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
    collection: $$('input[data-collection]').reduce((acc, cb) => ({ ...acc, [cb.dataset.collection]: cb.checked }), {}),
    noRepeat: noRepeat.checked,
  };
}

function applyFilterState(preset) {
  if (!preset) return;
  $$('input[data-class]').forEach(cb => { if (preset.class?.[cb.dataset.class] !== undefined) cb.checked = preset.class[cb.dataset.class]; });
  $$('input[data-sub]').forEach(cb => { if (preset.sub?.[cb.dataset.sub] !== undefined) cb.checked = preset.sub[cb.dataset.sub]; });
  $$('input[data-sp]').forEach(cb => { if (preset.sp?.[cb.dataset.sp] !== undefined) cb.checked = preset.sp[cb.dataset.sp]; });
  $$('input[data-collection]').forEach(cb => { if (preset.collection?.[cb.dataset.collection] !== undefined) cb.checked = preset.collection[cb.dataset.collection]; });
  noRepeat.checked = preset.noRepeat ?? false;
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

  presetMenu.innerHTML = `
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
      presetMenu.classList.remove('show');

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

// --- Initialization and Event Listener Setup / 初期化とイベントリスナー設定 ------------------------------------

function buildFilterUI() {
  const allSubs = [...new Set(weapons.map(w => w.sub))].filter(Boolean).sort();
  const allSps = [...new Set(weapons.map(w => w.sp))].filter(Boolean).sort();
  const classFilters = $('#classFilters');
  const collectionFilters = $('#collectionFilters');
  // Note: Text content will be set by updateUIText(). / 注: テキストコンテンツはupdateUIText()によって設定されます
  classFilters.innerHTML = `
  <div class="filter-group">
    <div class="filter-header">
      <strong data-i18n-key="filter-class"></strong>
      <button type="button" class="btn-filter" data-toggle-all="class" data-i18n-key="filter-toggle"></button>
    </div>
    ${[...new Set(weapons.map(w => w.class))].sort().map(cls => { // eslint-disable-line
      const imageName = CLASS_IMAGES[cls];
      const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.class}${imageName}" alt="${cls}">` : '';
      return `<label class="chip"><input type="checkbox" data-class="${cls}" checked> ${imageTag} <span data-i18n-key="${cls}">${cls}</span></label>`;
    }).join('')}
  </div>
  <div class="filter-group">
    <div class="filter-header">
      <strong data-i18n-key="filter-sub"></strong>
      <button type="button" class="btn-filter" data-toggle-all="sub" data-i18n-key="filter-toggle"></button>
    </div>
    ${allSubs.map(sub => { // eslint-disable-line
      const imageName = SUB_WEAPON_IMAGES[sub];
      const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.sub}${imageName}" alt="${sub}">` : '';
      return `<label class="chip"><input type="checkbox" data-sub="${sub}" checked> ${imageTag} <span data-i18n-key="${sub}">${sub}</span></label>`;
    }).join('')}
  </div>
  <div class="filter-group">
    <div class="filter-header">
      <strong data-i18n-key="filter-special"></strong>
      <button type="button" class="btn-filter" data-toggle-all="sp" data-i18n-key="filter-toggle"></button>
    </div>
    ${allSps.map(sp => { // eslint-disable-line
      const imageName = SPECIAL_WEAPON_IMAGES[sp];
      const imageTag = imageName ? `<img src="${IMAGE_PATH_CONFIG.special}${imageName}" alt="${sp}">` : '';
      return `<label class="chip"><input type="checkbox" data-sp="${sp}" checked> ${imageTag} <span data-i18n-key="${sp}">${sp}</span></label>`;
    }).join('')}
  </div>
  `;

  collectionFilters.innerHTML = `
  <div class="filter-group">
    <div class="filter-header">
      <strong data-i18n-key="filter-collection"></strong>
      <button type="button" class="btn-filter" data-toggle-all="collection" data-i18n-key="filter-toggle"></button>
    </div>
    ${[...new Set(weapons.map(w => w.collection))].sort().map(c =>
      `<label class="chip"><input type="checkbox" data-collection="${c}" checked> <span>${c}</span></label>`
    ).join('')}
  </div>
  `;
}

function populateWebhookSelect() {
  const selectEl = $('#discordWebhookSelect');
  if (!selectEl) return;

  const webhookOptions = PRECONFIGURED_WEBHOOKS.map(hook => {
    const name = state.lang === 'en' ? hook.name_en : hook.name;
    return `<option value="${escapeHTML(hook.url)}">${escapeHTML(name)}</option>`;
  }).join('');

  selectEl.innerHTML = `
    <option value="" data-i18n-key="settings-webhook-select">${t('settings-webhook-select')}</option>
    ${webhookOptions}
    <option value="custom" data-i18n-key="settings-webhook-custom">${t('settings-webhook-custom')}</option>
  `;
}
function setupEventListeners() {
  $('#spinBtn').addEventListener('click', startSpin);
  $('#resetBtn').addEventListener('click', resetAll);
  playerCountInput.addEventListener('change', saveSettings);

  // Realtime controls. / リアルタイムコントロール

  fullscreenBtn?.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullscreenButton);

  // Settings Modal. / 設定モーダル
  settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
  });
  closeSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'none');
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  });
  $$('input[name="theme"]').forEach(radio => radio.addEventListener('change', (e) => applyTheme(e.target.value)));
  $$('input[name="language"]').forEach(radio => radio.addEventListener('change', (e) => setLanguage(e.target.value)));

  $('#autoCopy')?.addEventListener('change', saveSettings);
  $('#discordWebhookSelect')?.addEventListener('change', (e) => {
    const customInput = document.getElementById('discordWebhookUrl');
    const noticeEl = document.getElementById('webhook-preconfigured-notice');
    const selectedValue = e.target.value;

    // Show/hide custom URL input
    customInput.style.display = selectedValue === 'custom' ? 'block' : 'none';

    // Check if the selected value is one of the preconfigured webhooks
    const isPreconfigured = PRECONFIGURED_WEBHOOKS.some(hook => hook.url === selectedValue);

    // Show/hide the notice
    noticeEl.style.display = isPreconfigured ? 'block' : 'none';

    saveSettings();
  });
  $('#enableDiscordWebhook')?.addEventListener('change', saveSettings);
  $('#discordWebhookUrl')?.addEventListener('input', saveSettings);
  // Wake Lock Toggle. / Wake Lockのトグル
  function showSettingToast(settingNameKey, isEnabled) {
    const key = isEnabled ? 'toast-setting-on' : 'toast-setting-off';
    showToast(t(key, { settingName: t(settingNameKey) }), 'info', 2000);
  }
  if ('wakeLock' in navigator) {
    preventSleepToggle.addEventListener('change', async (e) => {
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

  historyEl.addEventListener('click', handleDeleteHistoryItem);

  // Listener for when individual filter checkboxes are changed. / フィルターのチェックボックス（個別）が変更されたときのリスナー
  $('#classFilters').addEventListener('change', handleFilterChange);
  $('#collectionFilters').addEventListener('change', handleFilterChange);
  // Listener for when "No Duplicates" checkbox is changed. / 「重複なし」チェックボックスが変更されたときのリスナー
  noRepeat.addEventListener('change', handleFilterChange);

  // Listener for when the "Select/Deselect All" button for filters is clicked. / フィルターの「すべて選択/解除」ボタンがクリックされたときのリスナー
  $('#classFilters').addEventListener('click', e => {
    const toggleType = e.target.dataset.toggleAll;
    if (toggleType) {
      const checkboxes = $$(`input[data-${toggleType}]`);
      if (checkboxes.length === 0) return;

      const allCurrentlyChecked = checkboxes.every(cb => cb.checked);
      const newCheckedState = !allCurrentlyChecked;

      checkboxes.forEach(cb => cb.checked = newCheckedState);
      handleFilterChange(); // Apply changes / 変更を適用
    }
  });
  $('#collectionFilters').addEventListener('click', e => {
    const toggleType = e.target.dataset.toggleAll;
    if (toggleType) {
      const checkboxes = $$(`input[data-${toggleType}]`);
      if (checkboxes.length === 0) return;

      const allCurrentlyChecked = checkboxes.every(cb => cb.checked);
      const newCheckedState = !allCurrentlyChecked;

      checkboxes.forEach(cb => cb.checked = newCheckedState);
      handleFilterChange(); // Apply changes / 変更を適用
    }
  });

  // Probability boost checkbox handler
  $('#probTableWrap').addEventListener('change', e => {
    if (e.target.matches('input[data-boost-weapon]')) {
      const weaponName = e.target.dataset.boostWeapon;
      let value = parseInt(e.target.value, 10);
      if (isNaN(value) || value < 1) value = 1;
      if (value > 10) value = 10;

      // Sync slider and number input
      $$(`input[data-boost-weapon="${weaponName}"]`).forEach(input => input.value = value);

      if (value > 1) {
        state.boostedWeapons[weaponName] = value;
      } else {
        delete state.boostedWeapons[weaponName];
      }

      handleFilterChange();
    }
  });

  document.addEventListener('click', (e) => {
    if (!inviteContainer.contains(e.target)) {
      inviteMenu.classList.remove('show');
    }
  });

  // Preset menu
  presetMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    presetMenu.classList.toggle('show');
    if (presetMenu.classList.contains('show')) {
      renderPresetMenu();
    }
  });
  presetMenu.addEventListener('click', handlePresetMenuClick);
  document.addEventListener('click', (e) => {
    if (!presetMenu.contains(e.target) && !presetMenuBtn.contains(e.target)) {
      presetMenu.classList.remove('show');
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
}

/**
 * Handles filter changes, updates the UI, and syncs with Firebase.
 * @param {Event} [event] - The checkbox change event (optional). / チェックボックスの変更イベント（オプション）
 */
function handleFilterChange(event) {
  // If an event is passed, prevent the last checkbox from being turned off. / イベントが渡された場合、最後のチェックボックスがオフにされるのを防ぐ
  if (event && event.target && event.target.matches('input[type="checkbox"]')) {
    const group = event.target.dataset.class ? 'class' : event.target.dataset.sub ? 'sub' : event.target.dataset.collection ? 'collection' : 'sp';
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

function init() {
  // --- Version Check and Forced Reload / バージョンチェックと強制リロード ---
  // Compare the locally saved version with the current app version. / ローカルに保存されたバージョンと現在のアプリバージョンを比較
  const savedVersion = localStorage.getItem('splaRouletteVersion');
  if (savedVersion && savedVersion !== APP_VERSION) { // If versions differ, clear data and reload. / バージョンが異なったらデータをクリアしてリロード
    // If versions differ, clear old settings and history and force a reload
    // to prevent errors from incompatible changes.
    // バージョンが異なる場合、互換性のない変更によるエラーを防ぐため、古い設定と履歴をクリアしてページを強制的にリロードする。
    console.log(`App updated from ${savedVersion} to ${APP_VERSION}. Clearing data and reloading.`);
    localStorage.removeItem('splaRouletteSettings');
    localStorage.removeItem('splaRouletteHistory');
    localStorage.removeItem('splaRoulettePlayerName');
    localStorage.setItem('splaRouletteVersion', APP_VERSION); // Save the new version. / 新しいバージョンを保存
    location.reload(true); // Reload, ignoring cache. / キャッシュを無視してリロード
    return; // Abort further initialization because of reload. / リロードするため、以降の初期化処理は中断
  }
  // Save the current version to local storage. / 現在のバージョンをローカルストレージに保存
  localStorage.setItem('splaRouletteVersion', APP_VERSION);

  // The `weapons` variable is loaded into the global scope from `weapons.js`. / `weapons`変数は`weapons.js`からグローバルスコープに読み込まれている
  if (typeof weapons === 'undefined' || weapons.length === 0) {
    console.error('ブキデータが見つかりません。weapons.jsが正しく読み込まれているか確認してください。');
    // Set language to render error message correctly. / エラーメッセージを正しくレンダリングするために言語を設定する
    setLanguage(navigator.language.startsWith('ja') ? 'ja' : 'en');
    resultContainer.innerHTML = `
      <div id="resultName" class="name">${t('error')}</div>
      <div id="resultClass" class="class">${t('error-loading-weapons')}</div>
    `;
    return;
  }

  buildFilterUI();
  setupEventListeners();
  loadAndApplySettings();

  loadHistory();
  updatePool();

  // Wake Lock UI display control. / Wake Lock UIの表示制御
  if ('wakeLock' in navigator) {
    $('#wakeLockSetting').style.display = 'flex';
    $('#wakeLockHelp').style.display = 'block';
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Add battery monitoring function. / バッテリー監視機能を追加
    if ('getBattery' in navigator) {
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
}

init();
