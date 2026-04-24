import { ClipLoader } from "react-spinners";

type SpinnerProps = {
  loading: boolean;
};

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ClipLoader color="#73AF6F" loading={loading} size={80} />
      <p className="mt-6 text-muted-foreground text-sm text-center text-[17px] font-semibold">
        This may take a moment. Please wait...
      </p>
    </div>
  );
};

export default Spinner;
