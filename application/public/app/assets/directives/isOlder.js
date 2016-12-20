/**
 * filter shows if the date of input is older than actual time
 * used for meetings - why show old meetings?
 */
app.filter('isOlder', function() {
    return function(input) {
        var tmp = [];
        
    	if (input!=undefined) {
            for (var i=0;i<input.length;i++) {
                var d = new Date();
                var d2 = new Date(input[i].date);
                d = new Date(d.getFullYear(), d.getMonth(),d.getDate());
                d2 = new Date(d2.getFullYear(), d2.getMonth(),d2.getDate());
                console.log(d,d2);
                
                if (d.getTime()<=d2.getTime()){ 
                    tmp.push(input[i]);

                }
            }
            return tmp;
    	} else {
    		return [];
    	}
    }
});