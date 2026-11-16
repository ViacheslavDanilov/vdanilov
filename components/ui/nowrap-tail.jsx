// Keeps a trailing icon on the line of the text's last word
export default function NowrapTail({ text, children }) {
  const words = text.split(" ");
  const last = words.pop();
  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="whitespace-nowrap">
        {last}
        {children}
      </span>
    </>
  );
}
