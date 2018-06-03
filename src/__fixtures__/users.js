import type { User } from '../type'

export const users: User[] = [
  {
    id: 'a',
    name: 'tim',
    pic: {
      sad: require('../asset/image/avatar_1.png'),
      happy: require('../asset/image/avatar_1.png'),
      idle: require('../asset/image/avatar_1.png'),
    },
  },
  {
    id: 'b',
    name: 'jean luc',
    pic: {
      sad: require('../asset/image/avatar_2.png'),
      happy: require('../asset/image/avatar_2.png'),
      idle: require('../asset/image/avatar_2.png'),
    },
  },
  {
    id: 'c',
    name: 'jean luc',
    pic: {
      sad: require('../asset/image/avatar_3.png'),
      happy: require('../asset/image/avatar_3.png'),
      idle: require('../asset/image/avatar_3.png'),
    },
  },
]
