/**
 * template for date
 */

app.directive('dateShow', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Am {{ date | date : "dd.MM.yyyy \'um\'  H:mm"}} Uhr'
	};
});

app.directive('dateShowMessages', function() {
	return {
		scope: {
			date: '@'
		},
		template: '{{ date | date : "dd.MM.yyyy"}} <br>{{ date | date : "H:mm"}} Uhr'
	};
});

app.directive('dateShowSimple', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Am {{ date | date : "dd.MM.yyyy"}}'
	};
});

app.directive('dateShowTime', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Um {{ date | date: "H:mm"}} Uhr'
	};
});

app.directive('dateShowPackage', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'bis {{ date | date : "dd.MM.yyyy"}}'
	};
});

app.directive('dateShowTimeSingle', function() {
	return {
		scope: {
			date: '@'
		},
		template: '{{ date | date: "H:mm"}}'
	};
});