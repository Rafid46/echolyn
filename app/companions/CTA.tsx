import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import icon from "../../public/icons/plus.svg";
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way</div>
      <h2 className="text-3xl font-bold">
        Build and personalize your learning companion
      </h2>
      <p>some description</p>
      <Image src="/images/cta.svg" alt="ff" width={362} height={232} />
      <Button className="btn-primary">
        <Image src={icon} alt="ff" width={12} height={12} />
        <Link href="/companions/new">
          <p className="">Build a new companion</p>
        </Link>
      </Button>
    </section>
  );
};

export default CTA;
