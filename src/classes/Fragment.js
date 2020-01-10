import { DoubleSide, MeshPhongMaterial, Mesh } from 'three';

export default class Fragment {
  constructor(position, velocity, g, dt) {
    this.velocity = velocity;
    this.velocity.multiplyScalar(dt);

    let material = new MeshPhongMaterial({
      side: DoubleSide,
      color: 0xffffff,
      emissive: 0xfafafa,
      emissiveIntensity: 0.4,
      shininess: 100,
      specular: 0x9d0a00,
      vertexColors: true
    });

    this.shape = new Mesh(g, material);
    this.shape.position.copy(position);
  }

  move(ADD) {
    this.shape.position.add(this.velocity);
    this.shape.rotation.x += ADD;
  }
}
