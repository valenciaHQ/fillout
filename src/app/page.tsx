/** @format */

import FormDesigner from "@/components/FormDesigner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-white">
      <main className="flex flex-col max-w-6xl w-fullounded-lg shadow-lg p-8">
        <FormDesigner />
      </main>
    </div>
  );
}
