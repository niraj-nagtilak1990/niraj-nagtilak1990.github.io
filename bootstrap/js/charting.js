//chart utility methods
function resizeCharts() {
	if (this.window.timelineChart && this.window.timelineChart.resize) {
		this.window.timelineChart.update();
		this.window.timelineChart.resize();
	}
	if (this.window.genderChart && this.window.genderChart.resize) {
		this.window.genderChart.update();
		this.window.genderChart.resize();
	}
	if (this.window.nzLocationChart && this.window.nzLocationChart.resize) {
		this.window.nzLocationChart.update();
		this.window.nzLocationChart.resize();
	}
}
const isHorizontalBarChart = chart => getChartType(chart) === 'horizontalBar';

function getChartType(chart) {
	return chart.config && chart.config.type;
}

function getContext(canvasId) {
	var $canvas = $(`<canvas id="${canvasId}"></canvas>`);
	if (isMobile()) {
		if (canvasId == 'locationWiseLineChart') {
			$canvas.attr('height', '500');
		}
		if (canvasId == 'locationWiseBarChart') {
			$canvas.attr('height', '300');
		}
		if (canvasId == 'locationWiseTimelineChart') {
			$canvas.attr('height', '500');
		}
	}
	$(`#${canvasId}-holder`).empty();
	$(`#${canvasId}-holder`).append($canvas);

	return document.getElementById(canvasId).getContext('2d');
}

function isMobile() {
	return window.matchMedia(
		'only screen and (max-width: 600px) and (orientation: portrait)'
	).matches;
}
function isLandscape() {
	return window.matchMedia(
		'only screen and (max-width: 768px) and (orientation: landscape)'
	).matches;
}
