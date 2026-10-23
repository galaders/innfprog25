document.addEventListener('DOMContentLoaded', function () {
	const sliderContainers = document.querySelectorAll('.slider-container');
	const backgroundColors = [
		['#3a3a3a', '#1769aa'], /* fargeendring på slider av bilder */
		['#4a4a4a', '#4caf50'], /* fargeendring på slider av bilder */	
		['#303536', '#546e7a'], /* fargeendring på slider av bilder */
		['#3b4144', '#00a844'], /* fargeendring på slider av bilder */
		['#343434', '#0288d1'] /* fargeendring på slider av bilder */
	];

	function mixColors(startColor, endColor, amount) {
		const start = startColor.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16));
		const end = endColor.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16));
		const mixed = start.map((value, index) => Math.round(value + (end[index] - value) * amount));

		return `rgb(${mixed.join(', ')})`;
	}

	sliderContainers.forEach(function (container, index) {
		const rangeInput = container.querySelector('.slider-range');
		const imgAfter = container.querySelector('.img-after');
		const imgBefore = container.querySelector('.img-before');
		const divider = container.querySelector('.slider-divider');
		const section = container.closest('section');

		function updateSlider(value) {
			const sliderValue = Number(value);
			const amount = sliderValue / 100;

			imgAfter.style.clipPath = `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`;
			divider.style.left = `${value}%`;
			section.style.backgroundColor = mixColors(
				backgroundColors[index][0],
				backgroundColors[index][1],
				amount
			);
		}

		rangeInput.addEventListener('input', function (event) {
			updateSlider(event.target.value);
		});

		if (container.classList.contains('click-to-toggle')) {
			function toggleImage() {
				rangeInput.value = rangeInput.value === '100' ? '0' : '100';
				updateSlider(rangeInput.value);
			}

			container.addEventListener('click', toggleImage);
			container.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					toggleImage();
				}
			});
		}

		updateSlider(rangeInput.value);
	});
});
