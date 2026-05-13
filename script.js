document.getElementById('btn-light').addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
});

document.getElementById('btn-dark').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
});