const covid19PageUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases';

$(document).ready(function() {
	jQuery.ajaxPrefilter(function(options) {
		if (options.crossDomain && jQuery.support.cors) {
			options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		}
	});
	gtag('event', 'Covid19');
	gtag('event', 'page_view');
	GetCovid19Data();
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
	$('#summary').append(summaryHtml);

	var confirmedCasesTable = $(html)
		.find('h2:contains("Confirmed cases")')
		.next();

	confirmedCasesTable.find('caption').remove();
	var json = tableToJson(confirmedCasesTable);
	//render all charts
	renderAllCharts(json);
}

function renderAllCharts(json) {
	GetLocationWiseLinechart(json);
	//chart loaded, hide loader and show chart
	showChart();
}

function tableToJson(table) {
	var data = [];
	$(table)
		.find('tbody tr')
		.each(function(index, row) {
			data.push({
				location: $(row)
					.find('td:nth-child(2)')
					.text(),
				age: $(row)
					.find('td:nth-child(3)')
					.text(),
				gender: $(row)
					.find('td:nth-child(4)')
					.text()
			});
		});

	return data;
}

function GetLocationWiseLinechart(chartData) {
	var ctx = document.getElementById('locationWiseLineChart').getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: Object.keys(_.countBy(chartData, 'location')),
			datasets: [
				{
					label: 'Confirmed Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(_.countBy(chartData, 'location'))
				}
			]
		},

		// Configuration options go here
		options: {}
	});
}
function GetLocationWiseAgePiechart(chartData) {
	var ctx = document
		.getElementById('locationWiseAgePieChart')
		.getContext('2d');
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: Object.keys(_.countBy(chartData, 'location')),
			datasets: [
				{
					label: 'Confirmed Cases age group by location ',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(_.countBy(chartData, 'location'))
				}
			]
		},

		// Configuration options go here
		options: {}
	});
}

function showChart() {
	$('#loading').hide();
	$('#covidData').show();
}
