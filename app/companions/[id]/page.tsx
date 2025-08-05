import { getCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import CompanionVoice from "../CompanionVoice";

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
    <main>
      <article className="flex rounded-border border-[#EBD6FB] justify-between p-6">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] justify-center rounded-lg max-md:hidden flex items-center"
            style={{
              backgroundColor: getSubjectColor(subject),
            }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2 mt-0 ml-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg max-sm:text-[12px] w-[80%] max-sm:w-[50%] truncate">
              {topic}
            </p>
          </div>
        </div>
        <p className="items-start text-xl max-sm:text-lg">{duration} minutes</p>
      </article>
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
