module.exports = {
	id: 0x0044,
	name: "descriptor_power",
	build: function(options, cmd) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		
		cmd.payload = Buffer.alloc(2);
		cmd.payload.writeUInt16BE(parseInt(cmd.address), 0);
		return cmd;
	},
};
