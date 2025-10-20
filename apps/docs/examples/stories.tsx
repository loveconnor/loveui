"use client";

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryOverlay,
  StoryVideo,
} from "@repo/stories";

const stories = [
  {
    id: 1,
    author: "Connor",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    fallback: "CL",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=20",
  },
  {
    id: 2,
    author: "Thomas",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    fallback: "MO",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4#t=20",
  },
  {
    id: 3,
    author: "Nathan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    fallback: "N",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    author: "Tyler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    fallback: "TY",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    author: "Owen",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    fallback: "OW",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

const Example = () => (
  <Stories>
    <StoriesContent>
      {stories.map((story) => (
        <Story className="aspect-[3/4] w-[200px]" key={story.id}>
          <StoryVideo src={story.video} />
          <StoryOverlay />
          <StoryAuthor>
            <StoryAuthorImage
              fallback={story.fallback}
              name={story.author}
              src={story.avatar}
            />
            <StoryAuthorName>{story.author}</StoryAuthorName>
          </StoryAuthor>
        </Story>
      ))}
    </StoriesContent>
  </Stories>
);

export default Example;
