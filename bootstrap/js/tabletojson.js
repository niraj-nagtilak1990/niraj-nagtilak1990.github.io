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
