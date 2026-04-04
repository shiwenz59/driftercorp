/* ════════════════════════════════════════
   LINE WAVES BACKGROUND
   Vanilla JS port of React Bits <Waves>
   ════════════════════════════════════════ */

(function () {
  // ── Perlin noise helpers ──
  function Grad(x, y, z) { this.x = x; this.y = y; this.z = z; }
  Grad.prototype.dot2 = function (x, y) { return this.x * x + this.y * y; };

  var grad3 = [
    new Grad(1,1,0), new Grad(-1,1,0), new Grad(1,-1,0), new Grad(-1,-1,0),
    new Grad(1,0,1), new Grad(-1,0,1), new Grad(1,0,-1), new Grad(-1,0,-1),
    new Grad(0,1,1), new Grad(0,-1,1), new Grad(0,1,-1), new Grad(0,-1,-1)
  ];

  var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

  var perm = new Array(512), gradP = new Array(512);

  function seedNoise(seed) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (var i = 0; i < 256; i++) {
      var v = (i & 1) ? p[i] ^ (seed & 255) : p[i] ^ ((seed >> 8) & 255);
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return (1 - t) * a + t * b; }

  function perlin2(x, y) {
    var X = Math.floor(x), Y = Math.floor(y);
    x -= X; y -= Y;
    X &= 255; Y &= 255;
    var n00 = gradP[X + perm[Y]].dot2(x, y);
    var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
    var u = fade(x);
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  }

  seedNoise(Math.random());

  // ── Config ──
  var cfg = {
    lineColor:  'rgba(39, 103, 146, 0.65)',
    waveSpeedX: 0.0125,
    waveSpeedY: 0.005,
    waveAmpX:   32,
    waveAmpY:   16,
    xGap:       10,
    yGap:       32
  };

  // ── State ──
  var canvas, ctx, bounding, lines, frameId;

  function setSize() {
    bounding = { width: window.innerWidth, height: window.innerHeight };
    canvas.width  = bounding.width;
    canvas.height = bounding.height;
  }

  function setLines() {
    lines = [];
    var oWidth  = bounding.width  + 200;
    var oHeight = bounding.height + 30;
    var totalLines  = Math.ceil(oWidth  / cfg.xGap);
    var totalPoints = Math.ceil(oHeight / cfg.yGap);
    var xStart = (bounding.width  - cfg.xGap * totalLines)  / 2;
    var yStart = (bounding.height - cfg.yGap * totalPoints) / 2;
    for (var i = 0; i <= totalLines; i++) {
      var pts = [];
      for (var j = 0; j <= totalPoints; j++) {
        pts.push({
          x: xStart + cfg.xGap * i,
          y: yStart + cfg.yGap * j,
          wave: { x: 0, y: 0 }
        });
      }
      lines.push(pts);
    }
  }

  function movePoints(time) {
    for (var i = 0; i < lines.length; i++) {
      var pts = lines[i];
      for (var j = 0; j < pts.length; j++) {
        var pt = pts[j];
        var move = perlin2(
          (pt.x + time * cfg.waveSpeedX) * 0.002,
          (pt.y + time * cfg.waveSpeedY) * 0.0015
        ) * 12;
        pt.wave.x = Math.cos(move) * cfg.waveAmpX;
        pt.wave.y = Math.sin(move) * cfg.waveAmpY;
      }
    }
  }

  function drawLines() {
    ctx.clearRect(0, 0, bounding.width, bounding.height);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = cfg.lineColor;
    for (var i = 0; i < lines.length; i++) {
      var points = lines[i];
      ctx.moveTo(points[0].x + points[0].wave.x, points[0].y + points[0].wave.y);
      for (var j = 1; j < points.length; j++) {
        ctx.lineTo(points[j].x + points[j].wave.x, points[j].y + points[j].wave.y);
      }
    }
    ctx.stroke();
  }

  function tick(t) {
    movePoints(t);
    drawLines();
    frameId = requestAnimationFrame(tick);
  }

  // ── Init ──
  canvas = document.getElementById('waves-bg');
  ctx    = canvas.getContext('2d');

  setSize();
  setLines();
  frameId = requestAnimationFrame(tick);

  window.addEventListener('resize', function () { setSize(); setLines(); });
})();
