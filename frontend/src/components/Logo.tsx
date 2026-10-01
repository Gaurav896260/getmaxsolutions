import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Logo({
  white = false,
  className = "",
  priority = false,
}: {
  /** White on purple backgrounds; brand purple otherwise. Animates between the two. */
  white?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SITE.logo}
      alt={SITE.name}
      width={1342}
      height={345}
      priority={priority}
      unoptimized
      className={`logo-tone h-auto ${white ? "logo-white" : ""} ${className}`}
    />
  );
}
