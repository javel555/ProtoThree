import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';

import SceneManager from "./SceneManager.mjs";

export default class Manager {
  constructor(parent, width, height, render_option) {
    console.log(" ==== ProtoThree Start ==== ")

    // setup proto three
    this.scene = new SceneManager(this);
    this.loadFunc = () => { return []; };

    // setup three.js - s
    width ||= window.innerWidth;
    height ||= window.innerHeight;

    render_option ||= {
      clearColor: 0x7f7fff
    };

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(render_option.clearColor));
    renderer.setSize(width, height);

    const wrapper = document.querySelector(parent);
    wrapper.appendChild(renderer.domElement);

    this.three = {
      renderer: renderer
    };
    // setup three.js - e

    // start main loop
    this.tick();
  }

  /**
   *
   * @param func {Function} Promiseの配列を返す関数
   */
  setLoad(func) {
    this.loadFunc = func;
  }

  tick() {
    if (this.scene.current && this.scene.current.camera) {
      this.scene.update();
      this.three.renderer.render(this.scene.current, this.scene.current.camera);
    }
    requestAnimationFrame(this.tick.bind(this));
  }

};