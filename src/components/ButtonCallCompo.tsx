import React, { useState } from 'react';

type Props = {
  compo: React.FunctionComponent;
  text: string;
};

const ButtonCallCompo: React.FC<Props> = ({ compo, text }) => {
  const [show, setShow] = useState(null);

  const handleClick = () => {
    if (compo !== null) setShow(compo);
  };

  return (
    <>
      <button onClick={() => handleClick()}>{text}</button>
      <div>{show}</div>
    </>
  );
};

export default ButtonCallCompo;
