/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCompanions } from "@/lib/actions/companion.action";
import React from "react";
import CompanionCard from "./CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectFilter from "./SubjectFilter";
import SearchInput from "./SearchInput";

const CompanionsLibrary = async ({ searchparams }: any) => {
  const filters = await searchparams;
  const subjects = filters?.subject ? filters?.subject : "";
  const topics = filters?.topic ? filters?.topic : "";
  const companions = await getAllCompanions({ subjects, topics });
  console.log(companions);
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
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
