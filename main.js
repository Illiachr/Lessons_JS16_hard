window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// eslint-disable-next-line no-unused-vars
	const init = (() => {
	//Получение блока кнопок управления
		const controls = document.getElementById('controls'),
			//получение и инициализация сanvas
			canvas = document.getElementById('stage'),
			ctx = canvas.getContext('2d'),
			boxWidth = 25,
			pixelsPerFrame = 2;
		// переменная для хранения id запроса кадра
		let requestID = 0,
			// начальная позиция элемента - слева
			posX = 0,
			// счетчик кликов мыши
			clickCount = 0,
			//направление перемещения true - влево, false - вправо
			direction = true;

		ctx.fillStyle = `#212121`;
		ctx.fillRect(posX, 0, boxWidth, canvas.height);

		const moveFwd = () => { // функция отрисовки перемещения вправо
				ctx.clearRect((posX - pixelsPerFrame), 0, boxWidth, canvas.height);
				ctx.fillRect(posX, 0, boxWidth, canvas.height);
				posX += pixelsPerFrame;
			},

			moveBwd = () => { // функция отрисовки перемещения влево
				ctx.clearRect((pixelsPerFrame + posX), 0, boxWidth, canvas.height);
				ctx.fillRect(posX, 0, boxWidth, canvas.height);
				posX -= pixelsPerFrame;
			},

			resetCanvas = () => { // очистка Canvas
				posX = 0;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillRect(posX, 0, boxWidth, canvas.height);
			},

			run = () => {
				requestID = requestAnimationFrame(run);

				if (direction) {
					moveFwd();
					if (posX >= (canvas.width - boxWidth)) { direction = false; }
				} else {
					moveBwd();
					if (posX <= 0) { direction = true; }
				}
			},

			conrtolClick = e => {
				if (e.target.matches('#startBtn')) {
					if (clickCount < 1) {
						e.target.textContent = `Pause Animation`;
						requestID = requestAnimationFrame(run);
						clickCount++;
					} else {
						e.target.textContent = `Play Animation`;
						clickCount = 0;
						cancelAnimationFrame(requestID);
					}
				}

				if (e.target.matches('#resetBtn')) {
					e.target.previousElementSibling.textContent = `Start Animation`;
					clickCount = 0;
					resetCanvas();
					cancelAnimationFrame(requestID);
				}
			};

		controls.addEventListener('click', conrtolClick);
	})();
});


