$(document).ready(function(){
	$("#container").height($("#fields").height()-20);
	$("#container").width($("#container").width()-15);
});

function write(v,d,s){
	var text = "<br/>Tasks<br/>";
	console.log(v+" "+s+" "+d);
	
	for (var i = 0; i < s; i++){
		for (var j = 0; j < d; j++){
			console.log(j+" "+i+" "+v[i*d+j]);
			if (v[i*d+j] != 0)
				text += "Dispatch "+v[i*d+j]+" trucks from "+i+" to "+j+"<br/>";
				//console.log("Dispatch "+v[i*d+j]+" trucks from "+j+" to "+i+"<br/>");
		}
	}
	text += "Total revenue: "+v[v.length-1];
	//alert(text);
	$("#container").html(text);
}