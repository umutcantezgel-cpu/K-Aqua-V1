'use client';
import dynamic from 'next/dynamic';

const Co2Dashboard = dynamic(() => import('./Co2Dashboard'), { ssr: false });

export default function Co2DashboardWrapper() {
  return (
    <div className="co2-dashboard-root">
      <Co2Dashboard />
    </div>
  );
}
