document.getElementById('btn-light').addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
});

document.getElementById('btn-dark').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
});

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ autoRaf: true });
lenis.on('scroll', ScrollTrigger.update);

const proxy = { skew: 0 };
const skewSetter = gsap.quickSetter('.cover', 'skewY', 'deg');
const clamp = gsap.utils.clamp(-5, 5);

ScrollTrigger.create({
    onUpdate(self) {
        const skew = clamp(self.getVelocity() / -500);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: 'power3',
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
            });
        }
    }
});

gsap.set('.cover', { transformOrigin: 'right center', force3D: true });

document.querySelectorAll('.cover').forEach(cover => {
    const img = cover.querySelector('img');
    cover.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' }));
    cover.addEventListener('mouseleave', () => gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' }));
});
