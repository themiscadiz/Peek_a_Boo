
// ***********************

// ***********************
let loader;
let loaderImg;
let loaderDrop;

let model;
let IcoModel;
let dropModel;

var icosa;

let rotateMotion = 0;

let mixer;
const clock = new THREE.Clock();

function init() {


	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	// var enableFog = false;
	// if (enableFog) {
	// 	// scene.fog = new THREE.FogExp2(color, density);
	// 	scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	// }
	let boxSize = 1.25;
	var box = getBox(boxSize, boxSize, boxSize);
	var box2 = getBox(boxSize, boxSize, boxSize);
	var plane = getPlane(10);
	var pointLight = getPointLight(2);
	var sphere = getSphere(0.05);
	// var motion = animationFbx();

	var sphereFront = getSphere(0.1);

	plane.rotation.x = Math.PI / 2;
	plane.position.y = -.5;

	sphereFront.position.z = 2;
	box2.position.z = - 3;
	// box2.position.x = 1;
	box2.position.y = 0;
	// box2.rotation.y = 1.5;

	pointLight.position.y = 3;
	pointLight.position.x = 1;
	pointLight.position.z = 2.5;
	pointLight.intensity = 2;

	// gui.add(pointLight.position, 'y', 0, 10);
	// gui.add(pointLight.position, 'x', 0, 10);
	// gui.add(pointLight.position, 'z', 0, 10);
	// gui.add(pointLight, 'intensity', 0, 10);
	// gui.add(box.position, 'x', -3, 3);





	// scene.add(box);
	// scene.add(box2);

	scene.add(plane);
	// plane.add(box);
	scene.add(sphereFront);




	pointLight.add(sphere);
	scene.add(pointLight);

	plane.name = 'plane-1';
	box.name = 'box-1';
	box2.name = 'box-2';
	sphereFront.name = 'sphereFront-1';



	// ***********************


	// // function animationFbx(){
	// 	// model
	// 	const loader = new FBXLoader();
	// 	loader.load('/assets/models/Reacting.fbx', function (object) {

	// 		mixer = new THREE.AnimationMixer(object);

	// 		const action = mixer.clipAction(object.animations[0]);
	// 		action.play();

	// 		object.traverse(function (child) {

	// 			if (child.isMesh) {

	// 				child.castShadow = true;
	// 				child.receiveShadow = true;

	// 			}

	// 		});

	// 		object.position.z = -1;
	// 		object.position.x = 1;
	// 		object.position.y = -1;
	// 		object.scale.x = .10;
	// 		object.scale.y = .10;
	// 		object.scale.z = .10;

	// 		scene.add(object);

	// 	});

	// }

	// ***********************


	// static model

	// Load the GLTF space model
	loaderDrop = new THREE.GLTFLoader();
	loaderDrop.load(
		// resource URL
		'./assets/staticModel/drop.gltf',
		// onLoad callback: what get's called once the full model has loaded
		(gltf) => {
			dropModel = gltf.scene;

			dropModel.position.z = .60;
			dropModel.position.x = 0;
			dropModel.position.y = -.20;

			let scaleIcoModel = 5;
			dropModel.scale.set(scaleIcoModel, scaleIcoModel, scaleIcoModel);
			// dropModel.scale.x = scaleIcoModel;
			// dropModel.scale.y = scaleIcoModel;
			// dropModel.scale.z = scaleIcoModel;

			// model cast shadow
			gltf.scene.traverse(function (node) {

				if (node.isMesh) { node.castShadow = true; }

			});

			console.log("icosahedron is here: model");
			scene.add(gltf.scene);
		},
		// onProgress callback: optional function for showing progress on model load
		undefined,
		// onError callback
		(error) => {
			console.error(error);
		}
	);

	// ***********************



	// static model

	// Load the GLTF space model
	loaderImg = new THREE.GLTFLoader();
	loaderImg.load(
		// resource URL
		'./assets/staticModel/icosahedron.gltf',
		// onLoad callback: what get's called once the full model has loaded
		(gltf) => {
			IcoModel = gltf.scene;

			IcoModel.position.z = -3;
			IcoModel.position.x = 0;
			IcoModel.position.y = -0.50;

			let scaleIcoModel = 15;
			IcoModel.scale.x = scaleIcoModel;
			IcoModel.scale.y = scaleIcoModel;
			IcoModel.scale.z = scaleIcoModel;

			// icosa = scene.getObjectByName('IcoModel'); 

			// IcoModel.rotation.x = THREE.Math.degToRad(rotateMotion);

			gltf.scene.traverse(function (node) {

				if (node.isMesh) { node.castShadow = true; }

			});



			console.log("icosahedron is here: model");
			scene.add(gltf.scene);
		},
		// onProgress callback: optional function for showing progress on model load
		undefined,
		// onError callback
		(error) => {
			console.error(error);
		}
		
	);

	 

	// ***************************



	// Load the GLTF model
	loader = new THREE.GLTFLoader();
	// loader = new THREE.FBXLoader();
	loader.load(
		// FILE ORIGINAL
		// './assets/models/Spotted-Jelly.gltf',
		'./assets/models/Reacting Kid.glb',
		// './assets/models/AnyConv.com__Reacting.gltf',


		// onLoad callback: what get's called once the full model has loaded
		(gltf) => {
			model = gltf.scene;

			// model.scale.x = .25;
			// model.scale.y = .25;
			// model.scale.z = .25;

			// model.position.z = - 4;
			// model.position.x = - .50;

			let scaleModel = .01
			model.scale.x = scaleModel;
			model.scale.y = scaleModel;
			model.scale.z = scaleModel;

			model.position.z = - 4;
			model.position.x = 1.2;
			model.position.y = -.50;

			// setup the model animation
			// read more about animation here: 
			// https://threejs.org/docs/#manual/en/introduction/Animation-system
			// a mixer object controls the actual playback of the animation
			mixer = new THREE.AnimationMixer(gltf.scene);
			// the gltf animations array contains animtation clips for the model
			console.log(gltf.animations);
			gltf.animations.forEach((clip) => {
				const action = mixer.clipAction(clip);
				action.play(); // start playing each animation clip
			});

			scene.add(gltf.scene);
		},
		// onProgress callback: optional function for showing progress on model load
		undefined,
		// onError callback
		(error) => {
			console.error(error);
		}
	);



	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	// camera.position.x = 1;

	camera.position.x = 0;
	camera.position.y = 0.50;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0))

	var renderer = new THREE.WebGLRenderer();

	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);

	// background color of the scene with hex color in css
	renderer.setClearColor('#a9fce9');

	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);


	update(renderer, scene, camera, controls);

	return scene;


}



function getBox(w, h, d) {
	var geometry = new THREE.BoxGeometry(w, h, d);
	//replace new THREE.MeshBasicMaterial for new THREE.MeshPhongMaterial
	var material = new THREE.MeshPhongMaterial({
		color: '#808080'

	});

	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	//replace new THREE.MeshBasicMaterial for new THREE.MeshPhongMaterial
	var material = new THREE.MeshBasicMaterial({
		color: '#99ccff'

	});

	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;

	return mesh;
}


function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: '#8d27c4',
		side: THREE.DoubleSide

	});

	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getPointLight(intensity) {
	// color and intensity
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;
	return light;
}





function update(renderer, scene, camera, controls) {

	const delta = clock.getDelta();
	if (mixer) {
		// Update the animation mixer on each frame
		mixer.update(delta);
	}

	renderer.render(
		scene,
		camera

	);





	// **** change shapes position based on face position ****
	var boxPerspective = scene.getObjectByName('box-1');
	var boxPerspective2 = scene.getObjectByName('box-2');
	var sphereFront = scene.getObjectByName('sphereFront-1');
	

	// camera.position.set((globals.a * -1) * 4, globals.b * 4, 5);
	camera.position.set((globals.a * -1) * 4, .50, 5);



	controls.update();

	// rotateMotion += 0.001;
	// // console.log(rotateMotion);
	// icosa.rotation.set(THREE.Math.degToRad(rotateMotion), 0, 0);

		








	// call back function to create an animation
	requestAnimationFrame(function () {

		update(renderer, scene, camera, controls);

	})



}

// function scaleGroup(parentModel, scale) {
// 	for (const child of parentModel.children) {
// 		if (child.type === 'Group') {
// 			scaleGroup(child, scale);
// 		} else {
// 			console.log(child);
// 			child.scale.set(scale, scale, scale);
// 		}
// 	}
// }

// function addTextureToModel(textureToAdd) {
// 	model.traverse((child) => {
// 		if (child instanceof THREE.Mesh) {
// 			child.material.map = textureToAdd;

// 			// Probably need the lines below if you will change the texture after 
// 			// the model has been added to the scene
// 			// child.material.needsUpdate = true;
// 			// child.material.map.needsUpdate = true;
// 		}
// 	});
// }

var scene = init();