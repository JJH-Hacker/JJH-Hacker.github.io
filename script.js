document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect on background shapes
    const shapes = document.querySelectorAll('.shape');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 15;
            const offsetX = (x - 0.5) * speed;
            const offsetY = (y - 0.5) * speed;
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

    // Ripple effect on link cards when clicked
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});
