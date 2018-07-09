let ELIGIBLE_MODEL_ID = ['lumi.sensor_magnet','lumi.sensor_magnet.aq2'];

module.exports = {

	id: 'xiaomi_door_sensor',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((data) => (data && data.length > 5) ? ((data[5]*256 + data[4])/1000) : undefined), unit: 'V', min:0.00, max: 3.00 } },

		open:        { type:'bool',   attribute: {id: '0x0001 0x0006 0x0000' }  },
	},

};
