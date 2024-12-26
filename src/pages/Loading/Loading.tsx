import "./Loading.scss";

type TLoadingProps = {
  something: string;
};

const Loading = () => {
  return (
    <div className="🤚">
      <div className="👉" />
      <div className="👉" />
      <div className="👉" />
      <div className="👉" />
      <div className="🌴" />
      <div className="👍" />
    </div>
  );
};

export default Loading;
