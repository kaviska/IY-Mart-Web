export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-blue-500 opacity-75 animate-ping"></div>
        <div className="absolute h-12 w-12 rounded-full bg-blue-600 animate-pulse"></div>
        <div className="relative h-8 w-8 rounded-full bg-blue-700"></div>
      </div>
    </div>
  );
}