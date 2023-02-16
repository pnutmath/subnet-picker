export class CIDR {
  constructor(address, mask) {
    this.address = address;
    this.mask = mask;
    this.networkAddress = this.#calculateNetworkAddress();
    this.capacity = this.#calculateCapacity();
  }

  toString() {
    return `${this.networkAddress}/${this.mask}`;
  }

  split() {
    const totalAddresses = 2 ** (32 - parseInt(this.mask));
    const halfAddresses = Math.floor(totalAddresses / 2);
    let range2Start = 0;
    let newMask = parseInt(this.mask) + 1;

    range2Start = this.#ipv4ToBits(this.address) + (halfAddresses + 1);

    return {
      range1: new CIDR(this.address, newMask),
      range2: new CIDR(this.#bitsToIPv4(range2Start), newMask),
    };
  }

  #calculateNetworkAddress() {
    const maskBits = (1 << (32 - this.mask)) - 1;
    const addressBits = this.#ipv4ToBits(this.address);
    const networkBits = addressBits & ~maskBits;
    return this.#bitsToIPv4(networkBits);
  }

  #calculateCapacity() {
    return 2 ** (32 - this.mask) - 2;
  }

  #ipv4ToBits(address) {
    return address
      .split(".")
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  }

  #bitsToIPv4(bits) {
    return [
      (bits >> 24) & 255,
      (bits >> 16) & 255,
      (bits >> 8) & 255,
      bits & 255,
    ].join(".");
  }
}
