const EventEmitter = require('events').EventEmitter;
const CLUSTER = Symbol("CLUSTER");

class ZiAttribute extends EventEmitter {
  constructor(id, cluster) {
    this.id = id;
    this.hex = (("0000"+Number(this.id).toString(16)).substr(-4,4));
    this.cluster = cluster || null;
    this.type = (this.cluster && this.cluster.type && this.cluster.type.attributes && this.cluster.type.attributes[id]) || null;
		this.value = (this.type && typeof(this.type.default) !== "undefined" && this.type.default) || null;
  }
  toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "unknown")+"]"; }

	get cluster() { return this.cluster; }

  refresh() {
    return this.cluster.refreshAttribute(this.id);
  }
  write(value) {
    return this.cluster.writeAttribute(this.id, value);
  }
  setValue(newVal) {
    let oldVal = this.value;
    this.value = newVal;
    ZiAttribute.LOGS.debug(""+this.cluster.endpoint.device+""+this.cluster.endpoint+""+this.cluster+""+this+": value changed("+this.value+")");
		this.emit('attribute_change', attribute, newVal, oldVal);
		this.cluster.emit('attribute_change', attribute, newVal, oldVal);
		this.cluster.endpoint.emit('attribute_change', attribute, newVal, oldVal);
		this.cluster.endpoint.device.emit('attribute_change', attribute, newVal, oldVal);
		this.cluster.endpoint.device.coordinator.emit('attribute_change', attribute, newVal, oldVal);
  }
}

ZiAttribute.LOGS = {
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = ZiAttribute;
