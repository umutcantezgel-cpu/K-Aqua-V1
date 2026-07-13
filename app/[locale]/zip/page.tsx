import { Metadata } from 'next';
import ZipGameClient from '../../../components/zip/ZipGameClient';

export const metadata: Metadata = {
  title: 'ZIP - The Puzzle Game | K-Aqua',
  description: 'Connect the pipes and solve the abstract neon puzzle. A K-Aqua mini-game.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ZipPage() {
  return <ZipGameClient />;
}
