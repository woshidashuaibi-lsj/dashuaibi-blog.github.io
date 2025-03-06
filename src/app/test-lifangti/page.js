'use client'
import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
// import styles from './index.module.less';

function Lifangti() {
  const containerRef = useRef();

  useEffect(() => {
  // 创建一个场景
  const scene = new THREE.Scene();
  // 创建一个相机  PerspectiveCamera（透视摄像机）。
  // 第一个参数是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
  // 第二个参数是显示器的长宽比。
  // 第三个参数是近截面（Near）。
  // 第四个参数是远截面（Far）。
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // 搞个立方体来玩玩
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // 材质 设置颜色
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // 网格
  const cube = new THREE.Mesh( geometry, material );
  // 将网格添加到场景中
  scene.add( cube );

  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  containerRef.current.appendChild(renderer.domElement)

  // 循环渲染 每一帧都去渲染
  const animate = () => {
    requestAnimationFrame( animate );
    // 每一帧都去旋转，这样就出现了动画的效果
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	  renderer.render( scene, camera );
  }
  animate();


  },[])
  
  return (
    <div>
     <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default Lifangti;