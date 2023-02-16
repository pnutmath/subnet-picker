import { SubnetPicker } from "../lib/index.js"
const subnetPicker = new SubnetPicker("10.10.0.0/16");
const outputs = [];

outputs.push(subnetPicker.pick(2046));
outputs.push(subnetPicker.pick(2046));
outputs.push(subnetPicker.pick(8190));
outputs.push(subnetPicker.pick(4094));
outputs.push(subnetPicker.pick(4094));
outputs.push(subnetPicker.pick(2046));
outputs.push(subnetPicker.pick(1022));
outputs.push(subnetPicker.pick(1022));

console.log(outputs);