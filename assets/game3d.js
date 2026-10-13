/* ============================================================
   game3d.js — 3D mini-games engine (Three.js)
   modes: order | sort | build
   Auto-initialises every [data-game="3d"] box.
   ============================================================ */
import * as THREE from 'three';

window.THREE = THREE;

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
const median = a => {
  if (!a.length) return 0;
  const s = a.slice().sort((x, y) => x - y);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/* population generators for BUILD mode (values roughly 0..45) */
const POP = {
  skewed: () => clamp(-Math.log(1 - Math.random()) * 22, 0, 45),   // right-skewed, mean ~20
  uniform: () => rand(2, 42),
  normal: () => {
    let u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return clamp(22 + 7 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v), 0, 45);
  },
};
const POP_SD = { skewed: 19, uniform: 11.5, normal: 7 };

function label(text, color, scale) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.font = '700 44px Tajawal, Arial, sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineWidth = 7; x.strokeStyle = 'rgba(6,10,14,.9)';
  x.strokeText(text, 256, 64);
  x.fillStyle = color || '#cfe8ee';
  x.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  m.scale.set(scale, scale * 0.25, 1);
  return m;
}

/* ============================================================
   GAME
   ============================================================ */
function makeGame(box, cfg) {
  const AX = (cfg.arena && cfg.arena[0]) || 26;
  const AZ = (cfg.arena && cfg.arena[1]) || 16;
  const H = cfg.hgt || 360;

  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  const canvas = document.createElement('canvas');
  canvas.className = 'game';
  canvas.style.width = '100%';
  canvas.style.height = H + 'px';
  canvas.style.touchAction = 'none';
  canvas.style.display = 'block';
  wrap.appendChild(canvas);

  const head = document.createElement('div');
  head.className = 'game-head';
  head.innerHTML = `<h4>${cfg.title || 'لعبة تفاعلية'}</h4>
    <span class="lives"></span>
    <span class="score"></span>`;
  box.innerHTML = '';
  box.appendChild(head);
  box.appendChild(wrap);

  if (cfg.mode === 'build') {
    const mk = (t, cls, fn) => { const b = document.createElement('button'); b.className = 'btn sm ' + (cls || ''); b.textContent = t; b.onclick = fn; head.appendChild(b); return b; };
    mk('ارسم عينة (Space)', '', () => drawSample());
    mk('ارسم 50 عينة', 'ghost', () => drawSamples(50));
    mk('تصفير', 'ghost', reset);
  }

  const foot = document.createElement('div');
  foot.className = 'game-foot';
  foot.innerHTML = cfg.foot ||
    (cfg.mode === 'build'
      ? 'ارسم عينات وشوف كيف تتشكّل <b>توزيع وسائل العينات</b> على شكل جرس 🔔'
      : 'تحكم: <kbd>W A S D</kbd> أو <kbd>الأسهم</kbd> أو اسحب بالماوس/اللمس.');
  box.appendChild(foot);

  const hud = document.createElement('div');
  hud.className = 'g3d-hud';
  wrap.appendChild(hud);
  const msg = document.createElement('div');
  msg.className = 'g3d-msg';
  wrap.appendChild(msg);

  /* ---------- three.js setup ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x0a0f15, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0f15, 32, 75);
  const W = () => Math.max(320, wrap.clientWidth);
  const camera = new THREE.PerspectiveCamera(52, W() / H, 0.1, 200);
  camera.position.set(0, 17, 24);
  camera.lookAt(0, 1.5, 0);

  scene.add(new THREE.AmbientLight(0x8fa6b8, 0.6));
  const dir = new THREE.DirectionalLight(0xcfe8ef, 0.9);
  dir.position.set(8, 18, 10); scene.add(dir);
  const rim = new THREE.DirectionalLight(0x57c7d8, 0.35);
  rim.position.set(-10, 6, -8); scene.add(rim);

  scene.add(new THREE.GridHelper(AX * 2, AX * 2, 0x1e3340, 0x16232e));
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(AX * 2, AZ * 2),
    new THREE.MeshStandardMaterial({ color: 0x0d1420, roughness: 0.95, metalness: 0.1 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  scene.add(floor);

  const player = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0x57c7d8, emissive: 0x2a7a88, emissiveIntensity: 0.7, roughness: 0.3 })
  );
  player.position.set(0, 0.85, AZ * 0.35);
  scene.add(player);
  const pLight = new THREE.PointLight(0x57c7d8, 1.4, 14);
  player.add(pLight);

  /* ---------- state ---------- */
  const state = { lives: cfg.lives || 3, score: 0, over: false };
  let targetPt = null;
  const flying = [];

  /* ---------- HUD helpers ---------- */
  const setScore = t => { $('.score', head).textContent = t; };
  const setLives = () => {
    if (cfg.mode === 'build' || cfg.stats) return;
    $('.lives', head).textContent = state.over ? '✗' : '❤'.repeat(Math.max(0, state.lives));
  };
  const hudHTML = inner => { hud.innerHTML = inner; };
  function banner(text, good) {
    msg.style.display = 'grid';
    msg.innerHTML = `<div class="g3d-msg-in" style="color:${good === false ? 'var(--bad)' : 'var(--good)'}">${text}</div>
      <button class="btn sm" id="g3drestart">العب مرة ثانية 🔄</button>`;
    $('#g3drestart', msg).onclick = () => location.reload();
    state.over = true;
  }

  /* ---------- input ---------- */
  const keys = {};
  const onKey = e => {
    const k = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
    if (k === ' ' && cfg.mode === 'build' && !e.repeat) { drawSample(); return; }
    keys[k] = (e.type === 'keydown');
  };
  window.addEventListener('keydown', onKey, { passive: false });
  window.addEventListener('keyup', onKey, { passive: false });

  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const ptr = new THREE.Vector2();
  let dragging = false;
  const setPtr = e => {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    ptr.x = ((t.clientX - r.left) / r.width) * 2 - 1;
    ptr.y = -((t.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ptr, camera);
    const hit = new THREE.Vector3();
    ray.ray.intersectPlane(plane, hit);
    targetPt = new THREE.Vector3(clamp(hit.x, -AX + 1, AX - 1), 0.85, clamp(hit.z, -AZ + 1, AZ - 1));
  };
  canvas.addEventListener('pointerdown', e => { dragging = true; setPtr(e); try { canvas.setPointerCapture(e.pointerId); } catch (err) {} });
  canvas.addEventListener('pointermove', e => { if (dragging) setPtr(e); });
  canvas.addEventListener('pointerup', () => { dragging = false; targetPt = null; });

  /* ---------- ORDER mode setup ---------- */
  const tokens = [];
  let orderIdx = 0;
  const steps = cfg.steps || [];
  const ars = cfg.ars || steps;
  if (cfg.mode === 'order') {
    const placed = [];
    steps.forEach((s, i) => {
      let p, tries = 0;
      do {
        p = new THREE.Vector3(rand(-AX + 3, AX - 3), 1.6, rand(-AZ + 3, AZ - 3));
        tries++;
      } while (placed.some(q => q.distanceTo(p) < 6) && tries < 80);
      placed.push(p);
      const col = [0x57c7d8, 0x8fd3c0, 0xd8b65a, 0xc79fe8, 0xe08a8a][i % 5];
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.05, 0),
        new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.45, roughness: 0.3, flatShading: true })
      );
      m.position.copy(p);
      m.userData = { i, done: false };
      const lb = label(s + (ars[i] !== s ? ' · ' + ars[i] : s), '#dff3f7', 3.4);
      lb.position.set(0, 2.0, 0);
      m.add(lb);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.7, 0.06, 8, 32),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55 })
      );
      ring.rotation.x = Math.PI / 2; ring.position.y = -1.3;
      m.add(ring);
      scene.add(m);
      tokens.push(m);
    });
    setLives();
    hudHTML(`<b style="color:var(--accent)">الهدف:</b> لمس البلورات بالترتيب الصحيح — الجاية: <b style="color:var(--warn)">${steps[0]} · ${ars[0]}</b>`);
  }

  /* ---------- SORT mode setup ---------- */
  const items = [];
  let spawnT = 0.8, timeLeft = 0;
  const caughtVals = [];
  const goodDef = (cfg.good || []).map(g => ({ t: g[0], a: g[1], ok: true, v: g[2] }));
  const badDef = (cfg.bad || []).map(g => ({ t: g[0], a: g[1], ok: false, v: g[2] }));
  const allDef = goodDef.concat(badDef);
  if (cfg.mode === 'sort') {
    timeLeft = cfg.time || 0;
    setLives();
  }
  function spawn() {
    if (!allDef.length) return;
    const pick = allDef[Math.floor(Math.random() * allDef.length)];
    const isGood = pick.ok;
    const col = cfg.stats
      ? (Math.abs(pick.v - 22) > 15 ? 0xe08a8a : 0x57c7d8)
      : (isGood ? 0x5fcf80 : 0xe06a6a);
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.75, 0),
      new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.4, flatShading: true })
    );
    m.position.set(rand(-AX + 2, AX - 2), 14, rand(-AZ + 2, AZ - 2));
    m.userData = { ok: isGood, v: pick.v, vy: -rand(2.4, 4.2), vx: rand(-1.2, 1.2) };
    const lb = label(pick.t + '\n' + pick.a, cfg.stats ? (Math.abs(pick.v - 22) > 15 ? '#f4c9c9' : '#c9e8f2') : (isGood ? '#c9f2d4' : '#f4c9c9'), 3.0);
    lb.position.set(0, 1.5, 0);
    m.add(lb);
    scene.add(m);
    items.push(m);
  }
  function statsHud() {
    const mn = mean(caughtVals), md = median(caughtVals);
    hudHTML(`<b style="color:var(--accent)">قيم مسجّلة:</b> ${caughtVals.length} ·
      <b style="color:var(--warn)">Mean</b> = ${mn.toFixed(1)} ·
      <b style="color:var(--good)">Median</b> = ${md.toFixed(1)} ·
      <b style="color:var(--accent)">الوقت:</b> ${Math.max(0, Math.ceil(timeLeft))}ث`);
  }

  /* ---------- BUILD mode setup ---------- */
  const BINS = 14, BIN_W = 2.0, BMIN = 0, BMAX = 45;
  const bins = [], binVals = [];
  let sampleCount = 0;
  const nSamples = cfg.n || 30;
  const popName = cfg.pop || 'skewed';
  if (cfg.mode === 'build') {
    for (let i = 0; i < BINS; i++) {
      const x = (i - (BINS - 1) / 2) * BIN_W;
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(BIN_W * 0.88, 1, BIN_W * 0.88),
        new THREE.MeshStandardMaterial({ color: 0x57c7d8, emissive: 0x1e4a52, emissiveIntensity: 0.5, transparent: true, opacity: 0.78 })
      );
      m.position.set(x, 0.5, -AZ * 0.28);
      m.scale.y = 0.02;
      scene.add(m);
      bins.push(m); binVals.push(0);
    }
    const popGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const popMat = new THREE.MeshStandardMaterial({ color: 0xd8b65a, emissive: 0x6b5418, emissiveIntensity: 0.4 });
    for (let i = 0; i < 90; i++) {
      const v = POP[popName]();
      const p = new THREE.Mesh(popGeo, popMat);
      const x = (v - (BMIN + BMAX) / 2) * (BIN_W * 0.9);
      p.position.set(x + rand(-0.35, 0.35), 0.15 + (i % 9) * 0.3, AZ * 0.45 + rand(-1.5, 1.5));
      scene.add(p);
    }
    const pl = label('Population · المجتمع', '#e7d3a3', 3.6);
    pl.position.set(0, 3.8, AZ * 0.45 + 2.6); scene.add(pl);
    const sl = label('Sampling distribution of the mean · توزيع وسائل العينات', '#cfe8ee', 4.8);
    sl.position.set(0, 7.8, -AZ * 0.28 - 3.6); scene.add(sl);
    hudHTML(`<b style="color:var(--accent)">n = ${nSamples}</b> · عينات: 0 · اضغط <b>Space</b> لتسحب عينة`);
  }
  function reset() {
    sampleCount = 0;
    for (let i = 0; i < BINS; i++) binVals[i] = 0;
    flying.forEach(b => scene.remove(b));
    flying.length = 0;
    hudHTML(`<b style="color:var(--accent)">n = ${nSamples}</b> · عينات: 0 · اضغط <b>Space</b>`);
  }
  function drawSample() {
    if (cfg.mode !== 'build' || state.over) return;
    const vals = [];
    for (let i = 0; i < nSamples; i++) vals.push(POP[popName]());
    const m = mean(vals);
    sampleCount++;
    const bi = clamp(Math.floor((m - BMIN) / (BMAX - BMIN) * BINS), 0, BINS - 1);
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffe9a8, emissive: 0x8a6d1f, emissiveIntensity: 0.6 })
    );
    const bx = (bi - (BINS - 1) / 2) * BIN_W;
    ball.position.set(bx + rand(-0.3, 0.3), 13, -AZ * 0.28 + rand(-0.5, 0.5));
    ball.userData = { vy: 0, bi };
    scene.add(ball);
    flying.push(ball);
    binVals[bi]++;
    const mn = mean(binVals.reduce((acc, v, i) => { acc.push(...new Array(v).fill(BMIN + (i + 0.5) * (BMAX - BMIN) / BINS)); return acc; }, []));
    const se = POP_SD[popName] / Math.sqrt(nSamples);
    hudHTML(`<b style="color:var(--accent)">n = ${nSamples}</b> · عينات: ${sampleCount} ·
      <b style="color:var(--warn)">mean ≈ ${mn.toFixed(1)}</b> ·
      <b style="color:var(--good)">SE ≈ ${se.toFixed(2)}</b> ${sampleCount >= 12 ? '— لاحظ شكل الجرس! 🔔' : ''}`);
  }
  function drawSamples(k) {
    if (cfg.mode !== 'build') return;
    let i = 0;
    const iv = setInterval(() => {
      drawSample();
      if (++i >= k) clearInterval(iv);
    }, 45);
  }

  /* ---------- update: player movement ---------- */
  function updatePlayer(dt) {
    const sp = 16 * dt;
    let dx = 0, dz = 0;
    if (keys['w'] || keys['arrowup']) dz -= 1;
    if (keys['s'] || keys['arrowdown']) dz += 1;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    if (dx || dz) {
      const l = Math.hypot(dx, dz); dx /= l; dz /= l;
      player.position.x = clamp(player.position.x + dx * sp, -AX + 1, AX - 1);
      player.position.z = clamp(player.position.z + dz * sp, -AZ + 1, AZ - 1);
      targetPt = null;
    } else if (targetPt) {
      const d = targetPt.clone().sub(player.position);
      d.y = 0;
      if (d.length() > 0.6) {
        d.normalize();
        player.position.x = clamp(player.position.x + d.x * sp, -AX + 1, AX - 1);
        player.position.z = clamp(player.position.z + d.z * sp, -AZ + 1, AZ - 1);
      }
    }
    pLight.intensity = 1.2 + Math.sin(performance.now() * 0.005) * 0.3;
  }

  /* ---------- update: ORDER ---------- */
  function updateOrder(now) {
    tokens.forEach(t => {
      if (t.userData.done) return;
      t.rotation.y += 0.014;
      t.position.y = 1.6 + Math.sin(now * 0.002 + t.userData.i) * 0.3;
      if (t.position.distanceTo(player.position) < 2.0) {
        if (t.userData.i === orderIdx) {
          t.userData.done = true;
          t.visible = false;
          orderIdx++;
          setScore('✓ ' + orderIdx + '/' + steps.length);
          const spot = new THREE.PointLight(0x57c7d8, 3, 8);
          spot.position.copy(t.position);
          scene.add(spot);
          setTimeout(() => scene.remove(spot), 400);
          if (orderIdx >= steps.length) {
            hudHTML('🎉 <b style="color:var(--good)">كملت الدورة بالترتيب الصحيح!</b>');
            banner('🏆 اكتملت المراحل بالترتيب الصحيح — أحسنت!', true);
          } else {
            hudHTML(`<b style="color:var(--accent)">التالي:</b> <b style="color:var(--warn)">${steps[orderIdx]} · ${ars[orderIdx]}</b> — باقي ${steps.length - orderIdx}`);
          }
        } else {
          state.lives--;
          setLives();
          t.position.set(rand(-AX + 3, AX - 3), 1.6, rand(-AZ + 3, AZ - 3));
          hudHTML(`<b style="color:var(--bad)">✗ غلط!</b> الترتيب مهم — الجاية <b style="color:var(--warn)">${steps[orderIdx]} · ${ars[orderIdx]}</b>`);
          if (state.lives <= 0) banner('💀 خلصت المحاولات — الترتيب الصحيح: ' + ars.join(' ← '), false);
        }
      }
    });
  }

  /* ---------- update: SORT ---------- */
  function updateSort(dt) {
    if (cfg.stats) timeLeft -= dt;
    spawnT -= dt;
    if (spawnT <= 0 && !state.over) {
      spawn();
      spawnT = cfg.stats ? rand(0.7, 1.3) : rand(0.9, 1.8);
    }
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.position.y += it.userData.vy * dt;
      it.position.x += it.userData.vx * dt;
      it.rotation.x += dt * 1.2;
      it.rotation.y += dt * 0.9;
      if (it.position.distanceTo(player.position) < 1.75) {
        scene.remove(it); items.splice(i, 1);
        if (cfg.stats) {
          caughtVals.push(it.userData.v);
          setScore('🎯 ' + caughtVals.length + ' قيمة');
          statsHud();
          if (caughtVals.length >= (cfg.target || 20)) {
            const mn = mean(caughtVals), md = median(caughtVals);
            banner(`🏆 سجّلت ${caughtVals.length} قيمة!<br><span class="small">Mean = ${mn.toFixed(1)} · Median = ${md.toFixed(1)}<br>القيم الحمراء (الشاذة) تسحب الـ Mean بعيدًا، بينما الـ Median يكاد لا يتأثر!</span>`, true);
          }
        } else if (it.userData.ok) {
          state.score++;
          setScore('✓ ' + state.score + (cfg.target ? ' / ' + cfg.target : ''));
          if (cfg.target && state.score >= cfg.target) banner('🏆 وصلت الهدف! ' + state.score + ' نقطة — فهمت الفرق', true);
        } else {
          state.lives--;
          setLives();
          hudHTML(`<b style="color:var(--bad)">✗ غلط!</b> تجنّب العناصر الحمراء — فقط الخضراء`);
          if (state.lives <= 0) banner('💀 انتهت الأرواح — تذكّر: الأخضر صح، الأحمر خطأ', false);
        }
        continue;
      }
      if (it.position.y < 0.4) { scene.remove(it); items.splice(i, 1); }
    }
    if (cfg.stats && timeLeft <= 0 && !state.over) {
      const mn = mean(caughtVals), md = median(caughtVals);
      banner(`⏰ انتهى الوقت — سجّلت ${caughtVals.length} قيمة.<br><span class="small">Mean = ${mn.toFixed(1)} · Median = ${md.toFixed(1)} — القيم الشاذة تسحب الـ Mean أكثر من الـ Median.</span>`, true);
    }
  }

  /* ---------- update: BUILD ---------- */
  function updateBuild(dt) {
    for (let i = flying.length - 1; i >= 0; i--) {
      const b = flying[i];
      b.userData.vy -= 26 * dt;
      b.position.y += b.userData.vy * dt;
      const targetY = bins[b.userData.bi].scale.y + 0.4;
      if (b.position.y < targetY) { scene.remove(b); flying.splice(i, 1); }
    }
    const maxV = Math.max(...binVals, 1);
    bins.forEach((b, vi) => {
      const h = Math.max(0.05, (binVals[vi] / maxV) * 7);
      b.scale.y += (h - b.scale.y) * Math.min(1, dt * 8);
      b.position.y = b.scale.y / 2;
    });
  }

  /* ---------- main loop ---------- */
  let last = performance.now(), visible = true;
  const io = new IntersectionObserver(es => { visible = es.some(e => e.isIntersecting); }, { threshold: 0.1 });
  io.observe(box);

  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!visible) return;
    if (cfg.mode === 'build' && state.over) { renderer.render(scene, camera); return; }
    if (state.over) { renderer.render(scene, camera); return; }
    updatePlayer(dt);
    if (cfg.mode === 'order') updateOrder(now);
    else if (cfg.mode === 'sort') updateSort(dt);
    else if (cfg.mode === 'build') updateBuild(dt);
    renderer.render(scene, camera);
  }

  function resize() {
    const w = W();
    renderer.setSize(w, H, false);
    camera.aspect = w / H;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);
  resize();
  requestAnimationFrame(loop);
}

function initAll() {
  $$('[data-game="3d"]').forEach(box => {
    let cfg = {};
    try { cfg = JSON.parse(box.dataset.config || '{}'); } catch (e) {}
    cfg.mode = cfg.mode || 'order';
    cfg.hgt = cfg.hgt || 360;
    try { makeGame(box, cfg); }
    catch (e) { box.innerHTML = '<div class="game-foot">تعذّر تشغيل اللعبة (three.js): ' + (e && e.message) + '</div>'; }
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
else initAll();

window.G3D = { initAll };
