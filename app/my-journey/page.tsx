/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import {
  CheckCircle2,
  GraduationCap,
  FlaskConical,
  Grid3x3,
  MessageSquareText,
  Code,
  ScrollText,
} from "lucide-react";
import { redirect } from "next/navigation";
import CompanionLists from "../companions/CompanionLists";

// 🔵 Main Page
const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getUserCompanions(user.id);
  const sessions = await getUserSessions(user.id);
  const stats = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      label: "Lessons Completed",
      value: sessions?.length,
      iconColor: "bg-red-500",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      label: "Companions Created",
      value: companions?.length,
      iconColor: "bg-orange-500",
    },
  ];
  // 🟢 Stat Card Component
  const StatsCard = ({ icon, label, value, iconColor }: any) => (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${iconColor}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );

  // 🟢 Lesson Card Component
  const LessonCard = ({
    icon: Icon,
    iconBg,
    title,
    topic,
    subject,
    duration,
  }: any) => (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Topic: {topic}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {subject}
        </p>
        <p className="text-xs text-gray-500">{duration}</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile + Stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-gray-300 dark:border-gray-700">
              <AvatarImage src={user?.imageUrl} alt="Adrian Hajdin" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {stats.map((item, index) => (
              <StatsCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Completed Lessons */}
        <Card className="rounded-xl border-[1px] border-gray-500 dark:border-gray-800">
          <CardContent className="p-4 sm:p-6 space-y-3 bg-[#fefeff]">
            <CompanionLists companions={sessions} title="Completed Sessions" />
          </CardContent>
        </Card>

        {/* Completed Lessons */}
        <Card className="rounded-xl border-[1px] border-gray-500 dark:border-gray-800">
          <CardContent className="p-4 sm:p-6 space-y-3">
            <CompanionLists companions={companions} title="My Sessions" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
