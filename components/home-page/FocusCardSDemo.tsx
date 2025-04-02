import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      titleOne: "H.E Biodun Abayomi Oyebanji",
      titleTwo: "Governor of Ekiti",
      titleThree: "Ekiti State Government",
      src: "/biodun.jpg",
    },
    {
      titleOne: "H.E Kayode Fayemi",
      titleTwo: "President",
      titleThree: "Forum of Regions of Africa",
      src: "/fayemi.jpg",
    },
    {
      titleOne: "H.C Seun Fakuade",
      titleTwo: "Commissioner, MISDE EKSG",
      titleThree: "Ekiti State Government",
      src: "/fakuade.jpg",
    },
    {
      titleOne: "Moruf Oseni",
      titleTwo: "M.D / C.E.O",
      titleThree: "Wema Bank",
      src: "/oseni.jpg",
    },
    {
      titleOne: "Nee-Joo Teh",
      titleTwo: "Head Global Alliance",
      titleThree: "Innovate UK Business Connect",
      src: "/nee-joo.jpg",
    },
  ];

  return <FocusCards cards={cards} />;
}
