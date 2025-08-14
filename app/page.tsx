// import { getSubjectColor } from "@/lib/utils";
// import CompanionCard from "./companions/CompanionCard";
// import CompanionLists from "./companions/CompanionLists";
// import CTA from "./companions/CTA";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.action";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Plus } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import CompanionForm from "./companions/CompanionForm";
// import { useState } from "react";
import HomeClient from "./companions/HomeClient";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(10);
  return <HomeClient companions={companions} recentSessions={recentSessions} />;
};

export default Page;
