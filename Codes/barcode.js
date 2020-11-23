"use strict";

function decodeBarcodeFromAreas(areas){
//area = string of 95 ones and zeroes
//var areas = "10101101110001101010011101001110000101011000101010100010011001101100110110011010000101001110101"
	
	
	var areasTestSum = 0
	var areasTest = areas.substr(3,7)
	
	for (var b= 0;b < 7; b++){
		areasTestSum += parseInt(areasTest[b])
		
	}
	if (areasTestSum%2 ===0){
		var splitString = areas.split("")
		var reverseString = splitString.reverse()
		areas = reverseString.join("")
	}

    var result = {
        barcode: "", 
        message: "No middle guard", 
        checksumValid: false
    };
	
	//var testParity = LLGLGG
	//var testString = 0001101
	
	var leftOddArray = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"]
	
	var leftEvenArray = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]
	
	var rightOddArray = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"]
	
	var leftGuard = "101"
	var rightGuard = "101"
	var middleGuard = "01010"
	
	var lhsParity = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]
	
	var positionMultiplier = [1,3,1,3,1,3,1,3,1,3,1,3]
	
	
	
	
	
	var digit = ""
	var digit2 = ""
	var parity = ""
	
	var checkSum = 0
	var testDigitString = areas.substring(3,45)
	var testDigitString2 = areas.substring(50,92)
	var x,y,i,a
	
	
	
	for (x = 0; x < 42; x += 7) {
		
		if (leftOddArray.indexOf(testDigitString.substring(x,x+7)) != -1){
			digit += leftOddArray.indexOf(testDigitString.substring(x,x+7))
			parity += "L"
		}
		
		else if (leftEvenArray.indexOf(testDigitString.substring(x,x+7)) != -1) {
			digit += leftEvenArray.indexOf(testDigitString.substring(x,x+7))
			parity += "G"
		}
		
		else if (rightOddArray.indexOf(testDigitString.substring(x,x+7)) != -1) {
			digit += rightOddArray.indexOf(testDigitString.substring(x,x+7))
			parity += "R"
		}
			
		
		
	}
	
	for (y = 0; y < 42; y += 7) {
		
		if (leftOddArray.indexOf(testDigitString2.substring(y,y+7)) != -1){
			digit2 += leftOddArray.indexOf(testDigitString2.substring(y,y+7))
			
		}
		
		else if (leftEvenArray.indexOf(testDigitString2.substring(y,y+7)) != -1) {
			digit2 += leftEvenArray.indexOf(testDigitString2.substring(y,y+7))
			
		}
		
		else if (rightOddArray.indexOf(testDigitString2.substring(y,y+7)) != -1) {
			digit2 += rightOddArray.indexOf(testDigitString2.substring(y,y+7))
			
		}
	
	}
	
	var digit3 = digit + digit2
	//converting string to integer
	
	
	
	
	
	
	
	var parityNumber = lhsParity.indexOf(parity)
	//to get the parity of the number
	
	var digit4 = parityNumber + digit3
	//to print the parity number with 12 digits behind
	
	for (i = 0; i < 12; i ++){
		checkSum += parseInt(digit4.substring(i,i+1)) * positionMultiplier[i]
	}
	//to get the multiplied sum of all the numbers according to positionMultiplier
	
	if (((Math.ceil(checkSum/10))*10 - checkSum) == digit4[digit4.length - 1]){
		result.checksumValid = true
	}
	
	if (areas.length < 95)
	{
		var message = "Error!";
	}

	if (areas.substr(0,3) !== "101" )
	{
		message = "Left guard missing!";
	}

	if ( areas.substr(92,3) !== "101")
	{
		message = "Right guard missing !" ;
	}

	if ( areas.substr(45,5) !== "01010")
	{
		message = "Middle guard missing !";
	}

	else
	{
		message = "Barcode Processd! YAY"
	}
		result.barcode = digit4
		result.message = message
		
	
	
	/*
	console.log(parity)

	console.log(digit)
	console.log(digit2)
	console.log(checkSum)
	console.log(digit3)
	console.log(checkSum)
	console.log(parityNumber)
	console.log(digit4)
	console.log(result.barcode)
	console.log(result.message)
	console.log(result.checksumValid)
	*/
return result;
}

   
