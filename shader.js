import * as THREE from 'three';

const vert = `
  varying vec2 vUv;
  varying vec2 vUvCover;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;

  void main(){
    vUv = uv;
    float texR = uTextureSize.x / uTextureSize.y;
    float quadR = uQuadSize.x / uQuadSize.y;
    vec2 s = vec2(1.0);
    if (quadR > texR) { s.y = texR / quadR; } else { s.x = quadR / texR; }
    vUvCover = vUv * s + (1.0 - s) * 0.5;
    gl_Position = vec4(position, 1);
  }
`;

const frag = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uVelocityStrength;
  varying vec2 vUv;
  varying vec2 vUvCover;

  void main() {
    vec2 texCoords = vUvCover;
    float amt = 0.03 * uVelocityStrength;
    float t = uTime * 0.8;
    texCoords.y += sin((texCoords.x * 8.0) + t) * amt;
    texCoords.x += cos((texCoords.y * 6.0) - t * 0.8) * amt * 0.6;
    float dir = sign(uScrollVelocity);
    vec2 tc = texCoords;
    float r = texture2D(uTexture, tc + vec2( amt * 0.50 * dir, 0.0)).r;
    float g = texture2D(uTexture, tc + vec2( amt * 0.25 * dir, 0.0)).g;
    float b = texture2D(uTexture, tc + vec2(-amt * 0.35 * dir, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

let scrollV = 0, scrollS = 0;
let lastY = window.scrollY, lastT = performance.now();

window.addEventListener('scroll', () => {
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    const vel = ((window.scrollY - lastY) / dt) * 16;
    scrollV = Math.max(-1, Math.min(1, vel / 100));
    scrollS = Math.min(1, Math.abs(scrollV));
    lastY = window.scrollY;
    lastT = now;
}, { passive: true });

const canvases = [];
let prevTime = performance.now();

(function tick() {
    requestAnimationFrame(tick);
    const now = performance.now();
    const dt = (now - prevTime) * 0.001;
    prevTime = now;

    scrollV *= 0.88;
    scrollS *= 0.88;
    if (scrollS < 0.001) { scrollV = 0; scrollS = 0; }

    for (const { uniforms, renderer, scene, camera } of canvases) {
        uniforms.uTime.value += dt;
        uniforms.uScrollVelocity.value = scrollV;
        uniforms.uVelocityStrength.value = scrollS;
        renderer.render(scene, camera);
    }
})();

for (const coverEl of document.querySelectorAll('.cover')) {
    const img = coverEl.querySelector('img');
    const figure = coverEl.querySelector('figure');
    if (!img || !figure) continue;

    figure.style.position = 'relative';
    img.style.visibility = 'hidden';

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    Object.assign(renderer.domElement.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
    });
    figure.appendChild(renderer.domElement);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
        uTexture: { value: null },
        uTextureSize: { value: new THREE.Vector2(1, 1) },
        uQuadSize: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uScrollVelocity: { value: 0 },
        uVelocityStrength: { value: 0 },
    };

    scene.add(new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, transparent: true })
    ));

    const layout = () => {
        const { width, height } = figure.getBoundingClientRect();
        if (width && height) {
            renderer.setSize(width, height, false);
            uniforms.uQuadSize.value.set(width, height);
        }
    };

    new THREE.TextureLoader().load(img.src, tex => {
        tex.colorSpace = THREE.SRGBColorSpace;
        uniforms.uTexture.value = tex;
        uniforms.uTextureSize.value.set(tex.image.naturalWidth || tex.image.width, tex.image.naturalHeight || tex.image.height);
        layout();
    });

    new ResizeObserver(layout).observe(figure);
    canvases.push({ uniforms, renderer, scene, camera });
}