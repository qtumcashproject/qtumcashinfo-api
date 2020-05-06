const chains = new Map()

class Chain {
  constructor({
    name, type,
    port, networkMagic,
    pubkeyhash, privatekey, scripthash, witnesshrp, evm,
    genesis, lastPoWBlockHeight
  } = {}) {
    this.name = name
    this.type = type
    this.port = port
    this.networkMagic = networkMagic
    this.pubkeyhash = pubkeyhash
    this.privatekey = privatekey
    this.scripthash = scripthash
    this.witnesshrp = witnesshrp
    this.evm = evm
    this.genesis = genesis
    this.lastPoWBlockHeight = lastPoWBlockHeight
  }

  static add(options) {
    let chain = new Chain(options)
    chains.set(chain.name, chain)
  }

  static get(name) {
    return chains.get(name)
  }
}

Chain.add({
  name: 'mainnet',
  type: 'mainnet',
  port: 3666,
  networkMagic: Buffer.from([0xfd, 0x37, 0xa6, 0x23]),
  pubkeyhash: 0x19,
  privatekey: 0x80,
  scripthash: 0x32,
  witnesshrp: 'bc',
  evm: 0x21,
  genesis: Buffer.from('0100000000000000000000000000000000000000000000000000000000000000000000009adb4466f3cdfe572e7b65254a8f6ed1c59b4d3784118bf8c74915edd38f696b4010a35effff072000000000e965ffd002cd6ad0e2dc402b8044de833e06b23127ea8c3d80aec9141077149556e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4210000000000000000000000000000000000000000000000000000000000000000ffffffff000101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff220004bf91221d0104193230323020426974636f696e20636861696e20706f73332e30ffffffff0100f2052a010000004341040d61d8653448c98731ee5fffd303c15e71ec2057b77f11ab3601979728cdaff2d68afbba14e4fa0bc44f2072b0b23ef63717f8cdfbe58dcd33f32b6afe98741aac00000000', 'hex'),
  lastPoWBlockHeight: 5000
})

module.exports = Chain
