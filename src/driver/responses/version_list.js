module.exports = {
	id: 0x8010,
	name: "version_list",
	parse: function(reader, rep) {
		rep.major = reader.nextUInt16BE();
		rep.installer = reader.nextUInt16BE();
	},
};
