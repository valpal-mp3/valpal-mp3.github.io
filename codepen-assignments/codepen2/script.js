let mouseX = 0;
let mouseY = 0;

const mousePos = { x: 0, y: 0 };

radar.addEventListener("mousemove", (event) => {
	const rect = event.target.getBoundingClientRect();
	mousePos.x = event.clientX - rect.left;
	mousePos.y = event.clientY - rect.top;
});

function drawDot() {
	const dotClone = document.getElementById("dot").cloneNode();
	dotClone.style.left = mousePos.x + "px";
	dotClone.style.top = mousePos.y + "px";

	radar.appendChild(dotClone);

	setTimeout(() => {
		radar.removeChild(dotClone);
	}, 3000);
}

rotator.style.animationName = "rotate";
rotator.style.animationDuration = "3s";
const startTime = performance.now();

function isMouseInRadarArea(currentAngle) {
	const dx = mousePos.x - 250;
	const dy = mousePos.y - 250;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance > 225) return false;

	let angleToMouse = Math.atan2(dy, dx) * (180 / Math.PI);
	angleToMouse = (angleToMouse + 90) % 360;
	if (angleToMouse < 0) angleToMouse += 360;

	const startAngle = currentAngle;
	const endAngle = (currentAngle + 5) % 360;

	if (startAngle <= endAngle) {
		return angleToMouse >= startAngle && angleToMouse <= endAngle;
	} else {
		return angleToMouse >= startAngle || angleToMouse <= endAngle;
	}
}

function animateRadar() {
	const elapsedTime = (performance.now() - startTime) / 1000;
	const currentAngle = ((elapsedTime * 360) / 3) % 360;

	if (isMouseInRadarArea(currentAngle)) {
		console.log("Mouse is in the radar's scanned area!");
		drawDot();
	}

	requestAnimationFrame(animateRadar);
}

animateRadar();