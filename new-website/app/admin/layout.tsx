import { AdminDataProvider } from "@/components/AdminDataProvider";
import { AdminLayout } from "@/components/AdminLayout";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDataProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminDataProvider>
  );
}
