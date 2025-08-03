/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@clerk/nextjs/server";
import CompanionForm from "../CompanionForm";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId }: any = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 flex items-center justify-center">
      <article>
        <h1 className="mb-5">Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
};

export default NewCompanion;
