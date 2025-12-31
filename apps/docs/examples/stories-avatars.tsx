"use client";

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
} from "@repo/stories";

const stories = [
  {
    id: 1,
    author: "Connor Love",
    avatar: "https://github.com/loveconnor.png",
    fallback: "CL",
  },
  {
    id: 2,
    author: "Thomas Raklovits",
    avatar: "https://github.com/monster0506.png",
    fallback: "TR",
  },
  {
    id: 3,
    author: "Charlie Cambell",
    avatar: "https://github.com/loveconnor.png",
    fallback: "CC",
  },
  {
    id: 4,
    author: "Owen Caudy",
    avatar: "https://github.com/loveconnor.png",
    fallback: "OC",
  },
];

const Example = () => (
  <div className="w-full max-w-4xl">
    <Stories>
      <StoriesContent className="justify-center">
        {stories.map((story) => (
          <Story className="aspect-square w-12 rounded-full p-0" key={story.id}>
            <StoryAuthor className="p-0">
              <span
                aria-hidden="true"
                className="inline-flex size-full rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-0.5"
              >
                <span className="inline-flex size-full rounded-full bg-white p-0.5">
                  <StoryAuthorImage
                    className="size-full"
                    fallback={story.fallback}
                    src={story.avatar}
                  />
                </span>
              </span>
            </StoryAuthor>
          </Story>
        ))}
      </StoriesContent>
    </Stories>
  </div>
);

export default Example;
