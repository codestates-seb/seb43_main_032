type Props = {
  select: string[];
  onModal?: () => void;
};

const SelectedStacks = ({ onModal, select }: Props) => {
  return (
    <ul onClick={onModal} className="select-tag-box">
      {select.map((x) => (
        <li key={x} className={`bg-${x}`}></li>
      ))}
    </ul>
  );
};

export default SelectedStacks;
