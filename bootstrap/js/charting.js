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
}
function getContext(canvasId) {
	var $canvas = $(`<canvas id="${canvasId}"></canvas>`);
	$(`#${canvasId}-holder`).empty();
	$(`#${canvasId}-holder`).append($canvas);

	return document.getElementById(canvasId).getContext('2d');
}
