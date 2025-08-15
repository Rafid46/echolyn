export default function Loading() {
  return (
    <div className="flex items-center justify-center mx-auto h-[70vh]">
      <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-28 md:h-28 h-26 w-26 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
      </div>
    </div>
  );
}
