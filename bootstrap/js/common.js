const covid19PageUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases';

var covid19Data;

$(document).ready(function() {
	jQuery.ajaxPrefilter(function(options) {
		if (options.crossDomain && jQuery.support.cors) {
			options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		}
	});
	gtag('event', 'Covid19');
	gtag('event', 'page_view');
	GetCovid19Data();
	$('#locationWiseAgePieSection #locationFilter').change(function() {
		updateLocationWisePieChart();
	});
});

function GetCovid19Data() {
	$.ajax({
		method: 'GET',
		dataType: 'html',
		url: covid19PageUrl,
		crossDomain: true,
		crossOrigin: true,
		success: function(data) {
			parseHtml(data);
		}
	});
}

function parseHtml(html) {
	var summaryHtml = $(html)
		.find('h2:contains("Summary")')
		.next();
	summaryHtml.css({ width: '100%' });
	$('#summary').append(summaryHtml);

	var confirmedCasesTable = $(html).find('table.table-style-two');
	confirmedCasesTable.find('caption').remove();
	var json = tableToJson(confirmedCasesTable);
	json = _.sortBy(json, 'location');
	//render all charts
	covid19Data = json;
	renderAllCharts(covid19Data);
}

function renderAllCharts(json) {
	GetLocationWiseLinechart(json);
	//renderLocationWisePieSection(json);
	//chart loaded, hide loader and show chart
	showChart();
}
function renderLocationWisePieSection(json) {
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

	var sortedCovid19Data = _.sortBy(covid19Data, ['location', 'age']);
	var ageData = _.filter(sortedCovid19Data, { location: selectedLocation });
	var ageCounts = _.countBy(ageData, 'age');
	GetLocationWisePiechart(ageCounts);
}

function tableToJson(table) {
	var data = [];
	$(table)
		.find('tbody tr')
		.each(function(index, row) {
			var rowData = {
				location: $.trim(
					$(row)
						.find('td:nth-child(1)')
						.text()
				),
				cCases: $(row)
					.find('td:nth-child(2)')
					.text(),
				pCases: $(row)
					.find('td:nth-child(3)')
					.text()
			};
			if (
				rowData.location &&
				rowData.location != '' &&
				rowData.location.toLowerCase() != 'total'
			) {
				rowData.location = rowData.location.replace(
					'Capital and Coast',
					'Wellingon'
				);
				data.push(rowData);
			}
		});

	return data;
}

function GetLocationWiseLinechart(chartData) {
	var ctx = document.getElementById('locationWiseLineChart').getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: chartData.map(x => x.location),
			datasets: [
				{
					label: 'Confirmed Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: chartData.map(x => x.cCases)
				}
			]
		},

		// Configuration options go here
		options: {}
	});
}

function GetLocationWisePiechart(ageCount) {
	var ctx = document
		.getElementById('locationWiseAgePieChart')
		.getContext('2d');
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
