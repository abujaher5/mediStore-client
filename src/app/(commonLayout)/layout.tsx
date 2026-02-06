import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <Navbar />
      <div className="min-h-[calc(100vh-764.51px)] ">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
