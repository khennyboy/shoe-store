const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-extrabold text-indigo-700">DeepSeek</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Only email registration is supported in your region. One DeepSeek
          account gives you access to all DeepSeek services.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-8 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6">
            {['Email address', 'Password', 'Confirm password', 'Code'].map((label, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="mt-1">
                  <input
                    type={label.includes('Password') ? 'password' : 'text'}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    required
                  />
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-500 text-center">
              By signing up, you consent to DeepSeek's <a href="#" className="text-indigo-600 hover:underline">Terms of Use</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="w-full border-t border-gray-300"></div>
              <div className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                Already have an account?
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>SIR:CPB2023025841E9 - <a href="#" className="text-indigo-600 hover:underline">Contact us</a></p>
      </footer>
    </div>
  );
};

export default SignUpPage;