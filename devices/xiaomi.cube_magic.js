let ELIGIBLE_MODEL_ID = ['lumi.sensor_cube'];

module.exports = {

	id: 'xiaomi_cube_magic',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		rot_v:       { type:'int',    attribute: {id: '0x0003 0x000c 0xff05' } },

		// to be confirmed
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((s, value) => {
																		let data = [];
																		s.split('').forEach(c => {
																			if (c.charCodeAt(0) > 255) data.push(Math.floor(c.charCodeAt(0)/256), c.charCodeAt(0)%256);
																			else data.push(c.charCodeAt(0));
																		});
																		return (data[5]*256 + data[4])/1000;
																	})
									, unit: 'V', min:0.00, max: 3.00 }
		},
		// to be confirmed

	},

	events: {
		shake:       { attribute: {id: '0x0002 0x0012 0x0055', equal: 0x0000      }, },
		slide:       { attribute: {id: '0x0001 0x0012 0x0055', equal: 0x0103      }, },
		tap:         { attribute: {id: '0x0001 0x0012 0x0055', equal: 0x0204      }, },
		rotate_h:    { attribute: {id: '0x0003 0x000c 0xff05', /*               */}, },   // data = 0x01F4 , then 0xC2C2C2C2 ???
		//rotate_v:    { attribute: {id: '0x0002 0x0012 0x0055', /* equal: 0      */}, },
	},
};
