import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
  overrideStyles?: boolean;
  [key: string]: any;
};

const defaultStyles =
  "bg-orange px-8 rounded-lg flex items-center uppercase font-mono py-2 w-max tracking-wide font-medium hover:bg-[#ff7d4d] transition-all duration-300 active:bg-[#ff6c3d]";

export default function Button({
  children,
  className,
  href,
  overrideStyles = false,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={`${overrideStyles ? "" : defaultStyles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
