import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
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
    <article className={cn("companion-list", classNames)}>
      <h2 className="font-bold test-3xl">Recent Session</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              <TableCell>
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
                      <p className="text-lg">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionLists;
