import Modal from "@/components/common/Modal";
import SignUpForm from "@/components/forms/signupform";
import LoginForm from "@/components/forms/loginform";
export default function Page() {
  return (
    <>
      <div className="flex flex-col h-screen;">
        <Modal
          className="top-0 right-0 p-5 mt-10 mr-10 text-2xl w-fit place-self-end rounded-xl"
          buttonName="Log In"
          modalName="signUpForm"
        >
          <LoginForm />
        </Modal>

        {/* Page title */}
        <div className="z-10 flex px-10;">
          <div className="mx-auto text-center h-fit">
            <h1>Basic Nextjs and Next-Auth login</h1>
          </div>
        </div>

        <Modal
          className="p-5 mx-auto mt-10 text-2xl w-fit rounded-xl"
          buttonName="Sign up today"
          modalName="logInForm"
        >
          <SignUpForm />
        </Modal>
      </div>
    </>
  );
}
