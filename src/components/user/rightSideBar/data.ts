import { User } from "@/types/user";
import { NewsCardProps } from "./News";

export const newsItems: NewsCardProps[] = [
  {
    id: 1,
    topic: "Technology",
    dateTime: "4h ago",
    title: "AI Breakthrough in Natural Language Understanding",
    hashTag: "#AI",
    thumbnail:
      "https://media.cnn.com/api/v1/images/stellar/prod/2025-04-11t002945z-1033643131-rc2cvdaf55pc-rtrmadp-3-new-york-crash-helicopter.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
  },
  {
    id: 3,
    topic: "Sports",
    dateTime: "last night",
    title: "National Team Wins World Cup in Thrilling Final",
    hashTag: "#WorldCup",
    thumbnail:
      "https://english.news.cn/20221219/676c9ba6903645a7a4d99147cf0fe2c1/501d45a089584c1192b2f3dd08f2689b.jpg",
  },
];

export const recommendedFollowUsers: User[] = [
  {
    id: 1,
    displayName: "Alice Johnson",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    username: "alicej",
  },
  {
    id: 2,
    displayName: "Bob Smith",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    username: "bobsmith",
  },
  {
    id: 3,
    displayName: "Carol Lee",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    username: "carollee",
  },
];
