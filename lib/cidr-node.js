import { CIDR } from "./cidr.js";

export class CIDRNode {
  /**
   * CIDR Node Class
   * @param {CIDR} cidr
   */
  constructor(cidr) {
    this.cidr = cidr;
    this.left = null;
    this.right = null;
    this.isAllocated = false;
  }

  get isRecursiveAllocated() {
    return (
      this.isAllocated ||
      this.isLeftRecursiveAllocated ||
      this.isRightRecursiveAllocated
    );
  }

  get isLeftRecursiveAllocated() {
    return this.left ? this.left.isRecursiveAllocated : false;
  }

  get isRightRecursiveAllocated() {
    return this.right ? this.right.isRecursiveAllocated : false;
  }

  get isLeftAllocated() {
    return this.left ? this.left.isAllocated : false;
  }

  get isRightAllocated() {
    return this.right ? this.right.isAllocated : false;
  }
}
