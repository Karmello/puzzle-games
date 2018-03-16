import { Component } from 'react';


export default class GameEngine extends Component {

  render() {
    return super.render();
  }

  static coordsToIndex (coords, dimension) {
    return coords.y * dimension + coords.x;
  }

  static indexToCoords (index, dimension) {
    return {
      x: index % dimension,
      y: Math.floor(index/dimension)
    }
  }
}