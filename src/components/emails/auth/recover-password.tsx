interface VerifyEmailProps {
  token: string;
}

export const RecoverPassword = ({ token }: VerifyEmailProps) => {
  return (
    <div>
      <p>Hi there,</p>
      <p>Click the link to reset your account password</p>
      <a
        className="bg-secondary-two p-5 text-black hover:bg-secondary-one"
        href={`${process.env.BASE_URL}/reset-password/?token=${token}`}
      >
        Reset your password
      </a>
      <p>
        This link will expire in 60 Minutes. If you did not request a password
        reset, you can safely ignore this email.
      </p>
      <p>Best,</p> <p>The Graceland Team</p>
    </div>
  );
};
