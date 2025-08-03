import CompanionCard from "./companions/CompanionCard";
import CompanionLists from "./companions/CompanionLists";
import CTA from "./companions/CTA";

const Page = () => {
  const recentSessions = [
    {
      id: "1",
      subject: "science",
      name: "Neura the Brainy Explorer",
      topic: "Neural Network of the Brain",
      duration: 45,
      color: "#E5D0FF",
    },
    {
      id: "2",
      subject: "math",
      name: "Max the Math Magician",
      topic: "Mysteries of Multiplication",
      duration: 40,
      color: "#D0F0FF",
    },
    {
      id: "3",
      subject: "history",
      name: "Hera the History Guide",
      topic: "Ancient Egypt Adventures",
      duration: 50,
      color: "#FFD6D6",
    },
    {
      id: "4",
      subject: "language",
      name: "Lexi the Linguist",
      topic: "Exploring Word Origins",
      duration: 30,
      color: "#FFF6D0",
    },
    {
      id: "5",
      subject: "technology",
      name: "Techno the Coding Bot",
      topic: "Introduction to Algorithms",
      duration: 35,
      color: "#D0FFE1",
    },
    {
      id: "6",
      subject: "geography",
      name: "Geo the World Wanderer",
      topic: "Volcanoes and Earthquakes",
      duration: 42,
      color: "#E0D0FF",
    },
  ];

  return (
    <main>
      <p className="text-2xl font-semibold">Popular Companions</p>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="This is a chapter"
          topic="something"
          subject="science"
          duration={45}
          color="#239BA7"
        />
        <CompanionCard
          id="123"
          name="This is a chapter"
          topic="something"
          subject="science"
          duration={45}
          color="#EEEEEE"
        />
        <CompanionCard
          id="123"
          name="This is a chapter"
          topic="something"
          subject="science"
          duration={45}
          color="#7ADAA5"
        />
      </section>
      <section className="home-section">
        <CompanionLists
          classNames="w-2/3 max-lg:w-full"
          title="Recently completed sessions"
          companions={recentSessions}
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
