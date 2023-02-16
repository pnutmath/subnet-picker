import { CIDRNode } from "./cidr-node.js";
import { CIDR } from "./cidr.js";

/**
 * Subnet CIDR picker for particular hosts from given CIDR
 */
export class SubnetPicker {
  /**
   *  New Subnet Picker
   * @param {string} cidr E.g. 10.10.0.0/16
   */
  constructor(cidr) {
    const [address, mask] = cidr.split("/");
    const octets = address.split(".").map((octet) => parseInt(octet));
    if (octets.length !== 4 || mask < 0 || mask > 32) {
      throw new Error("Invalid CIDR");
    }

    this._initialCidr = new CIDR(address, mask);
    this._rootNode = this.#buildTree();
  }

  /**
   * @param {number} hostsCount
   */
  pick(hostsCount) {
    return this.#allocateSubCIDR(this._rootNode, hostsCount);
  }

  #buildTree(cidr = null) {
    let node = new CIDRNode(cidr ? cidr : this._initialCidr);
    if (node.cidr.mask > 24) {
      return null;
    }
    const { range1, range2 } = node.cidr.split();
    node.left = this.#buildTree(range1);
    node.right = this.#buildTree(range2);
    return node;
  }

  #allocateSubCIDR(node, hosts = 1) {
    if (node.isAllocated) {
      return null;
    }
    if (node.left) {
      const cidrString = this.#allocateSubCIDR(node.left, hosts);
      if (cidrString) {
        return cidrString;
      }
    }
    if (node.right) {
      const cidrString = this.#allocateSubCIDR(node.right, hosts);
      if (cidrString) {
        return cidrString;
      }
    }
    if (
      node.cidr.capacity >= hosts &&
      !node.isAllocated &&
      !node.isRecursiveAllocated
    ) {
      node.isAllocated = true;
      return node.cidr.toString();
    }
  }
}
