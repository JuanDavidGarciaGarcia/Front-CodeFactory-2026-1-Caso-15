import { Suspense } from "react";
import VerifyContent from "./verifyContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin" /></div>}>
      <VerifyContent />
    </Suspense>
  );
}