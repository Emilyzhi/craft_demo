import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { ReactElement,useEffect} from "react";
import type { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout=()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    // show login error when user not exist
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');

    if(errorParam){
        setError(true);
    } else{
      setError(false);
    }
    
  }, []);

  const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent the default action of form
    try {
      setIsLoading(true);
      await signIn('credentials', {
        email,
        password,
        callbackUrl:'/'});
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }, [email, password]);
  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-3 h-full">
          <div
            className="col-span-2 lg:col-span-2 items-center justify-center flex"
            style={{ backgroundImage: "url('/intuit.png')" }}
          ></div>
          <div className="items-center flex justify-center col-span-1 lg:col-span-1">
            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6"
                  action="#"
                  onSubmit={onSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        disabled={isLoading}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        disabled={isLoading}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      
                      disabled={isLoading}
                      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sign in  
                    </button>
                  </div>
                  
                </form>
                {isError&&<p className="mt-10 text-center text-sm text-gray-500">
                    User not exist, please contact
                    <a href="#" className="font-semibold leading-6 text-indigo-00 hover:text-indigo-500">{" system admin"}
                    </a>
                </p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// for different page layout
Login.getLayout = (page: ReactElement)=>{
    return (
        <div>{page}</div>
    )
}

export default Login
