// Icon + title + text row used in the purple "Get in touch" panels. No client hooks,
// so server pages (e.g. /audit) can pass icon components to it directly.
export default function ContactItem({
  icon: Icon,
  title,
  body,
  children,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 size-6 shrink-0 text-white/90" strokeWidth={1.6} />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="mt-1 text-[15px] text-white/75">{body}</p>
        <div className="mt-3 text-[15px] font-semibold">{children}</div>
      </div>
    </div>
  );
}
