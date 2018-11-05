export const clientUserRes = {
  status: 200,
  statusText: 'OK',
  data: {
    _id: '5a968945e38de90c58cec77e',
    username: 'Karmello',
    registeredAt: Date.now()
  }
};

export const gameCategoriesRes = {
  status: 200,
  statusText: 'OK',
  data: [
    {
      _id: '5a87561132ea8fc22a2d7a35',
      id: 'sliding',
      name: 'Sliding'
    }
  ]
};

export const gamesRes = {
  status: 200,
  statusText: 'OK',
  data: [
    {
      '_id' : '5a99f26993f76ce0991cb87e',
      'id' : 'boss-puzzle',
      'categoryId' : 'sliding',
      'name' : 'Boss Puzzle',
      'description' : 'This is a sliding puzzle that consists of a frame of square tiles in random order with one tile missing. Also called Gem Puzzle or Mystic Square.',
      'options' : {
        'mode' : [ 
          'NUM', 
          'IMG'
        ],
        'dimension' : [ 
          '3', 
          '4', 
          '5'
        ]
      },
      'info' : 'The aim of the game is to get all square tiles back in order, either so that the picture is restored or so that the numbers are in numerical order from left to right, top to bottom with the space at the bottom right.',
      'link' : 'https://en.wikipedia.org/wiki/15_puzzle'
    }
  ]
};