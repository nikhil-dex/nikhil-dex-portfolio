import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Float, Text } from "@react-three/drei";

export default function CoffeeMug() {
    const mug = useRef();
    useFrame((state) => {
    mug.current.rotation.y =
        Math.sin(
            state.clock.elapsedTime
        ) * 0.05;
});
    return (
        <group 
        ref={mug}
        position={[2.5, -1.1, 0.25]}>
                 <Float
    speed={2}
    floatIntensity={0.2}
>
    <Text
        position={[0,0.25,0]}
        fontSize={0.2}
        color="#343434"
    >
        ~
    </Text>
    <Text
        position={[0,0.32,0]}
        fontSize={0.2}
        color="#343434"
    >
        ~
    </Text>
</Float>
            {/* Mug */}
            <mesh castShadow>
                <cylinderGeometry
                    args={[0.12, 0.1, 0.18, 32]}
                />
                <meshStandardMaterial
                    color="#f5f5f5"
                    roughness={0.3}
                />
            </mesh>

            {/* Coffee */}
            <mesh position={[0, 0.09, 0]}>
                <cylinderGeometry
                    args={[0.105, 0.105, 0.01, 32]}
                />
                <meshStandardMaterial
                    color="#4b2e2b"
                />
            </mesh>

            {/* Handle */}
            <mesh
                position={[0.13, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <torusGeometry
                    args={[0.05, 0.012, 16, 32]}
                />
                <meshStandardMaterial
                    color="#f5f5f5"
                />
            </mesh>
       
        </group>
    );
}