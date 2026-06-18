'use client'
import { useEffect, useRef } from 'react'

// ── Perlin noise ──────────────────────────────────────────────────────────────

class Grad {
  constructor(public x: number, public y: number, public z: number) {}
  dot2(x: number, y: number) { return this.x * x + this.y * y }
}

const grad3 = [
  new Grad(1,1,0), new Grad(-1,1,0), new Grad(1,-1,0), new Grad(-1,-1,0),
  new Grad(1,0,1), new Grad(-1,0,1), new Grad(1,0,-1), new Grad(-1,0,-1),
  new Grad(0,1,1), new Grad(0,-1,1), new Grad(0,1,-1), new Grad(0,-1,-1),
]

const p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
const perm = new Array(512)
const gradP = new Array(512)

function seedNoise(seed: number) {
  if (seed > 0 && seed < 1) seed *= 65536
  seed = Math.floor(seed)
  if (seed < 256) seed |= seed << 8
  for (let i = 0; i < 256; i++) {
    const v = (i & 1) ? p[i] ^ (seed & 255) : p[i] ^ ((seed >> 8) & 255)
    perm[i] = perm[i + 256] = v
    gradP[i] = gradP[i + 256] = grad3[v % 12]
  }
}

function perlin2(x: number, y: number) {
  let X = Math.floor(x), Y = Math.floor(y)
  x -= X; y -= Y
  X &= 255; Y &= 255
  const n00 = gradP[X + perm[Y]].dot2(x, y)
  const n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1)
  const n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y)
  const n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1)
  const u = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b
  return lerp(lerp(n00, n10, u(x)), lerp(n01, n11, u(x)), u(y))
}

seedNoise(Math.random())

// ── Config ────────────────────────────────────────────────────────────────────

const cfg = {
  waveSpeedX: 0.0125,
  waveSpeedY: 0.005,
  waveAmpX:   32,
  waveAmpY:   16,
  xGap:       10,
  yGap:       32,
}

type Point = { x: number; y: number; wave: { x: number; y: number } }

// ── Component ─────────────────────────────────────────────────────────────────

export default function WavesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx = canvas.getContext('2d')!

    // Derive wave line color from --accent CSS variable so canvas stays in sync
    const accentHex = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim()
    const r = parseInt(accentHex.slice(1, 3), 16)
    const g = parseInt(accentHex.slice(3, 5), 16)
    const b = parseInt(accentHex.slice(5, 7), 16)
    const lineColor = `rgba(${r},${g},${b},0.65)`

    let bounding = { width: 0, height: 0 }
    let lines: Point[][] = []
    let frameId: number

    function setSize() {
      bounding = { width: window.innerWidth, height: window.innerHeight }
      canvas.width  = bounding.width
      canvas.height = bounding.height
    }

    function setLines() {
      lines = []
      const oWidth  = bounding.width  + 200
      const oHeight = bounding.height + 30
      const totalLines  = Math.ceil(oWidth  / cfg.xGap)
      const totalPoints = Math.ceil(oHeight / cfg.yGap)
      const xStart = (bounding.width  - cfg.xGap * totalLines)  / 2
      const yStart = (bounding.height - cfg.yGap * totalPoints) / 2
      for (let i = 0; i <= totalLines; i++) {
        const pts: Point[] = []
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({ x: xStart + cfg.xGap * i, y: yStart + cfg.yGap * j, wave: { x: 0, y: 0 } })
        }
        lines.push(pts)
      }
    }

    function movePoints(time: number) {
      for (const pts of lines) {
        for (const pt of pts) {
          const move = perlin2(
            (pt.x + time * cfg.waveSpeedX) * 0.002,
            (pt.y + time * cfg.waveSpeedY) * 0.0015,
          ) * 12
          pt.wave.x = Math.cos(move) * cfg.waveAmpX
          pt.wave.y = Math.sin(move) * cfg.waveAmpY
        }
      }
    }

    function drawLines() {
      ctx.clearRect(0, 0, bounding.width, bounding.height)
      ctx.beginPath()
      ctx.lineWidth   = 3
      ctx.strokeStyle = lineColor
      for (const points of lines) {
        ctx.moveTo(points[0].x + points[0].wave.x, points[0].y + points[0].wave.y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x + points[j].wave.x, points[j].y + points[j].wave.y)
        }
      }
      ctx.stroke()
    }

    function tick(t: number) {
      movePoints(t)
      drawLines()
      frameId = requestAnimationFrame(tick)
    }

    setSize()
    setLines()
    frameId = requestAnimationFrame(tick)

    const onResize = () => { setSize(); setLines() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} id="waves-bg" />
}
