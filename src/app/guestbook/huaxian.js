'use client'
import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
// import styles from './index.module.less';

function Guestbook() {
  const containerRef = useRef();

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
  
    containerRef.current.appendChild(renderer.domElement)
    // 创建一个场景
    const scene = new THREE.Scene();
    // 创建一个相机  PerspectiveCamera（透视摄像机）。
    // 第一个参数是视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
    // 第二个参数是显示器的长宽比。
    // 第三个参数是近截面（Near）。
    // 第四个参数是远截面（Far）。
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    // 材质 线 设置颜色
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    // 带顶点的几何体
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    // 将材质和点结合形成线
    const line = new THREE.Line( geometry, material );
    // 将网格添加到场景中
    scene.add( line );

    // 循环渲染 每一帧都去渲染
    const animate = () => {
      requestAnimationFrame( animate );
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

export default Guestbook;