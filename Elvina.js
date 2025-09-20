const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfbeee0);

const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 9, 25);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, 20, 10);
scene.add(pointLight);


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: 0xd9c9a8 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

function createWall(width, height, color, posX, posY, posZ, rotY = 0) {
    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshStandardMaterial({ color })
    );
    wall.position.set(posX, posY, posZ);
    wall.rotation.y = rotY;
    scene.add(wall);
}
createWall(30, 12, 0xf3e1c4, 0, 6, -15);          
createWall(30, 12, 0xf3e1c4, -15, 6, 0, Math.PI/2); 
createWall(30, 12, 0xf3e1c4, 15, 6, 0, -Math.PI/2); 


function createBed(x, y, z) {
 
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.8, 10), 
        new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    frame.position.set(x, y + 0.4, z + 2.5); 
    scene.add(frame);

    
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });

    const halfWidth = 8 / 2;
    const halfDepth = 10 / 2;

    const legPositions = [
        [x + halfWidth - 0.2, y - 0.4, z + 2.5 + halfDepth - 0.2], 
        [x + halfWidth - 0.2, y - 0.4, z + 2.5 - halfDepth + 0.2],  
        [x - halfWidth + 0.2, y - 0.4, z + 2.5 + halfDepth - 0.2],
        [x - halfWidth + 0.2, y - 0.4, z + 2.5 - halfDepth + 0.2], 
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        scene.add(leg);
    });

 
    const mattress = new THREE.Mesh(
        new THREE.BoxGeometry(8, 1, 10),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mattress.position.set(x, y + 1.0, z + 2.5);
    scene.add(mattress);

  
    const pillow1 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 1),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    pillow1.position.set(x - 2, y + 1.5, z + 0);
    scene.add(pillow1);

    const pillow2 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 1),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    pillow2.position.set(x + 2, y + 1.5, z + 0); 
    scene.add(pillow2);

    
    const headboard = new THREE.Mesh(
        new THREE.BoxGeometry(8, 2, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    headboard.position.set(x, y + 2, z - 2.25);
    scene.add(headboard);
}
createBed(-8, 1, -5);


function createTable(x, y, z) {
    const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.3, 3),
        new THREE.MeshStandardMaterial({ color: 0x654321 })
    );
    tableTop.position.set(x, y + 2, z);
    scene.add(tableTop);

    const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
    const legPositions = [
        [x - 2.7, y + 1, z - 1.2],
        [x + 2.7, y + 1, z - 1.2],
        [x - 2.7, y + 1, z + 1.2],
        [x + 2.7, y + 1, z + 1.2]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, new THREE.MeshStandardMaterial({ color: 0x654321 }));
        leg.position.set(pos[0], pos[1], pos[2]);
        scene.add(leg);
    });

    
    const monitor = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1.2, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    monitor.position.set(x, y + 3, z);
    scene.add(monitor);

    const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    stand.position.set(x, y + 2.5, z);
    scene.add(stand);

    
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.3, 1.5),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
    );
    seat.position.set(x, y + 1.25, z + 2.5);
    scene.add(seat);

    
    const back = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.8, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
    );
    back.position.set(x, y + 2.1, z + 3.0);
    scene.add(back);

    
    const chairLegOffsets = [
        [-0.65, 1.0, -0.65],
        [0.65, 1.0, -0.65],
        [-0.65, 1.0, 0.65],
        [0.65, 1.0, 0.65]
    ];
    chairLegOffsets.forEach(offset => {
        const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 1.0, 12),
            new THREE.MeshStandardMaterial({ color: 0x555555 })
        );
        leg.position.set(x + offset[0], y + offset[1], z + 2.5 + offset[2]);
        scene.add(leg);
    });
}
createTable(8, 0, -5);


function createWindow(width, height, posX, posY, posZ) {
    const window = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshStandardMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6 })
    );
    window.position.set(posX, posY, posZ);
    scene.add(window);
}
createWindow(5, 4, 0, 7, -14.9);


const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    new THREE.MeshStandardMaterial({ color: 0xd2691e })
);
rug.rotation.x = -Math.PI / 2;
rug.position.set(-8, 0.01, -5);
scene.add(rug);


const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffffaa })
);
lamp.position.set(0, 11, 0);
scene.add(lamp);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
