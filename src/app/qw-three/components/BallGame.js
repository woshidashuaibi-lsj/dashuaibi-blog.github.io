'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GUI from 'lil-gui' 

export default function BallGame() {
  const containerRef = useRef()
  const gameRef = useRef({
    score: 0,
    isGameOver: false,
    paddle: null,
    ball: null,
    ballVelocity: { x: 0.03, y: 0.03 },
    params: {
      ballSpeed: 0.03,
      paddleSpeed: 0.15,
      lightIntensity: 2,
      ambientIntensity: 0.8,
      ballColor: '#ff0000',
      paddleColor: '#00ff00',
      backgroundColor: '#333333'
    }
  })
  
  useEffect(() => {
    if (!containerRef.current) return

    const params = gameRef.current.params
    
    // 场景设置
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(params.backgroundColor) // 设置背景色
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.innerHTML = '' // 清除之前的内容
    containerRef.current.appendChild(renderer.domElement)
    
    // 创建球体
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const ballMaterial = new THREE.MeshPhongMaterial({ color: params.ballColor })
    const ball = new THREE.Mesh(ballGeometry, ballMaterial)
    scene.add(ball)
    gameRef.current.ball = ball
    
    // 创建平台
    const paddleGeometry = new THREE.BoxGeometry(2, 0.2, 1)
    const paddleMaterial = new THREE.MeshPhongMaterial({ color: params.paddleColor  })
    const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial)
    paddle.position.y = -2
    scene.add(paddle)
    gameRef.current.paddle = paddle
    
    // 增强光照
    const light = new THREE.PointLight(0xffffff, params.lightIntensity, 100) // 增加光照强度
    light.position.set(0, 0, 10)
    scene.add(light)
    
    const ambientLight = new THREE.AmbientLight(0xffffff, params.ambientIntensity) // 增加环境光强度
    scene.add(ambientLight)

    // 添加调试面板
    const gui = new GUI()
    gui.add(params, 'ballSpeed', 0.01, 0.1).name('Ball Speed').onChange(() => {
      gameRef.current.ballVelocity.x = params.ballSpeed;
      gameRef.current.ballVelocity.y = params.ballSpeed;
    })
    gui.addColor(params, 'ballColor').name('Ball Color').onChange(() => {
      ballMaterial.color.set(params.ballColor)
    })
    
    const paddleFolder = gui.addFolder('Paddle')
    paddleFolder.add(params, 'paddleSpeed', 0.05, 0.3).name('Speed')
    paddleFolder.addColor(params, 'paddleColor').name('Color').onChange(() => {
      paddleMaterial.color.set(params.paddleColor)
    })
    
    const lightFolder = gui.addFolder('Lighting')
    lightFolder.add(params, 'lightIntensity', 0, 5).name('Point Light').onChange(() => {
      light.intensity = params.lightIntensity
    })
    lightFolder.add(params, 'ambientIntensity', 0, 2).name('Ambient Light').onChange(() => {
      ambientLight.intensity = params.ambientIntensity
    })
    
    const sceneFolder = gui.addFolder('Scene')
    sceneFolder.addColor(params, 'backgroundColor').name('Background').onChange(() => {
      scene.background.set(params.backgroundColor)
    })

     // 添加重置按钮
     const resetButton = {
      reset: () => resetGame()
    }
    gui.add(resetButton, 'reset').name('Reset Game')
    
    camera.position.z = 5
    
    // 键盘控制
    const keys = {
      left: false,
      right: false
    }
    
    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          keys.left = true
          break
        case 'ArrowRight':
          keys.right = true
          break
      }
    }
    
    const handleKeyUp = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          keys.left = false
          break
        case 'ArrowRight':
          keys.right = false
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    // 鼠标控制
    const handleMouseMove = (event) => {
      if (gameRef.current.isGameOver) return
      const x = (event.clientX / window.innerWidth) * 2 - 1
      paddle.position.x = x * 3
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    // 重置游戏
    const resetGame = () => {
      gameRef.current.score = 0
      gameRef.current.isGameOver = false
      gameRef.current.ball.position.set(0, 0, 0)
      gameRef.current.ballVelocity.x = gameRef.current.params.ballSpeed
      gameRef.current.ballVelocity.y = gameRef.current.params.ballSpeed
      gameRef.current.paddle.position.set(0, -2, 0)
      updateScore(0)
      const gameOverElement = document.getElementById('gameOver')
      if (gameOverElement) {
        gameOverElement.style.display = 'none'
      }
    }
    
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate)
      
      if (!gameRef.current.isGameOver) {
        // 键盘控制平台移动
        if (keys.left && paddle.position.x > -3) {
          paddle.position.x -= params.paddleSpeed
        }
        if (keys.right && paddle.position.x < 3) {
          paddle.position.x += params.paddleSpeed
        }
        
        // 移动球
        gameRef.current.ball.position.x += gameRef.current.ballVelocity.x
        gameRef.current.ball.position.y += gameRef.current.ballVelocity.y
        
        // 碰撞检测 - 墙壁
        if (gameRef.current.ball.position.x > 3 || gameRef.current.ball.position.x < -3) {
          gameRef.current.ballVelocity.x = -gameRef.current.ballVelocity.x
        }
        if (gameRef.current.ball.position.y > 3) {
          gameRef.current.ballVelocity.y = -gameRef.current.ballVelocity.y
        }
        
        // 碰撞检测 - 平台
        if (gameRef.current.ball.position.y < paddle.position.y + 0.5 && 
            gameRef.current.ball.position.y > paddle.position.y &&
            gameRef.current.ball.position.x > paddle.position.x - 1 &&
            gameRef.current.ball.position.x < paddle.position.x + 1) {
          gameRef.current.ballVelocity.y = -gameRef.current.ballVelocity.y
          gameRef.current.score += 1
          updateScore(gameRef.current.score)
        }
        
        // 游戏结束检测
        if (gameRef.current.ball.position.y < -3) {
          gameRef.current.isGameOver = true
          showGameOver()
        }
      }
      
      renderer.render(scene, camera)
    }
    animate()
    
    // 更新分数显示
    const updateScore = (score) => {
      const scoreElement = document.getElementById('score')
      if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`
      }
    }
    
    // 显示游戏结束
    const showGameOver = () => {
      const gameOverElement = document.getElementById('gameOver')
      if (gameOverElement) {
        gameOverElement.style.display = 'flex'
      }
    }
    
    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    
    // 清理函数
    return () => {
      gui.destroy()  // 清理调试面板
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])
  
  const handleRestart = () => {
    if (gameRef.current.isGameOver) {
      gameRef.current.score = 0
      gameRef.current.isGameOver = false
      if (gameRef.current.ball) {
        gameRef.current.ball.position.set(0, 0, 0)
      }
      if (gameRef.current.paddle) {
        gameRef.current.paddle.position.set(0, -2, 0)
      }
      const gameOverElement = document.getElementById('gameOver')
      if (gameOverElement) {
        gameOverElement.style.display = 'none'
      }
      const scoreElement = document.getElementById('score')
      if (scoreElement) {
        scoreElement.textContent = 'Score: 0'
      }
    }
  }
  
  return (
    <div style={{ position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
      <div 
        id="score" 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontSize: '24px'
        }}
      >
        Score: 0
      </div>
      <div 
        id="gameOver"
        style={{
          display: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '48px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        <div>Game Over!</div>
        <button 
          onClick={handleRestart}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '24px',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Restart
        </button>
      </div>
    </div>
  )
}