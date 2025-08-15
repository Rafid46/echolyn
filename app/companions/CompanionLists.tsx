import { cn, getSubjectColor } from "@/lib/utils";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface companionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}
const CompanionLists = ({
  title,
  companions,
  classNames,
}: companionListProps) => {
  return (
    <article className={cn("mb-5", classNames)}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {companions?.map(({ id, subject, name, topic, duration }) => (
        <Link key={id} href={`/companions/${id}`}>
          <div
            key={id}
            className="flex justify-between items-start mt-5 gap-4 bg-[#fefeff] rounded-lg p-4 w-full lg:w-[1100px]"
          >
            {/* Left section: Icon + info */}
            <div className="flex items-center gap-4 flex-1">
              {/* Subject icon */}
              <div
                className="hidden md:flex items-center justify-center p-8 rounded-lg"
                style={{ backgroundColor: getSubjectColor(subject) }}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={50}
                  height={50}
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
          </div>
        </Link>
      ))}
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              <TableCell className="overflow-x-hidden">
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        backgroundColor: getSubjectColor(subject),
                      }}
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                    >
                      <Image
                        alt="subject"
                        src={`/icons/${subject}.svg`}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{name}</p>
                      <p className="text-lg truncate">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {subject}
                </div>
                <div
                  style={{
                    backgroundColor: getSubjectColor(subject),
                  }}
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                >
                  <Image
                    alt="subject"
                    src={`/icons/${subject}.svg`}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end w-full gap-2">
                  <p className="text-2xl ">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image
                    className="md:hidden"
                    src="/icons/clock.svg"
                    alt="sub"
                    width={14}
                    height={14}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </article>
  );
};

export default CompanionLists;
