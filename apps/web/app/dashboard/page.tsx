'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';
import { Navbar } from '../../components/Navbar';

export default function DashboardPage() {
  const { user, isLoading, initialized, error } = useAuthStore();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (initialized && !isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, initialized, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-md text-red-600">
          An error occurred: {error}
        </div>
      </div>
    );
  }

  // If not initialized or no user, show loading
  if (!initialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome, {user.email}
            </h2>
            <p className="text-gray-600">
              This is your dashboard where you&apos;ll manage your research
              projects and applications.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
