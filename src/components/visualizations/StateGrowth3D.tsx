import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Text as ThreeText, 
  RoundedBox, 
  Billboard
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../contexts/ThemeContext'

export interface StateData {
  date: string
  solana: number
  ethereum: number
}

interface ModernTowerProps {
  position: [number, number, number]
  height: number
  color: string
  label: string
  value: string
  isActive: boolean
  delay?: number
  scale?: number
  isDarkMode: boolean
}

interface ConnectionLinesProps {
  data: StateData[]
  scale?: number
  spacing?: number
  verticalOffset?: number
  isDarkMode: boolean
}

const defaultData: StateData[] = [
  { date: '2023-01', solana: 200, ethereum: 0.8 },
  { date: '2023-06', solana: 280, ethereum: 0.9 },
  { date: '2023-12', solana: 350, ethereum: 1.0 },
  { date: '2024-06', solana: 420, ethereum: 1.1 },
  { date: '2024-12', solana: 480, ethereum: 1.2 },
  { date: '2025-06', solana: 500, ethereum: 1.2 },
  { date: '2025-09', solana: 500, ethereum: 1.2 },
]

interface SceneProps {
  isDarkMode: boolean
  data: StateData[]
}

// Particle system for ambient effects
function ParticleField({ isDarkMode }: { isDarkMode: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 40
  const { scale } = useResponsive()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50 * scale
      pos[i * 3 + 1] = Math.random() * 20 * scale + 2 * scale // Adjusted down
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 * scale
    }
    return pos
  }, [particleCount, scale])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02 * scale}
        color={isDarkMode ? "#64FFDA" : "#4F46E5"}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Modern data tower with glassmorphism
function ModernTower({ 
  position, 
  height, 
  color, 
  label, 
  value,
  isActive, 
  delay = 0,
  scale = 1,
  isDarkMode
}: ModernTowerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.05 + 1
      meshRef.current.scale.set(1, breathe, 1)
      
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.1
      
      // Active tower pulse
      if (isActive && meshRef.current.material && 'emissiveIntensity' in meshRef.current.material) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 1
        meshRef.current.material.emissiveIntensity = pulse * 0.3
      }
    }
    
    // Glow effect
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1)
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const baseColor = new THREE.Color(color)
  const glowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: baseColor,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide,
  }), [baseColor])

  const textColor = isDarkMode ? color : (label === 'SOL' ? '#059669' : '#1D4ED8')

  return (
    <group ref={groupRef} position={position}>
      {/* Glow effect */}
      <RoundedBox
        ref={glowRef}
        args={[1 * scale, height + 0.5 * scale, 1 * scale]}
        position={[0, height / 2, 0]}
        radius={0.1 * scale}
        material={glowMaterial}
      />
      
      {/* Main tower */}
      <RoundedBox
        ref={meshRef}
        args={[0.8 * scale, height, 0.8 * scale]}
        position={[0, height / 2, 0]}
        radius={0.05 * scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={isDarkMode ? 0.85 : 0.9}
          roughness={isDarkMode ? 0.1 : 0.3}
          metalness={isDarkMode ? 0.9 : 0.6}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={isDarkMode ? 0.1 : 0.3}
          emissive={baseColor}
          emissiveIntensity={isActive ? 0.3 : (isDarkMode ? 0.15 : 0.05)}
          transmission={isDarkMode ? 0.3 : 0.1}
          thickness={0.5}
        />
      </RoundedBox>

      {/* Value label with modern typography */}
      <Billboard>
        <ThreeText
          position={[0, height + 0.6 * scale, 0]}
          fontSize={(hovered ? 0.35 : 0.3) * scale}
          color={textColor}
          outlineWidth={0.015 * scale}
          outlineColor={isDarkMode ? "#000" : "#FFF"}
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </ThreeText>
        <ThreeText
          position={[0, height + 0.25 * scale, 0]}
          fontSize={0.18 * scale}
          color={isDarkMode ? "#94A3B8" : "#64748B"}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </ThreeText>
      </Billboard>

      {/* Base platform */}
      <RoundedBox
        args={[1.2 * scale, 0.1 * scale, 1.2 * scale]}
        position={[0, -0.05 * scale, 0]}
        radius={0.02 * scale}
      >
        <meshStandardMaterial color={isDarkMode ? "#1E293B" : "#E2E8F0"} metalness={0} roughness={0.8} />
      </RoundedBox>
    </group>
  )
}

// Animated grid floor
function ModernGrid({ isDarkMode }: { isDarkMode: boolean }) {
  const gridRef = useRef<THREE.GridHelper>(null)
  const { scale } = useResponsive()
  
  useFrame((state) => {
    if (gridRef.current && gridRef.current.material) {
      if ('opacity' in gridRef.current.material) {
        gridRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1
      }
    }
  })

  return (
    <>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3 * scale, 0]}>
        <planeGeometry args={[40 * scale, 40 * scale]} />
        <meshStandardMaterial
          color={isDarkMode ? "#0F172A" : "#F8FAFC"}
          transparent
          opacity={0.8}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Animated grid */}
      <gridHelper 
        ref={gridRef}
        args={[30 * scale, 30 * scale, isDarkMode ? '#06D6A0' : '#4F46E5', isDarkMode ? '#048A81' : '#6366F1']} 
        position={[0, -2.9 * scale, 0]}
      />
    </>
  )
}

// Data connection lines
function ConnectionLines({ data, scale = 1, spacing = 2.5, verticalOffset = 0, isDarkMode }: ConnectionLinesProps) {
  const maxSolanaValue = Math.max(...data.map((d: StateData) => d.solana))
  const maxHeight = 10

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    data.forEach((item: StateData, index: number) => {
      const height = (item.solana / maxSolanaValue) * maxHeight * scale
      const xPosition = index * spacing - (data.length - 1) * spacing / 2
      pts.push(new THREE.Vector3(xPosition, height + 0.4 * scale + verticalOffset, -0.5 * scale))
    })
    return pts
  }, [data, maxSolanaValue, scale, spacing, verticalOffset])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p: THREE.Vector3) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={isDarkMode ? "#06D6A0" : "#4F46E5"}
        transparent
        opacity={0.6}
      />
    </line>
  )
}

// Hook để theo dõi kích thước màn hình
function useResponsive() {
  const { viewport, size } = useThree()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Tính toán scale dựa trên kích thước màn hình
  const getScale = () => {
    if (isMobile) return 0.6
    if (isTablet) return 0.8
    return 1
  }

  // Tính toán spacing dựa trên kích thước màn hình
  const getSpacing = () => {
    if (isMobile) return 1.8
    if (isTablet) return 2.1
    return 2.5
  }

  // Tính toán offset để đặt biểu đồ trên nền - adjusted down
  const getVerticalOffset = () => {
    if (isMobile) return -2.5
    if (isTablet) return -2.5
    return -2.5
  }

  return {
    isMobile,
    isTablet,
    scale: getScale(),
    spacing: getSpacing(),
    verticalOffset: getVerticalOffset(),
    viewport,
    size
  }
}

// Main scene component
function Scene({ isDarkMode, data }: SceneProps) {
  const maxHeight = 10
  const maxSolanaValue = Math.max(...data.map((d: StateData) => d.solana))
  const { scale, spacing, verticalOffset } = useResponsive()
  
  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={isDarkMode ? 0.25 : 0.5} />
      <directionalLight 
        position={[15, 20, 10]} 
        intensity={isDarkMode ? 0.8 : 0.5}
      />
      <pointLight position={[-10, 15, -10]} intensity={isDarkMode ? 0.4 : 0.2} color={isDarkMode ? "#06D6A0" : "#4F46E5"} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 0.3 : 0.15} color={isDarkMode ? "#3B82F6" : "#6366F1"} />

      {/* Effects (environment removed to avoid fetching remote HDR assets) */}
      <fog attach="fog" args={[isDarkMode ? '#0F172A' : '#F8FAFC', 20, 80]} />
      
      {/* Scene elements */}
      <ParticleField isDarkMode={isDarkMode} />
      <ModernGrid isDarkMode={isDarkMode} />
      <ConnectionLines data={data} scale={scale} spacing={spacing} verticalOffset={verticalOffset} isDarkMode={isDarkMode} />
      
      {/* Data towers */}
      {data.map((item: StateData, index: number) => {
        const solanaHeight = (item.solana / maxSolanaValue) * maxHeight * scale
        // Tăng hệ số cho ETH từ 8 lên 20 để tower ETH lớn hơn
        const ethereumHeight = (item.ethereum / maxSolanaValue) * maxHeight * 20 * scale
        const xPosition = index * spacing - (data.length - 1) * spacing / 2
        
        return (
          <group key={index}>
            {/* Solana Tower */}
            <ModernTower
              position={[xPosition, verticalOffset, -0.5 * scale]}
              height={solanaHeight}
              color={isDarkMode ? "#06D6A0" : "#059669"}
              label="SOL"
              value={`${item.solana}GB`}
              isActive={index === data.length - 1}
              delay={index * 0.2}
              scale={scale}
              isDarkMode={isDarkMode}
            />
            
            {/* Ethereum Tower */}
            <ModernTower
              position={[xPosition, verticalOffset, 1.5 * scale]}
              height={ethereumHeight}
              color={isDarkMode ? "#3B82F6" : "#1D4ED8"}
              label="ETH"
              value={`${item.ethereum}TB`}
              isActive={false}
              delay={index * 0.2 + 0.1}
              scale={scale}
              isDarkMode={isDarkMode}
            />

            {/* Date markers */}
            <Billboard>
              <ThreeText
                position={[xPosition, verticalOffset - 1.2 * scale, 0]}
                fontSize={0.22 * scale}
                color={isDarkMode ? "#64748B" : "#475569"}
                anchorX="center"
                anchorY="middle"
              >
                {item.date}
              </ThreeText>
            </Billboard>
          </group>
        )
      })}
      
      {/* Title and legends - adjusted down */}
      <Billboard>
        <ThreeText
          position={[0, 9 * scale, 0]}
          fontSize={0.8 * scale}
          color={isDarkMode ? "#F1F5F9" : "#0F172A"}
          outlineWidth={0.03}
          outlineColor={isDarkMode ? "#000" : "#FFF"}
          anchorX="center"
          anchorY="middle"
        >
          Blockchain State Growth
        </ThreeText>
        <ThreeText
          position={[0, 8.2 * scale, 0]}
          fontSize={0.3 * scale}
          color={isDarkMode ? "#94A3B8" : "#64748B"}
          anchorX="center"
          anchorY="middle"
        >
          Interactive 3D Visualization • 2025
        </ThreeText>
      </Billboard>
    </>
  )
}

// Component để điều chỉnh camera responsive
function ResponsiveCamera() {
  const { camera } = useThree()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Điều chỉnh camera position dựa trên kích thước màn hình
  useEffect(() => {
    if (camera && 'fov' in camera) {
      if (isMobile) {
        camera.position.set(0, 2, 18)
        camera.fov = 70
      } else if (isTablet) {
        camera.position.set(0, 3, 20)
        camera.fov = 65
      } else {
        camera.position.set(0, 4, 22)
        camera.fov = 60
      }
      camera.updateProjectionMatrix()
    }
  }, [isMobile, isTablet, camera])

  return null
}

export default function StateGrowth3D({ data = defaultData }: { data?: StateData[] }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100'
    }`}>
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 4, 22], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ResponsiveCamera />
        <Scene isDarkMode={isDarkMode} data={data} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Modern UI overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top header */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-auto">
          <div className={`backdrop-blur-md rounded-lg px-3 py-2 border text-xs ${
            isDarkMode 
              ? 'bg-black/20 border-white/10 text-white' 
              : 'bg-white/20 border-black/10 text-gray-900'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-medium">Live Data</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <div className={`backdrop-blur-md rounded-lg px-3 py-2 border text-xs ${
              isDarkMode 
                ? 'bg-black/20 border-white/10 text-white' 
                : 'bg-white/20 border-black/10 text-gray-900'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-yellow-400' : 'bg-blue-400'} animate-pulse`}></div>
                <span className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 grid grid-cols-2 gap-2 pointer-events-auto">
          <div className={`backdrop-blur-md rounded-lg px-3 py-2 border text-xs ${
            isDarkMode 
              ? 'bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-emerald-400/20' 
              : 'bg-gradient-to-r from-emerald-100/80 to-green-100/80 border-emerald-300/30'
          }`}>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>500GB</div>
            <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Current Solana</div>
          </div>
          <div className={`backdrop-blur-md rounded-lg px-3 py-2 border text-xs ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border-blue-400/20' 
              : 'bg-gradient-to-r from-blue-100/80 to-indigo-100/80 border-blue-300/30'
          }`}>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>1.2TB</div>
            <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Current Ethereum</div>
          </div>
        </div>

        {/* Legend */}
        <div className={`absolute bottom-3 left-3 backdrop-blur-md rounded-lg px-3 py-2 border pointer-events-auto ${
          isDarkMode 
            ? 'bg-black/20 border-white/10' 
            : 'bg-white/20 border-black/10'
        }`}>
          <h3 className={`font-bold mb-2 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Legend</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-emerald-400"></div>
              <span className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Solana (GB)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-blue-400"></div>
              <span className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Ethereum (TB)</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`absolute bottom-3 right-3 backdrop-blur-md rounded-lg px-3 py-2 border pointer-events-auto ${
          isDarkMode 
            ? 'bg-black/20 border-white/10' 
            : 'bg-white/20 border-black/10'
        }`}>
          <h3 className={`font-bold mb-2 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Controls</h3>
          <div className={`space-y-1 text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex items-center space-x-2">
              <span>🖱️</span>
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔍</span>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🤏</span>
              <span>Right-click to pan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}