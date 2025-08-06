import { getCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import CompanionVoice from "../CompanionVoice";
import { Clock } from "lucide-react";

interface companionSessionPageProps {
  name: string;
  subject: string;
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: companionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const { name, subject, topic, duration } = companion;
  const user = await currentUser();
  if (!user) return redirect("sign-in");
  if (!name) return redirect("/companions");
  return (
    <main className="p-4 sm:p-6">
      <article className="flex flex-wrap justify-between items-start  p-4 sm:p-6 gap-4">
        {/* Left section: Icon + info */}
        <div className="flex items-center gap-4 flex-1">
          {/* Subject icon */}
          <div
            className="hidden md:flex items-center justify-center rounded-lg size-[72px]"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-xl sm:text-2xl break-words">
                {name}
              </p>
              <div className="subject-badge hidden sm:block">{subject}</div>
            </div>
            {/* Topic text, handles long strings */}
            <p className="text-base sm:text-lg text-gray-600 break-words line-clamp-2">
              {topic}
            </p>
          </div>
        </div>

        {/* Right section: Duration */}
        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 whitespace-nowrap flex items-center gap-2">
          <Clock size={14} /> {duration} minutes
        </p>
      </article>

      {/* Voice companion */}
      <CompanionVoice
        {...companion}
        companionId={id}
        userName={user?.firstName}
        userImage={user?.imageUrl}
      />
    </main>
  );
};

export default CompanionSession;
