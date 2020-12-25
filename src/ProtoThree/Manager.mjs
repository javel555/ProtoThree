import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js';

import SceneManager from "./SceneManager.mjs";
import InputManager from "./InputManager.mjs";

export default class Manager {
  constructor(parent, width, height, render_option) {
    console.log(" ==== ProtoThree Start ==== ")

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
      canvas: renderer.domElement,
      renderer: renderer
    };
    // setup three.js - e

    // setup proto three
    this.scene = new SceneManager(this);
    window.addEventListener('resize', () => {
      // リサイズ対応
      this.scene.current.camera.aspect = window.innerWidth / window.innerHeight;
      this.scene.current.camera.updateProjectionMatrix();
      this.three.renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );

    this.input = new InputManager(this);
    this.loadFunc = () => { return []; };

    // start main loop
    this.prevTime = performance.now();
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
    this.time = performance.now();
    if (this.scene.current && this.scene.current.camera) {
      this.input.update();
      this.scene.update();
      this.three.renderer.render(this.scene.current, this.scene.current.camera);
    }
    requestAnimationFrame(this.tick.bind(this));
    this.prevTime = this.time;
  }

};