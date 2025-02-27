
import { Header } from '@/components/home/Header';
import { ClientLogos } from '@/components/home/ClientLogos';
import { CompanyStats } from '@/components/home/CompanyStats';
import { BlogPosts } from '@/components/home/BlogPosts';
import { Testimonials } from '@/components/home/Testimonials';
import { Footer } from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ClientLogos />
      <CompanyStats />
      <BlogPosts />
      <Testimonials />
      <Footer />
    </div>
  );
}
