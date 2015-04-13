(function(){

	/*

	url,name,line
	http://www.mta.info/nyct/service/,Smith St & Bergen St At Ne Corner (To Manhattan And Queens Only),F-G
	http://www.mta.info/nyct/service/,Court St & Montague St At Sw Corner,2-3-4-5-N-R
	http://www.mta.info/nyct/service/,Court St & Montague St At Sw Corner,2-3-4-5-N-R

	*/

	// An alternative to usind d3 would be to convert our csv to json and use jQuery's $.getJSON function.
	d3.csv('data/DOITT_SUBWAY_ENTRANCE_01_13SEPT2010.csv', function(error, subwayStations){
		if (error){
			console.log(error);
		}
		// The loop that cleans our data
		subwayStations.forEach(function(subwayStation){
			var delimiter = '(';
			var subway_station_name_parts = subwayStation.name.split(delimiter);
			var subway_direction = subway_station_name_parts[1];

			if (subway_direction){
				subway_direction = subway_direction.replace(/\)/g, '');
				subwayStation.direction = subway_direction;
			}

			// replace the name with the name minus the direction
			subwayStation.name = subway_station_name_parts[0].trim();

			// Make a new column that is our line column but as an array of lines
			subwayStation.lineList = subwayStation.line.split('-');

		});

		// $('#canvas').append('<div>'+subwayStations[1].name + ', ' + subwayStations[1].direction + ' ' + subwayStations[1].lineList.join(' — ') + '</div>');

		var filtered_entrances = subwayStations.filter(function(subwayStation){
			// return true && true && true
			return (_.contains(subwayStation.lineList, '2')  &&  _.contains(subwayStation.lineList, '3')) ||  (_.contains(subwayStation.lineList, 'A')  &&  _.contains(subwayStation.lineList, 'C')); 
			// return subwayStation.lineList.indexOf('2') != -1;
		});


		console.log(filtered_entrances);
		console.log(subwayStations.length);
		
	});

}).call(this);