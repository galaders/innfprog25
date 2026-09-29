document.addEventListener('DOMContentLoaded', function () {
	const sliderContainers = document.querySelectorAll('.slider-container');

	sliderContainers.forEach(function (container) {
		const rangeInput = container.querySelector('.slider-range');
		const imgBefore = container.querySelector('.img-before');
		const divider = container.querySelector('.slider-divider');

		function updateSlider(value) {
			imgBefore.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
			divider.style.left = `${value}%`;
		}

		rangeInput.addEventListener('input', function (event) {
			updateSlider(event.target.value);
		});

		updateSlider(rangeInput.value);
	});
});
