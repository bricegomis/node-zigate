module.exports = {
	id: 0x0014,
	name: "permit_join",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
