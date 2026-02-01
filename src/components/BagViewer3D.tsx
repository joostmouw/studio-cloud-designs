import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Center } from '@react-three/drei';
import { useState, memo, useEffect } from 'react';
import * as THREE from 'three';

interface BagModelProps {
  color: string;
}

const BagModel = memo(({ color }: BagModelProps) => {
  const { scene } = useGLTF('/bag-model.glb');

  // Clone the scene to avoid modifying the cached original
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone the material so we don't modify the cached version
        if (child.material) {
          child.material = child.material.clone();

          // Apply the selected color
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(color);
            child.material.roughness = 0.85;
            child.material.metalness = 0;
            child.material.needsUpdate = true;
          } else if (child.material instanceof THREE.MeshBasicMaterial) {
            child.material.color.set(color);
            child.material.needsUpdate = true;
          }
        }

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, color]);

  return (
    <Center>
      <primitive
        object={scene}
        scale={2.5}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Center>
  );
});

// Preload the model
useGLTF.preload('/bag-model.glb');

interface BagViewer3DProps {
  className?: string;
}

const BagViewer3D = memo(({ className = "" }: BagViewer3DProps) => {
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
      <div className="h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] w-full bg-secondary/30 rounded-lg overflow-hidden relative">
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 45 }}
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Soft ambient light for canvas material */}
          <ambientLight intensity={0.7} />

          {/* Main key light - soft and diffused like natural light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Fill light from the other side */}
          <directionalLight position={[-5, 5, -3]} intensity={0.5} />

          {/* Subtle rim light for depth */}
          <directionalLight position={[0, 4, -5]} intensity={0.3} />

          <BagModel color={selectedColor} />

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.5}
            scale={8}
            blur={2.5}
            far={4}
            resolution={256}
          />

          <Environment preset="apartment" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.7}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>

        {/* Instruction overlay */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
          Sleep om te draaien
        </div>
      </div>

      {/* Color selector */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        <span className="text-[10px] sm:text-xs text-muted-foreground tracked-wide">KLEUR:</span>
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.value)}
            className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground ${
              selectedColor === color.value
                ? 'border-foreground scale-110'
                : 'border-transparent'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
});

export default BagViewer3D;
