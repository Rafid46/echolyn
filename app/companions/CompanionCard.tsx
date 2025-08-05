"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  duration: number;
  color: string;
  subject: string;
  topic: string;
}

const CompanionCard = ({
  id,
  name,
  duration,
  color,
  subject,
  topic,
}: CompanionCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    setIsLoading(true);
    router.push(`/companions/${id}`);
  };

  return (
    <article
      className="companion-card !border-none"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <Button
          onClick={handleLaunch}
          disabled={isLoading}
          className="!bg-primary_color !py-[20px] rounded-xl cursor-pointer w-full justify-center"
        >
          {isLoading ? "Loading..." : "Launch Lesson"}
        </Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
