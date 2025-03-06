'use client'
import React, { useEffect, useRef } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRouter } from 'next/navigation';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import * as THREE from 'three';
// import styles from './index.module.less';

function Guestbook() {
  const containerRef = useRef();
  const router = useRouter();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let clickableObjects = [];

  useEffect(() => {
    // 创建一个场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfadadd); // 柔和的粉红色

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 15, 20) // 调整相机位置

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.minDistance = 5    // 设置最小缩放距离
    controls.maxDistance = 100   // 设置最大缩放距离
    controls.enablePan = true   // 允许平移
    controls.autoRotate = false // 可以设置为 true 实现自动旋转

    // 加载模型
    const loader = new GLTFLoader()
    let doorModel;
    loader.load(
      './GLTF/scene.gltf',
      (gltf) => {
        const model1 = gltf.scene;
        // model1.position.set(-5, 0, 0); // 放在左侧
        scene.add(model1);
        // scene.add(gltf.scene)
         // 自动调整相机视角以适应模型大小
         const box = new THREE.Box3().setFromObject(gltf.scene)
         const center = box.getCenter(new THREE.Vector3())
         const size = box.getSize(new THREE.Vector3())
         // 计算合适的相机距离
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
        camera.position.z = cameraZ * 3  // 增加观察距离的倍数
        camera.position.y = cameraZ * 1.2  // 添加一个高度偏移
        
        // 将模型居中
        gltf.scene.position.x = -center.x
        gltf.scene.position.y = -center.y
        gltf.scene.position.z = -center.z
        
        // controls.target.set(0, 0, 0)
        // controls.update()

        loader.load(
          './door/scene.gltf', // 第3个模型路径
          (gltf) => {
            const model3 = gltf.scene;
            model3.position.set(0, 0, 20); // 往前放（z轴负方向）
            model3.scale.set(0.3, 0.3, 0.3); // 缩小到原来的一半大小
            scene.add(model3);

            // 保存门模型的引用，以便在动画循环中使用
            doorModel = model3;
            
            // 所有模型加载完成后，调整相机位置
            const allModels = new THREE.Group();
            allModels.add(model1.clone());
            allModels.add(model3.clone());
            
            const box = new THREE.Box3().setFromObject(allModels);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            camera.position.z = cameraZ * 3;
            camera.position.y = cameraZ * 1.2;
            
            controls.target.set(center.x, center.y, center.z);
            controls.update();
         
        })

         
      },
      undefined,
      (error) => {
        console.error('加载模型出错:', error)
      }
    )


    // 循环渲染 每一帧都去渲染
    const animate = () => {
      requestAnimationFrame( animate );
      controls.update()
       // 如果门模型已加载，则旋转它
       if (doorModel) {
        // 每帧旋转一定角度（这里是绕y轴旋转）
        doorModel.rotation.y += 0.005; // 可以调整旋转速度
      }
      renderer.render( scene, camera );
    }
    animate();

    // 处理窗口大小变化
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize)

    // 添加点击事件处理
    function onClick(event) {
      // 计算鼠标在归一化设备坐标中的位置
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // 更新射线投射器
      raycaster.setFromCamera(mouse, camera);
      
      // 检测射线与哪些对象相交
      const intersects = raycaster.intersectObjects(clickableObjects);
      
      if (intersects.length > 0) {
        const url = intersects[0].object.userData.url;
        if (url) {
          router.push(url);
        }
      }
    }
    
    // 添加鼠标悬停效果
    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);
      
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    }

    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', onWindowResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
      window.removeEventListener('click', onClick);
      window.removeEventListener('mousemove', onMouseMove);
    }
  },[])
  
  return (
    <div>
     <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
     <div>这是入口</div>
    </div>
  );
}

export default Guestbook;