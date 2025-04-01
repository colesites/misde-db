"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const pastEventCards = past.map((pastEventCard, index) => (
    <Card key={pastEventCard.src} card={pastEventCard} index={index} />
  ));
  const upcomingEventcards = upcoming.map((upcomingEventcard, index) => (
    <Card key={upcomingEventcard.src} card={upcomingEventcard} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 id="past-events" className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Past Events
      </h2>
      <Carousel items={pastEventCards} />
      <h2 id="upcoming-events" className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Upcoming Events
      </h2>
      <Carousel items={upcomingEventcards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/yip.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const DummyContentTwo = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/eis.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const DummyContentThree = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-4">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/learn.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const past = [
  {
    category: "Tech",
    title: "YIP FOUNDERS' BOOTCAMP",
    src: "/yip.png",
    content: <DummyContent />,
  },
  {
    category: "Tech",
    title: "EKITI Innovation Summit",
    src: "/eis.png",
    content: <DummyContentTwo />,
  },
  {
    category: "Tech",
    title: "YIP FOUNDERS' BOOTCAMP",
    src: "/yip.png",
    content: <DummyContent />,
  },
  {
    category: "Tech",
    title: "EKITI Innovation Summit",
    src: "/eis.png",
    content: <DummyContentTwo />,
  },
];

const upcoming = [
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
  {
    category: "Tech",
    title: "Learn $1,000 worth of high demand skills",
    src: "/learn.png",
    content: <DummyContentThree />,
  },
];
