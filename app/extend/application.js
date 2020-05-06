const path = require('path')

const CHAIN = Symbol('qtumcash.chain')

module.exports = {
  get chain() {
    this[CHAIN] = this[CHAIN] || this.qtumcashinfo.lib.Chain.get(this.config.bcs.chain)
    return this[CHAIN]
  },
  get bcsinfo() {
    return {
      lib: require(path.resolve(this.config.qtumcashinfo.path, 'lib')),
      rpc: require(path.resolve(this.config.qtumcashinfo.path, 'rpc'))
    }
  }
}
