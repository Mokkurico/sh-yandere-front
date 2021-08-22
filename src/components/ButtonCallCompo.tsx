import React from 'react';

type Props = {
  onClick: () => void;
  text: string;
};

const ButtonCallCompo: React.FC<Props> = ({ onClick, text }) => {
  onClick();

  return (
    <>
      <button>{text}</button>
    </>
  );
};

export default ButtonCallCompo;
