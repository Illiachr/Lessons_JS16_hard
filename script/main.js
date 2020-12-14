window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const field = document.getElementById('field'),
		ball = document.getElementById('ball'),
		start = document.getElementById('start'),
		reset = document.getElementById('reset'),
		to = field.clientHeight - ball.clientHeight,
		nextTo = field.clientWidth - ball.clientWidth;

	function bounce(timeFraction) {
		for (let a = 0, b = 1; 1; a += b, b /= 2) {
			if (timeFraction >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
			}
		}
	}

	function makeEaseOut(timing) {
		return function(timeFraction) {
			return 1 - timing(1 - timeFraction);
		};
	}



	function animate({ timing, draw, duration }) {

		const start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction изменяется от 0 до 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) {
				timeFraction = 1;
			}

			// вычисление текущего состояния анимации
			const progress = timing(timeFraction);

			draw(progress); // отрисовать её

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}

		});
	}

	start.addEventListener('click', () => {
		animate({
			duration: 4000,
			timing: makeEaseOut(bounce),
			draw(progress) {
				ball.style.top = `${to * progress}px`;
			}
		});

		animate({
			duration: 5000,
			timing: makeEaseOut(bounce),
			draw(progress) {
				ball.style.left = `${nextTo * progress}px`;
			}
		});
	});

	reset.addEventListener('click', () => {
		ball.style.top = 0;
		ball.style.left = 0;
	});

});
