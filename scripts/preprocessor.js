$(document).ready(function(){
	
	$("#bGo").click(function(){	
		// Load data from text fields
		
		var supply = $("#tSupply").val().split(",");
		var demand = $("#tDemand").val().split(",");
		var expenditure = $("#tExpenditure").val().split(",");	
		var revenue = 0;		
		
		$("#errorMsg").text("");

		try{
			revenue = parseInt($("#tRevenue").val());	

			for(var i = 0; i < supply.length; i++)
				supply[i] = parseInt(supply[i].trim());				
			
			for(var i = 0; i < demand.length; i++)
				demand[i] = parseInt(demand[i].trim());			
				
			for(var i = 0; i < expenditure.length; i++)
				expenditure[i] = parseInt(expenditure[i].trim());	
			
		} catch(e){
			$("#errorMsg").text(e);
			return;
		}
		console.log("Supply: "+supply);
		console.log("Demand: "+demand);
		console.log("Expenditure: "+expenditure);
		
		//supply = [100,100];
		//demand = [20,50,70];
		//expenditure = [4,2,3,1,3,2];
		//revenue = 10;		
		for(var i = 0; i < expenditure.length; i++)
			expenditure[i] -= revenue;	

		// Merge in a single vector	
		var b = [];		
		$.merge(b,demand);
		$.merge(b,supply);
		
		// Reserve space for a m x n matrix
		var n = demand.length + supply.length;
		var m = demand.length * supply.length;
		var a = new Array(n);
		for(var i = 0; i < n; i++)
			a[i] = new Array(m);
		
		for(var i = 0; i < n; i++)
			for(var j = 0; j < m; j++)
				a[i][j] = 0;	
			
		// Initialize A
		i = 0
		a[0][0] = 1
		for (var j = 1; j < m; j++){   
			if (j % supply.length == 0)
				i++;
			a[i][j] = 1;
		}
		for (var i = demand.length; i < n ; i++){
			offset = i-demand.length;
			for (var j = offset; j < m; j+=supply.length)				
				a[i][j] = 1;     
		}		
				
		var result = simplex(a,b,expenditure);
		write(result,demand.length,supply.length);
	});
});
