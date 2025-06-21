/** @format */

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-4">
      {children}
    </div>
  );
}
