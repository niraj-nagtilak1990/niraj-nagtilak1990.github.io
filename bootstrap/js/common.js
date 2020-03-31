const covid19BaseUrl =
		'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation',
	covid19CurrentCasesUrl = `${covid19BaseUrl}/covid-19-current-cases`,
	covid19CurrentCasesDetailsUrl = `${covid19CurrentCasesUrl}/covid-19-current-cases-details`;
var covid19DetailJson, covid19LocationData;
function GetData(t, e) {
	$.ajax({
		method: 'GET',
		dataType: 'html',
		url: t,
		crossDomain: !0,
		crossOrigin: !0,
		success: e
	});
}
function parseCurrentCasesPageHtml(t) {
	var e = $(t)
		.find('h2:contains("Summary")')
		.next();
	e.css({ width: '100%' }), $('#summary').append(e);
}
function parseCurrentCasesDetailsPageHtml(t) {
	var e = $(t).find('.table-style-two:contains("Confirmed")');
	e.find('caption').remove();
	var a = currentCaseDetailsTableToJson(e);
	(a = _.sortBy(a, 'location')), (covid19DetailJson = a), renderAllNZCharts();
}
function renderAllNZCharts() {
	getLocationWiseLinechart(covid19DetailJson),
		renderLocationWiseBarSection(covid19DetailJson),
		showChart();
}
function renderLocationWiseBarSection(t) {
	var e = _.uniq(t.map(t => t.location));
	_.forEach(e, function(t) {
		$('#locationWiseAgePieSection #locationFilter').append(
			$('<option></option>')
				.attr('value', t)
				.text(t)
		);
	}),
		updateLocationWisePieChart();
}
function getSelectionLocation() {
	return $(
		'#locationWiseAgePieSection #locationFilter option:selected'
	).val();
}
function updateLocationWisePieChart() {
	var t = _.sortBy(covid19DetailJson, ['location', 'age']);
	covid19LocationData = _.filter(t, { location: getSelectionLocation() });
	const e = _.uniq(covid19DetailJson.map(t => $.trim(t.age))).sort();
	var a = _.filter(covid19LocationData, { gender: 'Male' }),
		o = _.filter(covid19LocationData, { gender: 'Female' });
	getLocationWiseBarchart(
		e,
		addMissingAgegroups(_.countBy(a, 'age'), e),
		addMissingAgegroups(_.countBy(o, 'age'), e)
	);
}
function addMissingAgegroups(t, e) {
	_.forEach(e, function(e) {
		_.includes(Object.keys(t), e) || (t[$.trim(e)] = 0);
	});
	var a = [],
		o = Object.keys(t).sort();
	return _.forEach(o, e => (a[e] = t[e])), a;
}
function currentCaseDetailsTableToJson(t) {
	var e = [];
	return (
		$(t)
			.find('tbody tr')
			.each(function(t, a) {
				var o = {
					date: $.trim(
						$(a)
							.find('td:nth-child(1)')
							.text()
					),
					location: $.trim(
						$(a)
							.find('td:nth-child(4)')
							.text()
					),
					age: $(a)
						.find('td:nth-child(3)')
						.text(),
					gender: $(a)
						.find('td:nth-child(2)')
						.text()
				};
				(o = formatCaseDataRow(o)), e.push(o);
			}),
		e
	);
}
function formatCaseDataRow(t) {
	return (
		'' === $.trim(t.age) && (t.age = 'Unknown'),
		'' === $.trim(t.gender) && (t.gender = 'Unknown'),
		'Capital and Coast' == t.location && (t.location = 'Wellington'),
		(t.date = moment(t.date, 'DD-MM-YYYY').toDate()),
		t
	);
}
function getLocationWiseLinechart(t) {
	const e = _.countBy(t, 'location');
	var a = document.getElementById('locationWiseLineChart').getContext('2d');
	new Chart(a, {
		type: 'line',
		data: {
			labels: Object.keys(e),
			datasets: [
				{
					fill: !1,
					label: 'Confirmed Cases by location',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: Object.values(e)
				}
			]
		}
	});
}
function getLocationWiseBarchart(t, e, a) {
	(e = Object.values(e)), (a = Object.values(a));
	const o = covid19LocationData.length;
	var n = document.getElementById('locationWiseBarChart').getContext('2d'),
		i = new Chart(n, {
			type: 'bar',
			options: {
				title: {
					display: !0,
					text: `Total ${o} confirmed cases by Age group (years)`,
					fontSize: 20
				}
			},
			data: {
				datasets: [
					{
						label: 'Female',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: a
					},
					{
						label: 'Male',
						backgroundColor: 'rgb(255, 128, 0)',
						borderColor: 'rgb(255, 128, 0)',
						data: e
					}
				],
				labels: t
			}
		});
	i.update(), null != window.bar && window.bar.destroy(), (window.bar = i);
}
function showChart() {
	$('#loading').hide(), $('#covidData').show();
}
$(document).ready(function() {
	jQuery.ajaxPrefilter(function(t) {
		t.crossDomain &&
			jQuery.support.cors &&
			t.url.indexOf(covid19BaseUrl) >= 0 &&
			(t.url = 'https://cors-anywhere.herokuapp.com/' + t.url);
	}),
		gtag('event', 'Covid19'),
		gtag('event', 'page_view'),
		GetData(covid19CurrentCasesUrl, parseCurrentCasesPageHtml),
		GetData(
			covid19CurrentCasesDetailsUrl,
			parseCurrentCasesDetailsPageHtml
		),
		$('#locationWiseAgePieSection #locationFilter').change(function() {
			updateLocationWisePieChart();
		});
});
