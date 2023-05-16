import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SubBtn = ({ children }: Props) => {
  return (
    <button className="sub-btn">
      <span className="sub-btn-top">{children}</span>
    </button>
  );
};

export default SubBtn;
