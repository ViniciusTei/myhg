import { AlertTriangle } from "lucide-react";

export default function Page() {

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
        <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-yellow-500" aria-hidden="true" />
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Under Construction</h1>
        <p className="mb-6 text-lg text-gray-600">
          We are working hard to bring you something amazing. Please check back soon!
        </p>
      </div>
    </div>
  )
}
