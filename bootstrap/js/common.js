const covid19BaseUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation';
const covid19CurrentCasesUrl = `${covid19BaseUrl}/covid-19-current-cases`;
const covid19CurrentCasesDetailsUrl = `${covid19CurrentCasesUrl}/covid-19-current-cases-details`;

var covid19DetailJson;

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
	var confirmedCasesTable = $(html)
		.find('table.table-style-two')
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
	var locations = _.uniq(json.map(x => x.location));
	_.forEach(locations, function(loc) {
		$('#locationWiseAgePieSection #locationFilter').append(
			$('<option></option>')
				.attr('value', loc)
				.text(loc)
		);
	});

	updateLocationWisePieChart();
}

function updateLocationWisePieChart() {
	var selectedLocation = $(
		'#locationWiseAgePieSection #locationFilter option:selected'
	).val();

	var sortedCovid19Data = _.sortBy(covid19DetailJson, ['location', 'age']);
	var ageData = _.filter(sortedCovid19Data, { location: selectedLocation });
	var ageCounts = _.countBy(ageData, 'age');
	getLocationWisePiechart(ageCounts);
}

function currentCaseDetailsTableToJson(table) {
	var data = [];
	$(table)
		.find('tbody tr')
		.each(function(index, row) {
			var parseRow = {
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
			if ($.trim(parseRow.age) === '') {
				parseRow.age = 'TBD';
			}
			if (parseRow.location == 'Capital and Coast')
				parseRow.location = 'Wellington';
			data.push(parseRow);
		});

	return data;
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
					label: 'Confirmed Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(countData)
				}
			]
		},

		// Configuration options go here
		options: {}
	});
}

function getLocationWisePiechart(ageCount) {
	var ctx = document.getElementById('locationWiseBarChart').getContext('2d');
	var chart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [
				{
					label: 'Confirmed Cases',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(ageCount)
				}
			],

			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: Object.keys(ageCount)
		},
		// Configuration options go here
		options: {}
	});
	chart.update();
	if (window.bar != undefined) window.bar.destroy();
	window.bar = chart;
}

function showChart() {
	$('#loading').hide();
	$('#covidData').show();
}
