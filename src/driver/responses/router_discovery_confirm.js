module.exports = {
	id: 0x8701,
	name: "router_discovery_confirm",
	parse: function(reader, rep) {
		rep.status = reader.nextUInt8();
		rep.networkStatus = reader.nextUInt8();
	},
};
