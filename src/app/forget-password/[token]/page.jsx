import ForgotPasswordArea from "@/components/fortgot-password/forgot-password-area";

export const metadata = {
  title: "Cuideo Bassil Home - Forget Password Page",
};

export default function ForgetPasswordPage({ params }) {
  return (
    <>
      <ForgotPasswordArea token={params.token} />
    </>
  );
}
