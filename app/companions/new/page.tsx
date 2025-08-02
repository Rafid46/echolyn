import CompanionForm from "../CompanionForm";


const NewCompanion = () => {
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
