// gallery3d.js
// A drag-to-rotate 3D panel gallery for the hero, built with plain CSS 3D
// transforms — no external libraries, no network requests, no CDN dependency.
// This will always render: it can't hang on a failed script load like a
// CDN-based approach can.

(function () {
    const stage = document.getElementById('gallery3dStage');
    if (!stage) return;

    const panels = Array.from(stage.querySelectorAll('.gallery3d-panel'));
    const panelCount = panels.length || 3;
    const anglePerPanel = 360 / panelCount;

    let rotationY = 0;
    let isDragging = false;
    let startX = 0;
    let startRotation = 0;
    let autoRotateId = null;
    let resumeTimeoutId = null;
    let pointerId = null;

    function normalize(angle) {
        return ((angle % 360) + 360) % 360;
    }

    function updateFrontPanel() {
        // Whichever panel is closest to facing the viewer gets full brightness
        const current = normalize(rotationY);
        let closestIndex = 0;
        let closestDiff = Infinity;

        panels.forEach((panel, i) => {
            const panelAngle = normalize(i * anglePerPanel + rotationY);
            const diff = Math.min(panelAngle, 360 - panelAngle);
            if (diff < closestDiff) {
                closestDiff = diff;
                closestIndex = i;
            }
        });

        panels.forEach((panel, i) => {
            panel.classList.toggle('is-front', i === closestIndex);
        });
    }

    function applyRotation() {
        stage.style.transform = 'rotateY(' + rotationY + 'deg)';
        updateFrontPanel();
    }

    function stopAutoRotate() {
        if (autoRotateId !== null) {
            cancelAnimationFrame(autoRotateId);
            autoRotateId = null;
        }
    }

    function startAutoRotate() {
        stopAutoRotate();
        let lastTime = null;

        function step(time) {
            if (lastTime === null) lastTime = time;
            const delta = time - lastTime;
            lastTime = time;
            rotationY += delta * 0.015; // slow, gentle rotation
            applyRotation();
            autoRotateId = requestAnimationFrame(step);
        }

        autoRotateId = requestAnimationFrame(step);
    }

    function scheduleAutoRotateResume() {
        if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
        resumeTimeoutId = setTimeout(startAutoRotate, 2500);
    }

    function getClientX(event) {
        if (event.touches && event.touches.length) {
            return event.touches[0].clientX;
        }
        return event.clientX;
    }

    function onDragStart(event) {
        isDragging = true;
        stopAutoRotate();
        if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
        stage.classList.add('dragging');
        startX = getClientX(event);
        startRotation = rotationY;

        if (event.pointerId !== undefined && stage.setPointerCapture) {
            pointerId = event.pointerId;
            try {
                stage.setPointerCapture(pointerId);
            } catch (e) {
                // Safe to ignore — dragging still works without capture
            }
        }
    }

    function onDragMove(event) {
        if (!isDragging) return;
        const currentX = getClientX(event);
        const deltaX = currentX - startX;
        rotationY = startRotation + deltaX * 0.4;
        applyRotation();
        if (event.cancelable) event.preventDefault();
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        stage.classList.remove('dragging');
        if (pointerId !== null && stage.releasePointerCapture) {
            try {
                stage.releasePointerCapture(pointerId);
            } catch (e) {
                // Ignore
            }
            pointerId = null;
        }
        scheduleAutoRotateResume();
    }

    // Prefer Pointer Events where available (covers mouse + touch + pen)
    if (window.PointerEvent) {
        stage.addEventListener('pointerdown', onDragStart);
        stage.addEventListener('pointermove', onDragMove);
        stage.addEventListener('pointerup', onDragEnd);
        stage.addEventListener('pointercancel', onDragEnd);
        stage.addEventListener('pointerleave', () => {
            if (isDragging) onDragEnd();
        });
    } else {
        // Fallback for older browsers without Pointer Events support
        stage.addEventListener('mousedown', onDragStart);
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        stage.addEventListener('touchstart', onDragStart, { passive: true });
        stage.addEventListener('touchmove', onDragMove, { passive: false });
        stage.addEventListener('touchend', onDragEnd);
    }

    applyRotation();
    startAutoRotate();
})();