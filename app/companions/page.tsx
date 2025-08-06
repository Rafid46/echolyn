/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCompanions } from "@/lib/actions/companion.action";
import React from "react";
import CompanionCard from "./CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectFilter from "./SubjectFilter";
import SearchInput from "./SearchInput";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters?.subject ? filters?.subject : "";
  const topic = filters?.topic ? filters?.topic : "";
  const companions = await getAllCompanions({ subject, topic });
  console.log(companions);
  return (
    <main className="mb-5">
      <div className="flex items-center justify-between">
        <h1>Companion Library</h1>
        <SearchInput />
        {/* <SubjectFilter /> */}
      </div>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <section className="companions-grid">
          {companions?.map((companion: any) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default CompanionsLibrary;
