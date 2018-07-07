module.exports = {

	match: function(device) {
		if (device.attributes.find( a => a.id == 5 && a.cluster.id == 0 && a.value == 'lumi.sensor_switch.aq2' )) {
			device.log.info("matched "+device+" as lumi.sensor_switch.aq2");
			return 1000;
		}
	},

	setup: function(device) {

	},

};
