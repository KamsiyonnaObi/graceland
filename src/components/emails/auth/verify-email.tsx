interface VerifyEmailProps {
  token: string;
}

export const VerifyEmail = ({ token }: VerifyEmailProps) => {
  return (
    <div>
      <p>Hi there,</p>
      <p>
        Thank you for signing up for Graceland. Click on the link below to
        verify your email:
      </p>
      <a
        className="bg-secondary-two p-5 text-black hover:bg-secondary-one"
        href={`${process.env.BASE_URL}/email-confirm/?token=${token}`}
      >
        Verify your email
      </a>
      <p>
        This link will expire in 24 hours. If you did not sign up for a
        Graceland account, you can safely ignore this email.
      </p>
      <p>Best,</p> <p>The Graceland Team</p>
    </div>
  );
};
