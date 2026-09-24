// A project page section with the accent-bar heading
export default function Section({
  title,
  headingClassName = "mb-4",
  children,
}) {
  return (
    <section>
      <h2
        className={`text-xl font-semibold text-light ${headingClassName} flex items-center gap-3`}
      >
        <span className="w-1 h-6 bg-accent rounded-full"></span>
        {title}
      </h2>
      {children}
    </section>
  );
}
