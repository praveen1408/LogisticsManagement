/*var A = [
	[1,2,1,0,0,0,16],
	[1,1,0,1,0,0,9 ],
	[3,2,0,0,1,0,24],
	[-40,-30,0,0,0,1,0]];

var coeff = [
[1,2],
[1,1],
[3,2]];

var b = [16,9,24];

var obj = [-40,-30];

console.log("\n"+simplex(coeff,b,obj));
*/

/**
* Driver for simplex method
* @param {Array} coeff
* @param {Array} b
* @param {Array} obj
* @return {Array} result
*/
function simplex(coeff,b,obj){
	var A = createAugmentedMatrix(coeff,b,obj);	
	var p = linProg(A);	
	return interpretResults(A,p);	
}

function print(A){
	for(var i = 0; i < A.length; i++)
		console.log(A[i]);
	console.log("\n");
}

/**
* Creates augmented matrix
* @param {Array} coeff
* @param {Array} b
* @param {Array} obj
* @return {Array} A
*/
function createAugmentedMatrix(coeff,b,obj){	
	var c = coeff[0].length;
	var r = coeff.length; 	
	
	// Reserve space for matrix A
	var A = new Array(r);
	for (var i = 0; i < r+1; i++) {
		A[i] = new Array(r+c+1);
	}		
	// Insert coefficient matrix
	for(var i = 0; i < r; i++)
		for(var j = 0; j < c; j++)
			A[i][j] = coeff[i][j];
	
	// Insert slack variables
	for(var i = 0; i < r; i++)
		for(var j = c; j < r + c; j++)
			A[i][j] = i == (j - c)? 1 : 0;
	
	// Insert RHS
	for(var i = 0; i < r; i++)
		A[i][r+c] = b[i];	

	// Insert objective function
	for(var j = 0; j < c; j++)
		A[r][j] = obj[j];
	for(var j = c; j < r+c + 1; j++)
		A[r][j] = 0;

	return A;
}

/**
* Takes the final augmented matrix and generates output vector
* @param A
* @param l
* @return result 
*/
function interpretResults(A,p){
	var rhs = A[0].length - 1;	
	var result = Array(p.length).fill(0);	

	// Get the chosen basic rows in correct order
	for(var j = 0; j < p.length; j++){	
		try{result[j] = A[p[j]][rhs];}
		catch(e){}		
	}
	
	result.push(A[A.length-1][A[0].length-1]);
	return result;	
}

/**
* Runs linear programming on augmented matrix using simplex
* @param {Array} A
* @return {Array} p
*/
function linProg(A){
	var lastRow = A.length - 1;
	var lastCol = A[0].length - 1;	
	var p = [];
	
	while(true){
		// Skip variables which cannot be increased
		var j = -1;
		var smallest = 0;
		for(var y = 0; y <= lastCol;y++){
			if(A[lastRow][y] >=0) continue;
			if(A[lastRow][y] < smallest){
				smallest = A[lastRow][y];
				j = y;
			}
		
		}
		if(j == -1) break;
		
		// Find index of the smallest ratio		
		var i = 0;
		var smallestRatio = A[i][lastCol]/A[i][j];			
		for(var x = 1; x < lastRow; x++){
			if(A[x][j] <= 0) continue;
			var ratio = A[x][lastCol]/A[x][j];
			if(smallestRatio > ratio){
				smallestRatio = ratio;
				i = x;
			}
		}		
		pivot(A,i,j);
		//print(A);
		p[j] = i;
	}
	//console.log(p);
	return p;
}

/**
* Pivots the entry at i,j using gaussian elimination
* @param {Array} A
* @param {Number} i
* @param {Number} j
*/
function pivot(A,i,j){
	var p = A[i][j];
	
	// Divide all entries of the pivotal row by pivot
	for(var y = 0; y < A[0].length; y++)
		A[i][y]/=p;	
	
	// Subtract all other rows with pivotal row
	for(var x = 0; x < A.length; x++){
		if(x == i) continue; // Skip pivotal row
		var fac = -A[x][j];
		for(var y = 0; y < A[0].length;y++){
			A[x][y] += fac * A[i][y];
		}
	}		
}
