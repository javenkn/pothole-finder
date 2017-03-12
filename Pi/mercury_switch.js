// var wpi = require('wiring-pi');

var MPin = 0;

var go = true;

function main(ws) {
	//go = true;
	console.log(ws);
	if (wpi.wiringPiSetup() === -1) {
		console.log("setup wiringPi failed!");
		return;
	}
	wpi.pinMode(MPin, wpi.INPUT);

	while(go) {
//	setTimeout(function(){
		if (wpi.digitalRead(MPin) === 0) {
			if (wpi.digitalRead(MPin)) {
				console.log("Mercury Tilt!\n");
				ws.send();
				go = false;
				//main();
			}
		} else if (wpi.digitalRead(MPin) === 1) {
			if (wpi.digitalRead(MPin) === 1) {
				while(!wpi.digitalRead(MPin));
			}
		}
	};
	go = true;
	return;
}

module.exports = main;
