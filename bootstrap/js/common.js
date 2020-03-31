const covid19BaseUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation';
const covid19CurrentCasesUrl = `${covid19BaseUrl}/covid-19-current-cases`;
const covid19CurrentCasesDetailsUrl = `${covid19CurrentCasesUrl}/covid-19-current-cases-details`;

var covid19DetailJson;
var covid19LocationData;

$(document).ready(function() {
	//Cross domain request helper with herokuapp
	jQuery.ajaxPrefilter(function(options) {
		if (
			options.crossDomain &&
			jQuery.support.cors &&
			options.url.indexOf(covid19BaseUrl) >= 0
		) {
			options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		}
	});
	//Google analytics register page view
	gtag('event', 'Covid19');
	gtag('event', 'page_view');

	//Get NZ current cases and details page
	GetData(covid19CurrentCasesUrl, parseCurrentCasesPageHtml);
	GetData(covid19CurrentCasesDetailsUrl, parseCurrentCasesDetailsPageHtml);

	//Dropown fileter for location wise age chart
	$('#locationWiseAgePieSection #locationFilter').change(function() {
		updateLocationWisePieChart();
		getLocationWiseTimelinechart();
	});
});

function GetData(url, callback) {
	$.ajax({
		method: 'GET',
		dataType: 'html',
		url: url,
		crossDomain: true,
		crossOrigin: true,
		success: callback
	});
}

function parseCurrentCasesPageHtml(html) {
	//get summary table
	var summaryHtml = $(html)
		.find('h2:contains("Summary")')
		.next();
	summaryHtml.css({ width: '100%' });
	$('#summary').append(summaryHtml);
}
function parseCurrentCasesDetailsPageHtml(html) {
	var confirmedCasesTable = $(html).find(
		'.table-style-two:contains("Confirmed")'
	);
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
	var locations = _.uniq(json.map(x => x.location));
	_.forEach(locations, function(loc) {
		$('#locationWiseAgePieSection #locationFilter').append(
			$('<option></option>')
				.attr('value', loc)
				.text(loc)
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
		location: getSelectionLocation()
	});
	const allAgeGrops = _.uniq(
		covid19DetailJson.map(x => $.trim(x.age))
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
	_.forEach(allAgeGroups, function(ageGroup) {
		if (!_.includes(Object.keys(data), ageGroup))
			data[$.trim(ageGroup)] = 0;
	});

	var sortedKeyData = [];
	//sort prop names
	var keys = Object.keys(data).sort();
	_.forEach(keys, key => (sortedKeyData[key] = data[key]));

	return sortedKeyData;
}

function currentCaseDetailsTableToJson(table) {
	var data = [];
	$(table)
		.find('tbody tr')
		.each(function(index, row) {
			var parseRow = {
				date: $.trim(
					$(row)
						.find('td:nth-child(1)')
						.text()
				),
				location: $.trim(
					$(row)
						.find('td:nth-child(4)')
						.text()
				),
				age: $(row)
					.find('td:nth-child(3)')
					.text(),
				gender: $(row)
					.find('td:nth-child(2)')
					.text()
			};
			parseRow = formatCaseDataRow(parseRow);
			data.push(parseRow);
		});

	return data;
}

function formatCaseDataRow(parseRow) {
	if ($.trim(parseRow.age) === '') {
		parseRow.age = 'Unknown';
	}
	if ($.trim(parseRow.gender) === '') {
		parseRow.gender = 'Unknown';
	}
	if (parseRow.location == 'Capital and Coast') {
		parseRow.location = 'Wellington';
	}
	parseRow.date = moment(parseRow.date, 'DD-MM-YYYY').toDate();

	return parseRow;
}

function getLocationWiseLinechart(chartData) {
	const countData = _.countBy(chartData, 'location');
	var ctx = document.getElementById('locationWiseLineChart').getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: Object.keys(countData),
			datasets: [
				{
					fill: false,
					label: 'Confirmed Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(countData)
				}
			]
		}
	});
}

function getLocationWiseTimelinechart() {
	const timelineData = _.countBy(
		covid19LocationData.map(x => moment(x.date).format('DD MMM')).sort()
	);
	const total = covid19LocationData.length;

	var ctx = document
		.getElementById('locationWiseTimelineChart')
		.getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		options: {
			title: {
				display: true,
				text: `Timeline for Total ${total} cases confirmed in ${getSelectionLocation()}`,
				fontSize: 20
			}
		},
		data: {
			labels: Object.keys(timelineData),
			datasets: [
				{
					fill: false,
					label: `Confirmed Cases`,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(timelineData)
				}
			]
		}
	});
	chart.update();
	if (window.timelineChart != undefined) window.timelineChart.destroy();
	window.timelineChart = chart;
}
function getLocationWiseBarchart(allAgeGrops, maleCounts, femaleCounts) {
	maleCounts = Object.values(maleCounts);
	femaleCounts = Object.values(femaleCounts);
	const total = covid19LocationData.length;
	var ctx = document.getElementById('locationWiseBarChart').getContext('2d');
	var chart = new Chart(ctx, {
		type: 'bar',
		options: {
			title: {
				display: true,
				text: `Total ${total} cases by Age group (years)`,
				fontSize: 20
			}
		},
		data: {
			datasets: [
				{
					label: 'Female',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: femaleCounts
				},
				{
					label: 'Male',
					backgroundColor: 'rgb(255, 128, 0)',
					borderColor: 'rgb(255, 128, 0)',
					data: maleCounts
				}
			],

			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: allAgeGrops
		}
	});
	chart.update();
	if (window.bar != undefined) window.bar.destroy();
	window.bar = chart;
}

function showChart() {
	$('#loading').hide();
	$('#covidData').show();
}
