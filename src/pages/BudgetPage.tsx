import React, { useEffect } from 'react';
import { BudgetCalculatorSection } from '../components/BudgetCalculatorSection';

export const BudgetPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#d7dfd2] text-zinc-900 font-sans">
      <main className="mx-auto flex min-h-screen max-w-5xl items-start justify-center px-3 py-4 sm:px-6 sm:py-8">
        <BudgetCalculatorSection />
      </main>
    </div>
  );
};
