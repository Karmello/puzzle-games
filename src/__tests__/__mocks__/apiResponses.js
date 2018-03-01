export const clientUserRes = {
  status: 200,
  statusText: 'OK',
  data: {
    _id: '5a968945e38de90c58cec77e',
    fb: {
      name: 'Kamil Karol Noga',
      id: '10211785274969732',
      avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p80x80/22154378_10210964618893843_9020869981138769508_n.jpg?oh=54b0f346b7bfbdbda768f3b19809b9d8&oe=5B44549F'
    }
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
      _id: '5a87561232ea8fc22a2d7a37',
      id: 'BossPuzzle',
      categoryId: 'sliding',
      name: 'Boss Puzzle',
      description: 'This is a sliding puzzle that consists of a frame of square tiles in random order with one tile missing. Also called Gem Puzzle or Mystic Square.',
      options: {
        mode: ['NUM', 'IMG'],
        dimension: ['3', '4', '5']
      }
    }
  ]
};