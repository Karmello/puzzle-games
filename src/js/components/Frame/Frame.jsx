import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { SquareTile } from 'js/components';
import './Frame.css';


const initDataLoopRuns = 1000;

export default class Frame extends Component {

  static initData(args) {

    const run = () => {

      let { dimension, hiddenTileCoords } = args;

      const tiles = Array.from({ length: dimension ** 2 }, (value, key) => key + 1);
      const tempHiddenTileCoords = { ...hiddenTileCoords };
    
      for (let i = 0; i < initDataLoopRuns; i++) {

        const allMovementCoords = Frame.findAllMovementCoords(hiddenTileCoords, dimension);
        const coordsToSwitchWith = allMovementCoords[Math.floor(Math.random() * allMovementCoords.length)];

        const index1 = Frame.coordsToIndex(hiddenTileCoords, dimension);
        const index2 = Frame.coordsToIndex(coordsToSwitchWith, dimension);

        const temp = tiles[index1];
        tiles[index1] = tiles[index2];
        tiles[index2] = temp;

        hiddenTileCoords = coordsToSwitchWith;
      }

      for (let i = 0; i < tiles.length; i++) {
        if (i + 1 === tiles[i]) {
          return Frame.initData({ dimension, hiddenTileCoords: tempHiddenTileCoords });
        }
      }

      return { tiles, hiddenTileCoords };
    }

    return new Promise((resolve, reject) => {

      try {
        resolve(run(args));
      
      } catch(ex) {
        reject(ex);
      }
    });
  }

  static findAllMovementCoords(targetCoords, dimension) {

    const possibleDestinationCoords = [
      { x: targetCoords.x - 1, y : targetCoords.y },
      { x: targetCoords.x + 1, y : targetCoords.y },
      { x: targetCoords.x, y : targetCoords.y - 1 },
      { x: targetCoords.x, y : targetCoords.y + 1 }
    ];

    const realDestinationCoords = [];

    for (let coords of possibleDestinationCoords) {
      if (coords.x >= 0 && coords.x <= dimension - 1 && coords.y >= 0 && coords.y <= dimension - 1) {
        realDestinationCoords.push(coords);
      }
    }

    return realDestinationCoords;
  }

  static coordsToIndex(coords, dimension) {

    return coords.x * dimension + coords.y;
  }

  static indexToCoords(index, dimension) {

    return {
      x: Math.floor(index/dimension),
      y: index % dimension
    }
  }
  
  render() {

    const { frame, imgSrc } = this.props;
    
    return (
      <div className={'Frame-' + frame.dimension}> {
      Array.from({ length: frame.dimension }, (v, k) => k).map((i) => (
        <Row key={i} className='Frame-row'> {
        Array.from({ length: frame.dimension }, (v, k) => k).map((j) => (
          <Col key={j} className='Frame-col'>
            <SquareTile {...this.props} imgSrc={imgSrc} row={Number(i)} col={Number(j)} />
          </Col>
        ))}</Row>
      ))}</div>
    );
  }
};