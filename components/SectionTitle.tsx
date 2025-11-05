export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[--tbv-700]">{title}</h1>
      {subtitle && <p className="text-[--tbv-700]/70 mt-2">{subtitle}</p>}
    </div>
  );
}
