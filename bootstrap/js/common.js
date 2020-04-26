const covid19BaseUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation';
const covid19CurrentCasesUrl = `${covid19BaseUrl}/covid-19-current-cases`;
const covid19CurrentCasesDetailsUrl = `${covid19CurrentCasesUrl}/covid-19-current-cases-details`;

var covid19DetailJson;
var covid19LocationData;
const monthName = new Date().toLocaleString('default', { month: 'long' });

$(document).ready(function () {
	window.onresize = function () {
		const resizedInMobilePortrait =
			this.isMobile() &&
			!isHorizontalBarChart(this.window.nzLocationChart);

		const switchedToLandscape =
			this.isLandscape() &&
			isHorizontalBarChart(this.window.nzLocationChart);

		const mobileSizeToDesktopJump =
			!this.isMobile() &&
			!this.isLandscape() &&
			isHorizontalBarChart(this.window.nzLocationChart);

		if (
			resizedInMobilePortrait ||
			switchedToLandscape ||
			mobileSizeToDesktopJump
		) {
			// if mobile device rotated then re-draw all charts
			this.renderAllNZCharts();
			return;
		}

		//if on desktop coming back from small screen to big screen then redraw charts
		this.resizeCharts();
	};
	//Google analytics register page view
	gtag('event', 'Covid19');
	gtag('event', 'page_view');

	//Get NZ current cases and details page
	GetData(covid19CurrentCasesUrl, parseCurrentCasesPageHtml);
	GetData(covid19CurrentCasesDetailsUrl, parseCurrentCasesDetailsPageHtml);

	//Dropown filter for location wise age chart
	$('#locationWiseAgePieSection #locationFilter').change(function () {
		updateLocationWisePieChart();
		getLocationWiseTimelinechart();
		resizeCharts();
	});
});

function GetData(url, callback) {
	$.ajax({
		method: 'GET',
		dataType: 'html',
		url: url,
		crossDomain: true,
		crossOrigin: true,
		success: callback,
	});
}

function parseCurrentCasesPageHtml(html) {
	//get summary table
	var summaryHtml = $(html).find('h2:contains("Summary")').next();
	summaryHtml.css({ width: '100%' });
	summaryHtml = summaryHtml.html();
	summaryHtml = summaryHtml.replace('strong', 'span');
	var table = $('<table class="table"></table>').append(summaryHtml);
	$(table).find('tr').first().find('th').css('border-top', 'none');
	$('#summary').append(table);
}
function parseCurrentCasesDetailsPageHtml(html) {
	var confirmedCasesTable = $(html)
		.find('.table-style-two:contains("Confirmed")')
		.first();
	confirmedCasesTable.find('caption').remove();
	var json = currentCaseDetailsTableToJson(confirmedCasesTable);
	json = _.sortBy(json, 'location');
	//render all charts
	covid19DetailJson = json;

	renderAllNZCharts();
}

function renderAllNZCharts() {
	getLocationWiseLinechart(covid19DetailJson);
	renderLocationWiseBarSection(covid19DetailJson);
	//chart loaded, hide loader and show chart
	showChart();
}
function renderLocationWiseBarSection(json) {
	var locations = _.uniq(json.map((x) => x.location));
	_.forEach(locations, function (loc) {
		$('#locationWiseAgePieSection #locationFilter').append(
			$('<option></option>').attr('value', loc).text(loc)
		);
	});

	updateLocationWisePieChart();
	getLocationWiseTimelinechart();
}
function getSelectionLocation() {
	return $(
		'#locationWiseAgePieSection #locationFilter option:selected'
	).val();
}
function updateLocationWisePieChart() {
	var sortedCovid19Data = _.sortBy(covid19DetailJson, ['location', 'age']);
	covid19LocationData = _.filter(sortedCovid19Data, {
		location: getSelectionLocation(),
	});
	const allAgeGrops = _.uniq(
		covid19DetailJson.map((x) => $.trim(x.age))
	).sort();
	//find distinct age groups
	//Iterate over male and female couts and insert the age group with 0 count
	var maleData = _.filter(covid19LocationData, { gender: 'Male' });
	var femaleData = _.filter(covid19LocationData, { gender: 'Female' });

	var maleCounts = addMissingAgegroups(
		_.countBy(maleData, 'age'),
		allAgeGrops
	);
	var femaleCounts = addMissingAgegroups(
		_.countBy(femaleData, 'age'),
		allAgeGrops
	);

	getLocationWiseBarchart(allAgeGrops, maleCounts, femaleCounts);
}

function addMissingAgegroups(data, allAgeGroups) {
	//add missing group with age -
	_.forEach(allAgeGroups, function (ageGroup) {
		if (!_.includes(Object.keys(data), ageGroup))
			data[$.trim(ageGroup)] = 0;
	});

	var sortedKeyData = [];
	//sort prop names
	var keys = Object.keys(data).sort();
	_.forEach(keys, (key) => (sortedKeyData[key] = data[key]));

	return sortedKeyData;
}
var locationBarOptions = {
	events: false,
	tooltips: {
		enabled: false,
	},
	hover: {
		animationDuration: 0,
	},
	animation: {
		duration: 1,
		onComplete: function () {
			var chartInstance = this.chart,
				ctx = chartInstance.ctx;
			ctx.font = Chart.helpers.fontString(
				Chart.defaults.global.defaultFontSize,
				'Bold',
				Chart.defaults.global.defaultFontFamily
			);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'bottom';
			ctx.defaultFontColor = '#6E6A6A';

			ctx.fillStyle = ctx.defaultFontColor;

			this.data.datasets.forEach(function (dataset, i) {
				var meta = chartInstance.controller.getDatasetMeta(i);
				const bigNum = _.max(dataset.data) - 20;
				meta.data.forEach(function (bar, index) {
					var data = dataset.data[index];
					if (!isMobile())
						ctx.fillText(data, bar._model.x, bar._model.y - 2);
					else {
						ctx.fillStyle =
							data >= bigNum ? '#FFFFFF' : ctx.defaultFontColor;

						ctx.fillText(
							data,
							data >= bigNum
								? bar._model.x - 15
								: bar._model.x + 15,
							bar._model.y + 7
						);
					}
				});
			});
		},
	},
};
var timelineOptionsWithTooltip = {
	events: false,
	tooltips: {
		enabled: false,
	},
	hover: {
		animationDuration: 0,
	},
	animation: {
		duration: 1,
		onComplete: function () {
			var chartInstance = this.chart,
				ctx = chartInstance.ctx;
			ctx.font = Chart.helpers.fontString(
				Chart.defaults.global.defaultFontSize,
				'Bold',
				Chart.defaults.global.defaultFontFamily
			);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'bottom';
			ctx.defaultFontColor = '#6E6A6A';
			ctx.fillStyle = ctx.defaultFontColor;

			this.data.datasets.forEach(function (dataset, i) {
				var meta = chartInstance.controller.getDatasetMeta(i);
				meta.data.forEach(function (bar, index) {
					var data = dataset.data[index];
					var xFiller = 0;
					if (parseInt(data) > 99) {
						xFiller = 10;
					}

					ctx.fillText(
						data,
						bar._model.x - xFiller,
						bar._model.y - 10
					);
				});
			});
		},
	},
};

function getLocationWiseLinechart(chartData) {
	const countData = _.countBy(chartData, 'location');
	var ctx = getContext('locationWiseLineChart');
	if (!isMobile()) {
		locationBarOptions.scales = {
			yAxes: [
				{
					ticks: {
						suggestedMin: 0,
						suggestedMax: _.max(Object.values(countData)) + 10,
					},
				},
			],
		};
	}
	var chart = new Chart(ctx, {
		type: isMobile() ? 'horizontalBar' : 'bar',
		data: {
			labels: Object.keys(countData),
			datasets: [
				{
					fill: false,
					label: `Confirmed Cases by location in ${monthName} 2020`,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(countData),
				},
			],
		},
		options: locationBarOptions,
	});
	if (window.nzLocationChart != undefined) window.nzLocationChart.destroy();
	window.nzLocationChart = chart;
}
function getPreviousIndexCount(array, prevIndex) {
	if (prevIndex == 0) return 0;
	return array[prevIndex - 1];
}
function addMissingDatesInTimeline(timelineLabels, timelineCounts) {
	//iterate from 1st date of month the to Today
	for (let index = 1; index <= moment().date(); index++) {
		var indexDate = moment(moment().format('YYYYMM01'), 'YYYYMMDD').add(
			index - 1,
			'days'
		);
		//find out and insert if any missing date
		var insertIndex = timelineLabels.indexOf(indexDate.format('YYYYMMDD'));
		if (insertIndex === -1) {
			timelineLabels.splice(index - 1, 0, indexDate.format('YYYYMMDD'));
			timelineCounts.splice(
				index - 1,
				0,
				getPreviousIndexCount(timelineCounts, index - 1)
			);
		}
	}

	return { timelineLabels, timelineCounts };
}
function getLocationWiseTimelinechart() {
	const cumulativeSum = ((sum) => (value) => (sum += value))(0);
	var timelineData = _.countBy(
		covid19LocationData.map((x) => moment(x.date).format('YYYYMMDD')).sort()
	);
	var timelineLabels = Object.keys(timelineData).map((x) =>
		moment(x, 'YYYYMMDD').format('YYYYMMDD')
	);
	timelineData = Object.values(timelineData).map(cumulativeSum);
	const total = covid19LocationData.length;

	var timelineChartData = addMissingDatesInTimeline(
		timelineLabels,
		timelineData
	);
	timelineChartData.timelineLabels = timelineChartData.timelineLabels.map(
		(x) => moment(x, 'YYYYMMDD').format('DD')
	);

	var constantsTooltipOptions = {};
	if (!isMobile()) {
		constantsTooltipOptions = timelineOptionsWithTooltip;
	}
	constantsTooltipOptions.scales = {
		yAxes: [
			{
				ticks: {
					suggestedMin: 0,
					suggestedMax: _.max(timelineChartData.timelineCounts) + 10,
				},
			},
		],
	};

	var ctx = getContext('locationWiseTimelineChart');
	var chart = new Chart(ctx, {
		type: 'line',
		options: {
			title: {
				display: true,
				text: `${getSelectionLocation()} Timeline : total ${total} cases in ${monthName} 2020`,
				fontSize: 20,
			},
			responsive: true,
			maintainAspectRatio: true,
			...constantsTooltipOptions,
		},
		data: {
			labels: timelineChartData.timelineLabels,
			datasets: [
				{
					fill: false,
					label: `Confirmed Cases in ${monthName} 2020`,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: timelineChartData.timelineCounts,
				},
			],
		},
	});
	if (window.timelineChart != undefined) {
		window.timelineChart.destroy();
	}
	window.timelineChart = chart;
}

var barOptions_stacked = {
	title: {
		display: true,
		text: '',
		fontSize: 20,
	},
	hover: {
		animationDuration: 0,
	},
	scales: {
		xAxes: [
			{
				ticks: {
					beginAtZero: true,
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize: 11,
				},
				scaleLabel: {
					display: false,
				},
				gridLines: {},
				stacked: true,
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
					color: '#fff',
					zeroLineColor: '#fff',
					zeroLineWidth: 0,
				},
				ticks: {
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize: 11,
				},
				stacked: true,
			},
		],
	},
	legend: {
		display: true,
	},

	pointLabelFontFamily: 'Quadon Extra Bold',
	scaleFontFamily: 'Quadon Extra Bold',
};
function getLocationWiseBarchart(allAgeGrops, maleCounts, femaleCounts) {
	maleCounts = Object.values(maleCounts);
	femaleCounts = Object.values(femaleCounts);
	const total = covid19LocationData.length;

	barOptions_stacked.title.text = `${getSelectionLocation()} Age group (years) : total ${total} cases in ${monthName} 2020`;

	var ctx = getContext('locationWiseBarChart');

	var chart = new Chart(ctx, {
		type: 'bar',
		options: barOptions_stacked,
		data: {
			datasets: [
				{
					label: 'Female',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: femaleCounts,
				},
				{
					label: 'Male',
					backgroundColor: 'rgba(68, 85, 191, 0.7)',
					borderColor: 'rgba(68, 85, 191, 0.7)',
					data: maleCounts,
				},
			],

			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: allAgeGrops,
		},
	});
	if (window.genderChart != undefined) window.genderChart.destroy();
	window.genderChart = chart;
}

function showChart() {
	$('#loading').hide();
	$('#covidData').show();
}
