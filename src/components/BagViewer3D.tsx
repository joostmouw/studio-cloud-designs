import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';

interface BagModelProps {
  color: string;
}

const BagModel = ({ color }: BagModelProps) => {
  // Create a slouchy canvas bag shape using bezier curves
  const bagShape = new THREE.Shape();
  
  // Draw the front profile of the bag - rounded bottom, wider top
  bagShape.moveTo(-1.5, 0);
  bagShape.quadraticCurveTo(-1.8, 1.2, -1.4, 2.2);
  bagShape.lineTo(-1.2, 2.4);
  bagShape.lineTo(1.2, 2.4);
  bagShape.lineTo(1.4, 2.2);
  bagShape.quadraticCurveTo(1.8, 1.2, 1.5, 0);
  bagShape.quadraticCurveTo(0, -0.3, -1.5, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.8,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.15,
    bevelOffset: 0,
    bevelSegments: 8,
  };

  return (
    <group rotation={[0.1, 0, 0]} position={[0, -0.5, 0]}>
      {/* Main bag body */}
      <mesh position={[0, 0, -0.4]} castShadow>
        <extrudeGeometry args={[bagShape, extrudeSettings]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.85} 
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Shoulder strap */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <torusGeometry args={[1.2, 0.12, 8, 32, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
      </mesh>
      
      {/* Strap connectors */}
      <mesh position={[-1.05, 2.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[1.05, 2.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
      </mesh>
      
      {/* Pocket on front */}
      <mesh position={[0, 0.8, 0.42]} castShadow>
        <boxGeometry args={[1.4, 1.2, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0} />
      </mesh>
      
      {/* Pocket seam line */}
      <mesh position={[0, 0.2, 0.45]}>
        <boxGeometry args={[1.35, 0.02, 0.01]} />
        <meshStandardMaterial color="#888" roughness={0.5} />
      </mesh>
    </group>
  );
};

interface BagViewer3DProps {
  className?: string;
}

const BagViewer3D = ({ className = "" }: BagViewer3DProps) => {
  const [selectedColor, setSelectedColor] = useState("#F5F0E8");
  
  const colors = [
    { name: "Cream", value: "#F5F0E8" },
    { name: "Stone", value: "#A8A39D" },
    { name: "Black", value: "#2A2A2A" },
    { name: "Olive", value: "#5C6B4A" },
    { name: "Coral", value: "#C97B6B" },
  ];

  return (
    <div className={`${className}`}>
      <div className="h-[400px] lg:h-[500px] w-full bg-secondary/30 rounded-lg overflow-hidden relative">
        <Canvas
          camera={{ position: [0, 1, 6], fov: 35 }}
          shadows
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.3} />
          
          <BagModel color={selectedColor} />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={8} 
            blur={2} 
            far={3}
          />
          
          <Environment preset="studio" />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
        
        {/* Instruction overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full">
          Sleep om te draaien
        </div>
      </div>
      
      {/* Color selector */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="text-xs text-muted-foreground tracked-wide">KLEUR:</span>
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.value)}
            className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
              selectedColor === color.value 
                ? 'border-foreground scale-110' 
                : 'border-transparent'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BagViewer3D;
