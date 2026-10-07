/**
 * Page transition: a template re-mounts on navigation, so each page plays a
 * short CSS fade. No JavaScript involved, so content is never held back.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="rise">{children}</div>;
}
