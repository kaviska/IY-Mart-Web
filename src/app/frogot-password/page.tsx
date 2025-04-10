export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <p className="mb-4">Please enter your email address to reset your password.</p>
      <form className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}