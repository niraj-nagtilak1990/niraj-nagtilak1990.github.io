const covid19PageUrl =
	'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases';

$(document).ready(function() {
	jQuery.ajaxPrefilter(function(options) {
		if (options.crossDomain && jQuery.support.cors) {
			options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		}
	});
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

	GetPiechart(json);
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
	//location wise count

	return data;
}

function GetPiechart(chartData) {
	var ctx = document.getElementById('pieChart').getContext('2d');
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: Object.keys(_.countBy(chartData, 'location')),
			datasets: [
				{
					label: 'Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(_.countBy(chartData, 'location'))
				}
			]
		},

		// Configuration options go here
		options: {}
	});
	//chart loaded, hide loader and show chart
	showChart();
}

function showChart() {
	$('#loading').hide();
	$('#covidData').show();
}
