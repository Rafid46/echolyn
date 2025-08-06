/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getSubjectColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompanionForm from "./CompanionForm";
import CompanionCard from "./CompanionCard";
import CompanionLists from "./CompanionLists";
import { useState } from "react";

const HomeClient = ({ companions, recentSessions }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <main>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Popular Companions</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg px-6 py-2 bg-primary_color cursor-pointer">
                <Plus size={14} />
                <p className="">Build a new companion</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Submit your companion
                </DialogTitle>
                <CompanionForm onSuccess={() => setOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <section className="home-section">
          {companions.map((companion: any) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
        <section className="home-section">
          <CompanionLists
            classNames="w-2/3 max-lg:w-full"
            title="Recently completed sessions"
            companions={recentSessions}
          />
          {/* <CTA /> */}
        </section>
      </main>
    </div>
  );
};

export default HomeClient;
