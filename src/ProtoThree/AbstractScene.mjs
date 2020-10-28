import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';

export default class AbstractScene extends THREE.Scene {
  constructor() {
    super();
  }

  setManager(manager) {
    this.manager = manager
  }

  setupCamera() {
    console.error("please setup camera");
    return null;
  }

  create() {
    // NOP
  }

  update() {
    // NOP
  }

  shutdown() {
    // NOP
  }

};