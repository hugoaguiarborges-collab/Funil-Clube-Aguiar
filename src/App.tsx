import CoverPage from "./components/CoverPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
      <div className="relative bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700 overflow-x-hidden">
        <CoverPage />
      </div>
    </div>
  );
}
