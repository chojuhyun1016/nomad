import { Meetup } from "@/types";

export const meetups: Meetup[] = [
  {
    date: "토 4/5",
    city: "서울",
    location: "강남",
    attendees: 12,
    avatarUrls: Array.from({ length: 6 }, (_, i) => `/images/avatars/avatar-${i + 1}.jpg`),
  },
  {
    date: "일 4/6",
    city: "제주",
    location: "애월",
    attendees: 5,
    avatarUrls: Array.from({ length: 3 }, (_, i) => `/images/avatars/avatar-${i + 4}.jpg`),
  },
  {
    date: "토 4/12",
    city: "부산",
    location: "해운대",
    attendees: 3,
    avatarUrls: Array.from({ length: 2 }, (_, i) => `/images/avatars/avatar-${i + 7}.jpg`),
  },
  {
    date: "토 4/19",
    city: "강릉",
    location: "안목해변",
    attendees: 8,
    avatarUrls: Array.from({ length: 4 }, (_, i) => `/images/avatars/avatar-${i + 2}.jpg`),
  },
  {
    date: "일 4/20",
    city: "전주",
    location: "한옥마을",
    attendees: 6,
    avatarUrls: Array.from({ length: 3 }, (_, i) => `/images/avatars/avatar-${i + 5}.jpg`),
  },
];
