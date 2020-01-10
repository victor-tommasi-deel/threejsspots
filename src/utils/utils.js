import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  SpotLight,
  BoxGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  ConeGeometry,
  PlaneGeometry,
  SphereGeometry,
  Object3D
} from 'three';

const randomInRange = (from, to) => {
  const x = Math.random() * (to - from);
  return x + from;
};

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCube = () => {
  let w = randomInRange(5, 8);
  let h = randomInRange(5, 8);
  let d = randomInRange(5, 8);
  const geometry = new BoxGeometry(w, h, d);
  const material = MeshPhong({
    color: Math.random() * 0xffffff
  });
  const cube = new Mesh(geometry, material);
  cube.position.x = randomInRange(-20, 20);
  cube.position.z = randomInRange(-20, 20);
  return cube;
};

const createPlane = (width, height, dept) => {
  const geometry = new BoxGeometry(width, height, dept);
  const material = MeshPhong({ color: 0x693421, side: DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.position.y = -1;
  return plane;
};

const addToScene = (array, scene) => {
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.set(position.x, position.y, position.z);

  const spotLight1 = new SpotLight(0xffffff);
  spotLight1.position.set(15, 20, 10);
  spotLight1.angle = Math.PI / 20;
  spotLight1.penumbra = 0.05;
  spotLight1.decay = 2;
  spotLight1.distance = 200;

  const target1 = new Object3D();

  target1.position.set(20, 0, 0);
  spotLight1.target = target1;

  objs.push(spotLight1);
  objs.push(target1);

  const spotLight2 = new SpotLight(0xffffff, 1);
  spotLight2.position.set(-15, 20, 10);
  spotLight2.angle = Math.PI / 20;
  spotLight2.penumbra = 0.05;
  spotLight2.decay = 2;
  spotLight2.distance = 200;

  const target2 = new Object3D();
  target1.position.set(-10, 0, 0);
  spotLight2.target = target2;

  objs.push(spotLight2);
  objs.push(target2);

  addToScene(objs, scene);

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, target1, target2 };
};

export { init, createCube, createPlane };
