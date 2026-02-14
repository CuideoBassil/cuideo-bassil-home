import EmailVerifyArea from "@/components/email-verify/email-verify-area";

export const metadata = {
  title: "Cuideo Bassil Home - Email Verify Page",
};

export default async function EmailVerifyPage({ params }) {
  const { token } = await params;
  return (
    <>
      <EmailVerifyArea token={token} />
    </>
  );
}
