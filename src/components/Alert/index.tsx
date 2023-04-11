interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  return <div>{text}</div>;
};

export default Alert;
