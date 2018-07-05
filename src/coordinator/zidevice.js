const EventEmitter = require('events').EventEmitter;
const ZiEndpoint = require('./ziendpoint.js');

class ZiDevice extends EventEmitter {
    constructor(address, coordinator) {
      super();
      this.address = address;
      this.hex = (("0000"+Number(this.address).toString(16)).substr(-4,4));
      this.coordinator = coordinator;
      this.endpoints = {};
			this.ieee = null;
    }
    get log() { return ZiDevice.LOGS; }
		get attributes() {
			var attrs = [];
			Object.keys(this.endpoints).forEach( (eid)=> {
				var endpoint = this.endpoints[eid];
				Object.keys(this.endpoints[eid].clusters).forEach( (cid)=> {
					var cluster = endpoint.clusters[cid];
					Object.keys(cluster.attributes).forEach( (aid)=> {
						var attr = cluster.attributes[aid];
						attrs.push(attr);
					});
				});
			});
			return attrs;
		}
    toString() {
      return "[device_0x"+this.address.toString(16)+"]";
    }
    getEndpoint(id) {
      return this.endpoints[id];
    }
    addEndpoint(id) {
      if (!this.endpoints[id]) {
        this.endpoints[id] = new ZiEndpoint(id, this);
        ZiDevice.LOGS.log(""+this+""+this.endpoints[id]+": created");
				this.emit('endpoint_add', this.endpoints[id]);
				this.coordinator.emit('endpoint_add', this.endpoints[id]);
      }
      return this.endpoints[id];
    }
    refreshAttribute(endpointid, clusterid, attributeid) {
      return this.coordinator.driver.send({type: 'attribute_read', address: this.address, endpoint:endpointid, cluster:clusterid, attributes:[attributeid]});
    }
    writeAttribute(endpointid, clusterid, attributeid, value) {
      return this.coordinator.driver.send({type: 'attribute_write', address: this.address, endpoint:endpointid, cluster:clusterid, attribute:attributeid, value:value});
    }

}

ZiDevice.LOGS = { trace: () => {}, debug: () => {}, log: () => {}, warn: () => {}, error: () => {} };

module.exports = ZiDevice;
