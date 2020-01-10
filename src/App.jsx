import React from 'react';
import { init, createCube, createPlane } from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.01,
      renderer: null,
      scene: null,
      camera: null,
      target1: null,
      target2: null
    };
  }

  componentDidMount = () => {
    let cubes = [];
    for (let i = 1; i <= 10; i += 1) {
      cubes.push(createCube());
    }
    const plane = createPlane(2000, 1, 2000);
    const start = init([plane, ...cubes], { x: 0, y: 10, z: 20 });
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, target1, target2 } = start;
    this.setState({
      renderer,
      scene,
      camera,
      target1,
      target2
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, target1, target2 } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      target1 !== null &&
      target2 !== null
    ) {
      target1.position.x -= ADD;
      target2.position.x += ADD;
      if (target1.position.x < -20 || target1.position.x > 20) {
        this.setState({
          ADD: ADD * -1
        });
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div ref="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
