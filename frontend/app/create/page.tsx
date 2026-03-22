import CreateBountyForm from "../components/CreateBountyForm";
import GradientBlob from "../components/GradientBlob";

export default function CreatePage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-10 sm:px-6">
      <GradientBlob className="right-0 top-10 translate-x-1/4" variant="subtle" />
      <div className="relative mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Post a bounty
        </h1>
        <p className="mt-3 text-text-secondary">
          Define the task, set the reward, and pick a deadline. Only connected
          wallets can publish.
        </p>
      </div>
      <div className="relative mx-auto mt-12 max-w-xl">
        <CreateBountyForm />
      </div>
    </div>
  );
}
