import { Post } from "@/types/post";
export const posts: Post[] = [
  {
    id: 1,
    author: {
      id: 101,
      fullName: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
      userName: "alicej",
      verified: true,
    },
    dateTime: "2025-04-11T08:30:00Z",
    content: "Excited to share my new project with you all! 🚀",
    likes: 120,
    views: 540,
    comments: 15,
  },
  {
    id: 1,
    author: {
      id: 101,
      fullName: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
      userName: "alicej",
      verified: true,
    },
    dateTime: "2025-04-11T08:30:00Z",
    content: "Excited to share my new project with you all! 🚀",
    likes: 120,
    views: 540,
    comments: 15,
  },
  {
    id: 2,
    author: {
      id: 102,
      fullName: "Brian Smith",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      userName: "briansmith",
    },
    dateTime: "2025-04-10T14:45:00Z",
    content:
      "Just finished reading a great book on software architecture. Highly recommend it!",
    likes: 76,
    views: 300,
    comments: 8,
  },
  {
    id: 3,
    author: {
      id: 103,
      fullName: "Carla Nguyen",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      userName: "carla.dev",
      verified: true,
    },
    dateTime: "2025-04-09T20:15:00Z",
    content:
      "TypeScript really makes JavaScript so much better. Changed my workflow entirely!",
    likes: 89,
    views: 412,
    comments: 12,
  },
  {
    id: 4,
    author: {
      id: 104,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      fullName: "David Kim",
      userName: "davidk",
    },
    dateTime: "2025-04-08T09:00:00Z",
    content: "Working on a new UI library. Anyone interested in collaborating?",
    likes: 55,
    views: 270,
    comments: 6,
  },
  {
    id: 5,
    author: {
      id: 105,
      fullName: "Ella Martinez",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      userName: "ellam",
      verified: true,
    },
    dateTime: "2025-04-07T17:20:00Z",
    content:
      "Thanks to everyone who attended my workshop today 🙌 Slides will be shared soon!",
    likes: 132,
    views: 620,
    comments: 21,
  },
];
