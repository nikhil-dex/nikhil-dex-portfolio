import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import useScrollProgress from '../hooks/useScrollProgress';
import { Text, Html } from '@react-three/drei';
import { kf } from '../utils/kf';
import { useTexture, useVideoTexture } from "@react-three/drei";
import CustomCursor from './CustomCursor';
import CoffeeMug from "./CoffeeMug";

import { RoundedBox } from '@react-three/drei';
import Title from './Hero/Title';

const xRotate = {
    start: 0,
    center: 0,
    end: 0,
};

const yRotate = {
    start: 0,
    center: 0,
    end: 0,
};

const zRotate = {
    start: 0,
    center: 0,
    end: 0,
};

const positionX = {
    start: 0,
    center: 0,
    end: 0,
};

const positionY = {
    start: -0.8,
    center: 0,
    end: 0,
};

const positionZ = {
    start: 0,
    center: 0,
    end: 0,
};

const lidRotate = {
    start: -1.2,
    center: -1.2,
    end: 0,
};

const camera = {
    x: 0,
    y: 3,
    z: 11,
    fov: 32,
};

const pivot = {
    type: "CENTER",
};






function LaptopModel({ progress }) {

const [showVideo, setShowVideo] = useState(false);
const [started, setStarted] = useState(false);
  
  const groupRef = useRef();
  const lidRef = useRef();
  const keyboardTexture = useTexture("/Keyboard.png");
 
  keyboardTexture.anisotropy = 16;

const screenTexture = useVideoTexture(
    "/reze.mp4",
    {
        loop: true,
        muted: true,
        autoplay: false,
    }
);

const terminalTexture = useVideoTexture(
    "/terminal.mp4",
    {
        loop: false,
        muted: true,
        autoplay: false,
    }
);
const terminalVideo = terminalTexture.image;
const rezeVideo = screenTexture.image;
useEffect(() => {
  [terminalVideo, rezeVideo].forEach(v => {
    if (!v) return;
    v.setAttribute('disablePictureInPicture', '');
    v.setAttribute('controlsList', 'nodownload noplaybackrate');
    v.setAttribute('data-no-idm', '1');
    v.preload = 'auto';
  });
}, [terminalVideo, rezeVideo]);

// useEffect(() => {

//     if (Math.abs(lidRef.current?.rotation.x || 0) < 0.01) {
//     return;
// }
//     if (started) return;

//     setStarted(true);

//     const timeout = setTimeout(() => {
//         setShowVideo(true);
//     }, 4000); // terminal.mp4 duration

//     return () => clearTimeout(timeout);

// }, [progress, started]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const lid = lidRef.current;
    if (!lid) return;


const targetRotX = kf(progress, [
    [0,0],
    [0.15, 0],
    [0.20, -0.2],
    [0.3,-0.5],
     [0.35,-1],   
    [0.40,-1],   
    [0.45,-0.8],  
    [0.50,-1.0],
    [0.55,-1],
    [0.6,-0.2],
    [0.65,0.7],
    [0.75,2.5],
    [0.8,2.7],  
    [0.85,2.6],
    [0.9,3],
  
   
   

]);
const targetRotY = kf(progress, [
    [0, -0.6],
    [0.15, 1],
    [0.20, 1.3],
    [0.3,1.3],
    [0.50,0],
    [0.55,-0.5],
    [0.6,-0.7],
    [0.65,-0.7],
    [0.7,0],
    // [0.75,0.6],
    // [0.8,-1],
    // [0.85,-2],
    [0.9,-3.13],
  
]);

const targetRotZ = kf(progress, [
    [0, 0],
    [0.15, 0],
    [0.20, 0.3],
    [0.30,0.4],    

    [0.35,0.8],    
    [0.40,1.2],    
    [0.45,1],    
    [0.50,1.7], 
    [0.55,2],
    [0.6,2.8],
    [0.65,3.5],
    // [0.69,3.2],
    [0.75,3.2],
    [0.8,2.8],  
    [0.85,2.5],
    [0.9,3.14],
    [1,3.15],    
]);
const targetX = kf(progress, [
    [0, 0],
    [0.55,0],
    [0.6,0.5],
    [0.75,0.8],
    [0.77,-1],
    // [0.8,0],
    [1,0]
]);

const targetZ = kf(progress, [
    [0, 0],
    [.6,0],
    [.74,-1],
    [0.75,0],
    [0.8,-1],
    // [0.9,10.3],
    // [1,10.3]
  
]);
  const targetY = kf(progress, [
    [0,-1],
    [0.15,-0.2],
     [0.20,0.8],
    [0.30,0.8],
    [0.4,0.7],
    [0.5,1.5],
    // [0.75,0.7]
    [0.8,-1],
    // [0.9,1.5],
    // [1,1.5]
]);

  const targetLid = kf(progress, [
  [0, 0], 
  [0.34,0],
  [0.4,-1.7],
  [0.61,-1.3],
  [0.8,-1.3],
  [0.9,-1.7],
  [1,-1.7]

]);







    // const d = 0.12;
    // const d = progress < 0.7 ? 0.12 : 0.04;
    const d = progress < 0.7 ? 0.12 : 0.03;
    g.rotation.x += (targetRotX - g.rotation.x) * d;
    g.rotation.y += (targetRotY - g.rotation.y) * d;
    g.position.y += (targetY - g.position.y) * d;
    g.rotation.z += (targetRotZ - g.rotation.z) * d;
    g.position.x += (targetX - g.position.x) * d;
    g.position.z += (targetZ - g.position.z) * d;
    // lid.rotation.x += (targetLid - lid.rotation.x) * d;
    const hingeY =
    Math.abs(lid.rotation.x) < 0.523
        ? 0.14
        : 0.07;

lid.position.y += (hingeY - lid.position.y) * 0.1;

lid.rotation.x += (targetLid - lid.rotation.x) * d;
const isOpen = Math.abs(lid.rotation.x) > 0.05;

if (!isOpen) {

    setStarted(false);
    setShowVideo(false);

    terminalVideo.pause();
    terminalVideo.currentTime = 0;

    rezeVideo.pause();
    rezeVideo.currentTime = 0;

} else {

    // Lid opened for first time
    if (!started) {

        setStarted(true);
        terminalVideo.playbackRate = 1.5;
        terminalVideo.play();

        terminalVideo.onended = () => {
            setShowVideo(true);

            rezeVideo.currentTime = 0;
            rezeVideo.play();
        };
    }
}
  });

  return (
    
    <group ref={groupRef}>
       {/* <axesHelper args={[5]} /> */}
{/* 
    <Text position={[1.4,0.5,0]} fontSize={0.4} color="red">
        X
    </Text>
    <Text position={[0,1.4,0]} fontSize={0.4} color="green">
        Y
    </Text>
    <Text position={[0,0,1.4]} fontSize={0.4} color="blue">
        Z
    </Text> */}

    {/* Laptop */}
    

    {/* CENTER DOT */}
    <mesh>
      <sphereGeometry args={[0.05]} />
      <meshBasicMaterial color="red" />
    </mesh>
      {/* BASE */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.14, 2]} />
    <meshStandardMaterial color="#9a9a9a" />
      <meshPhysicalMaterial
    color="#B3B3B3"
    metalness={2}
    roughness={0.2}
    clearcoat={1}
    clearcoatRoughness={0.1}
/>
      </mesh>
      {/* KEYBOARD AREA */}

<mesh
    position={[0,0.076,0.15]}
    rotation={[-Math.PI/2,0,0]}
>
    <planeGeometry args={[2,1.25]} />
    <meshBasicMaterial
        map={keyboardTexture}
        transparent
    />
</mesh>
   
      {/* LID — ab hinge pe, scroll se khulegi */}
<group ref={lidRef} position={[0, 0.14, -1]}>
  

  {/* hinge z = -1 (depth 2 ka aadha, pichla edge) */}

  <mesh
    position={[0, 0, 1]}
    castShadow
    receiveShadow
>
    {/* mesh +1 aage — lid base ke upar wapas align */}
    <boxGeometry args={[2.3, 0.14, 2]} />
    <meshStandardMaterial color="#8a8a8a" />
    <meshPhysicalMaterial
    color="#959494"
    metalness={1.2}
    roughness={0.15}
/>
  </mesh>
  {/* SCREEN */}
{/* <mesh
    position={[0, -0.078, 0.95]}
    rotation={[-Math.PI *1.5, 0, 0]}
>
    <planeGeometry args={[2.3, 1.9]} />
    <meshBasicMaterial map={screenTexture} />
</mesh> */}

{!showVideo && (
    <mesh
        position={[0,-0.078,0.95]}
        rotation={[-Math.PI*1.5,0,0]}
    >
        <planeGeometry args={[2.28,1.95]} />
        <meshBasicMaterial map={terminalTexture} />
    </mesh>
)}

 
{showVideo && (
    <mesh
        position={[0,-0.078,0.95]}
        rotation={[-Math.PI*1.5,0,0]}
    >
        <planeGeometry args={[2.28,1.95]} />
        <meshBasicMaterial map={screenTexture} />
    </mesh>
)}



  {/* logo — purana z 0.45 tha, ab +1 offset ke saath 1.45 */}
{/* logo plate + text */}
<group position={[0.7, 0.071, 1.45]} rotation={[-Math.PI / 2, 0, 0.35]}>
  {/* plate (dark bg, original jaisa) */}
  <mesh>
    <planeGeometry args={[0.55, 0.32]} />
    <meshBasicMaterial color="#111" />
  </mesh>
  {/* text — plate se 0.001 upar taaki z-fighting na ho */}
  <Text
    position={[0, 0, 0.001]}
    fontSize={0.14}
    color="#94f310"
    anchorX="center"
    anchorY="middle"
  >
    nikhil
  </Text>
</group>
</group>

      {/* port */}
      <mesh position={[1.16, 0.06, -0.3]}>
        <boxGeometry args={[0.02, 0.06, 0.3]} />
        <meshBasicMaterial color="#4e4545" />
      </mesh>
     
    </group>
    
  
  );
}

function GroundShadow({ progress }) {
  // rise ke saath: shadow badi + halki + thodi door
  const spread = kf(progress, [[0, 1.6], [0.3, 1.9], [1, 2.4]]);
  const fade = kf(progress, [[0, 0.22], [0.3, 0.16], [1, 0.08]]);
  return (
    <mesh
    rotation={[-Math.PI/2,0,0]}
    position={[0,-1.2,0]}
    receiveShadow
>
    <planeGeometry args={[20,20]} />
    <shadowMaterial opacity={0.2} />
</mesh>
  );
}
function CameraController({ x, y, z }) {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
    });

    return null;
}
export default function Laptop3D() {
  
  const sectionRef = useRef(null);
 const progress = useScrollProgress(sectionRef);
const p = Math.min(progress / 1, 1);
// let p = progress;



const cameraX = kf(p, [
    [0,0],
    [0.83,0],
    [1,0],
]);

const cameraY = kf(p, [
    [0,3],
    [0.83,3],
    [1,0.5],
]);

const cameraZ = kf(p, [
    [0,11],
    [0.8,8],
    [1,-0.5],
]);

  return (
    <section id="Hero" ref={sectionRef} className="h-[450vh] relative cursor-none">
       <CustomCursor containerRef={sectionRef} />
      <div className="sticky top-0 h-screen cursor-none">
      {/* GRID BACKGROUND — fade at bottom */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px',
      // maskImage: 'linear-gradient(to bottom, black 55%, transparent 90%)',
      // WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 90%)',
      maskImage: `
  linear-gradient(to bottom, black 55%, transparent 90%),
  linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)
`,
maskComposite: 'intersect',
WebkitMaskComposite: 'source-in',
    }}
  />


        {/* heading — 40% progress tak poori exit */}

   


         
    <Title

  as="h1"
  loop={false}
  className="absolute left-[8%] top-[22%] text-4xl font-display font-semibold z-10"
  style={{
    transform: `translateY(${kf(progress, [[0, 0], [0.4, -120]])}vh)`,
  }}
>
  This is<br />Nikhil&apos;s portfolio

</Title> 


    
       <Canvas
    shadows
    gl={{ antialias: true }}
    camera={{ position: [0, 3, 11], fov: 32 }}
>
    <CameraController
    x={cameraX}
    y={cameraY}
    z={cameraZ}
/>

  <ambientLight intensity={1.1} />
   <directionalLight
    castShadow
    position={[5,8,5]}
    intensity={1.5}
/>
    <LaptopModel progress={p} />
    <GroundShadow progress={p} />
     <CoffeeMug/>

</Canvas>

      </div>
    </section>
  );
}