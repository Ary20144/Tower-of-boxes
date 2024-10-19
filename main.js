import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mod } from 'three/webgpu';


const scene = new THREE.Scene();

//THREE.PerspectiveCamera( fov angle, aspect ratio, near depth, far depth );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
controls.target.set(0, 5, 0);

// Rendering 3D axis
const createAxisLine = (color, start, end) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(geometry, material);
};
const xAxis = createAxisLine(0xff0000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0)); // Red
const yAxis = createAxisLine(0x00ff00, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0)); // Green
const zAxis = createAxisLine(0x0000ff, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 3)); // Blue
scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);


// ***** Assignment 2 *****
// Setting up the lights
const pointLight = new THREE.PointLight(0xffffff, 100, 100);
pointLight.position.set(5, 5, 5); // Position the light
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.5, .0, 1.0).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x505050);  // Soft white light
scene.add(ambientLight);

const phong_material = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // Green color
    shininess: 100   // Shininess of the material
});


// Start here.

const l = 0.5
const positions = new Float32Array([
    // Front face
    -l, -l,  l, // 0
     l, -l,  l, // 1
     l,  l,  l, // 2
    -l,  l,  l, // 3

    // Left face
    -l, -l, -l, // 4
    -l, -l,  l, // 5
    -l,  l,  l, // 6 
    -l,  l, -l, // 7
  
    // Top face
   -l, l, -l, // 8
   -l, l,  l, // 9
    l, l,  l, // 10
    l, l, -l, // 11


    // Bottom face
    -l, -l, -l, // 12
    -l, -l,  l, // 13
     l, -l,  l, // 14
     l, -l, -l, // 15
  
    // Right face
    l,  l,  l, // 16
    l,  l, -l, // 17
    l, -l, -l, // 18
    l, -l,  l, // 19


     // Back face
      -l, -l, -l, // 20
       l, -l, -l, // 21
       l,  l, -l, // 22
      -l,  l, -l, // 23
  ]);
  
  const indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
  
    // Left face
    4, 5, 6,
    4, 6, 7,
  
    // Top face
    8, 9, 10,
    8, 10, 11,
    
    // Bottom face
    15, 14, 13,
    15, 13, 12,
  
    // Right face
    19, 17, 16,
    19, 18, 17,

    // Back face
    23, 22, 21,
    23, 21, 20,
  ];
  
  // Compute normals
  const normals = new Float32Array([
    // Front face
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  
    // Left face
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
  
    // Top face
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
  
    // Bottom face
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  
    // Right face
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    // Back face
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
  ]);

const custom_cube_geometry = new THREE.BufferGeometry();
custom_cube_geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
custom_cube_geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
custom_cube_geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
let cube = new THREE.LineSegments( custom_cube_geometry, phong_material );

// TODO: Implement wireframe geometry
const wireframe_vertices = new Float32Array([
  // Top face
      -l, l, -l,
      -l, l, l,
      -l, l, l,
      l, l, l,
      l, l, l,
      l, l, -l,
      l, l, -l,
      -l, l, -l,
  // Bottom face
      -l, -l, -l,
      -l, -l, l,
      -l, -l, l,
      l, -l, l,
      l, -l, l,
      l, -l, -l,
      l, -l, -l,
      -l, -l, -l,
  // Right face
      l, -l, -l,
      l, -l, l,
      l, -l, l,
      l, l, l,
      l, l, l,
      l, l, -l,
      l, l, -l,
      l, -l, -l,
  // Left face
      -l, -l, -l,
      -l, -l, l,
      -l, -l, l,
      -l, l, l,
      -l, l, l,
      -l, l, -l,
      -l, l, -l,
      -l, -l, -l,
  // Front face
      -l, -l, l,
      l, -l, l,
      l, -l, l,
      l, l, l,
      l, l, l,
      -l, l, l,
      -l, l, l,
      -l, -l, l,
  // Back face
      -l, -l, -l,
      l, -l, -l,
      l, -l, -l,
      l, l, -l,
      l, l, -l,
      -l, l, -l,
      -l, l, -l,
      -l, -l, -l
    
]);

const wireframe_greometry = new THREE.BufferGeometry();
wireframe_greometry.setAttribute( 'position', new THREE.BufferAttribute( wireframe_vertices, 3 ) );
const line = new THREE.LineSegments( wireframe_greometry );


function translationMatrix(tx, ty, tz) {
	return new THREE.Matrix4().set(
		1, 0, 0, tx,
		0, 1, 0, ty,
		0, 0, 1, tz,
		0, 0, 0, 1
	);
}
// TODO: Implement the other transformation functions.
function rotationMatrixZ(theta) {
	return new THREE.Matrix4().set(
    Math.cos(theta), -Math.sin(theta), 0, 0,
    Math.sin(theta), Math.cos(theta), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1

	);
}
function scalingMatrix(sx, sy, sz) {
  return new THREE.Matrix4().set(
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1,
  );
}
let still = false;
window.addEventListener('keydown', onKeyPress); // onKeyPress is called each time a key is pressed





let cubes = [];
let cubes_wireframes = [];
for (let i = 0; i < 7; i++) {
  let cube = new THREE.Mesh(custom_cube_geometry, phong_material);
  let wireframe = new THREE.LineSegments(wireframe_greometry);

  cube.matrixAutoUpdate = false;
  wireframe.matrixAutoUpdate = false;

  cubes.push(cube);
  cubes_wireframes.push(wireframe);

  scene.add(cube);
  scene.add(wireframe);

  // Initially, show only the mesh cubes
  wireframe.visible = false;
}

let MAX_ANGLE = 20 * Math.PI/180 // 20 degrees converted to radians
let rotation_angle1 = 20*(Math.PI/180);
// Translate the cubes.
const translation = translationMatrix(0, 2*l, 0); // Translate 2l units in the y direction
let model_transformation = new THREE.Matrix4(); // model transformation matrix we will update
for (let i = 0; i < cubes.length; i++) {
	cubes[i].matrix.copy(model_transformation);
  cubes_wireframes[i].matrix.copy(model_transformation);
    model_transformation.multiplyMatrices(translation, model_transformation);

}
model_transformation = new THREE.Matrix4(); // Reset the model transformation matrix
// TODO: Transform cubes

//my for loop starts from cube 1, so I need to translate cube 0 to the origin first
//then other cubes rely on this cube
let scaling_cube_0 = scalingMatrix(1, 1.5, 1);
  model_transformation.multiplyMatrices(scaling_cube_0, model_transformation);

  cubes[0].matrix.copy(model_transformation);
  cubes_wireframes[0].matrix.copy(model_transformation);
let Inv_scaling_cube_0 = scalingMatrix(1, 1/1.5, 1);
  model_transformation.multiplyMatrices(Inv_scaling_cube_0, model_transformation);


for (let i = 1; i < 7; i++) {
  //we will translate the cube to the origin, rotate it, and then translate it to the correct position
  let scaling = scalingMatrix(1, 1.5, 1);
  model_transformation.multiplyMatrices(scaling, model_transformation);
 
 
  let trans1 = translationMatrix(l*1.5/2, l*1.5, 0);
  model_transformation.multiplyMatrices(trans1, model_transformation);

  let rotation1 = rotationMatrixZ(rotation_angle1);
  model_transformation.multiplyMatrices(rotation1, model_transformation);
 
  
  let trans2 = translationMatrix(-l*1.5/2, -l*1.5, 0);
  model_transformation.multiplyMatrices(trans2, model_transformation);

  
  let trans3 = translationMatrix(0, 2 * l * 1.5, 0);
  model_transformation.multiplyMatrices(trans3, model_transformation);

  cubes[i].matrix.copy(model_transformation);
  cubes_wireframes[i].matrix.copy(model_transformation);

  let Inv_scaling = scalingMatrix(1, 1/1.5, 1);
  model_transformation.multiplyMatrices(Inv_scaling, model_transformation);
  //we don't need to reset model_transformation because we are multiplying it with the previous result
  //the final transformation matrix is stored in model_transformation and keeps getting updated, and changes the axis reletively
  //that means each case depends on the previous case
}


let animation_time = 0;
let delta_animation_time;
let rotation_angle;
const clock = new THREE.Clock();


let T = 3 // oscilation persiod in seconds

function animate() {
    const delta_animation_time = clock.getDelta();
    
    if (!still) {
      animation_time += delta_animation_time;
    }

    const MAX_ANGLE = 10 * Math.PI / 180; // 20 degrees in radians
    const T = 3; // oscillation period in seconds
    const rotation_angle = MAX_ANGLE * Math.sin(2 * Math.PI * animation_time / T);

    let model_transformation = new THREE.Matrix4();
  

    for (let i = 1; i < cubes.length; i++) {
      //we will translate the cube the same way we did in the initialization
      if (!still) {  
      let scaling = scalingMatrix(1, 1.5, 1);
        model_transformation.multiplyMatrices(scaling, model_transformation);

        let trans1 = translationMatrix(l, l*1.5, 0);
        model_transformation.multiplyMatrices(trans1, model_transformation);
  

         if (rotation_angle >= 0) {
          let rotation = rotationMatrixZ(rotation_angle);
            model_transformation.multiplyMatrices(rotation, model_transformation);
         }else{
          let rotation = rotationMatrixZ(-rotation_angle);
          model_transformation.multiplyMatrices(rotation, model_transformation);
         }
      

        let trans2 = translationMatrix(-l, -l*1.5, 0);
        model_transformation.multiplyMatrices(trans2, model_transformation);
        

        // Apply translation and rotation
        let trans = translationMatrix(0,2* l * 1.5 , 0);
        model_transformation.multiplyMatrices(trans, model_transformation);

        

        //cubes[i].matrix.copy(model_transformation);
        cubes[i].matrix.copy(model_transformation);
        cubes_wireframes[i].matrix.copy(model_transformation);
        let Inv_scaling = scalingMatrix(1, 1/1.5, 1);
        model_transformation.multiplyMatrices(Inv_scaling, model_transformation);
      }
        
    }
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
// TODO: Add event listener
function onKeyPress(event) {
  switch (event.key) {
      case 's': // Note we only do this if s is pressed.
          still = !still;
          break;
      case 'w': // Toggle between wireframe and mesh view
        for (let i = 0; i < 7; i++) {
            cubes[i].visible = !cubes[i].visible;
            cubes_wireframes[i].visible = !cubes_wireframes[i].visible;
          }
          break;
      default:
          console.log(`Key ${event.key} pressed`);
  }
}