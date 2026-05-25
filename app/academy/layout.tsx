import DashboardChrome from "@/components/dashboard/DashboardChrome";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
