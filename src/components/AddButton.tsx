import React from 'react';
import { styleCircleButton } from '../params/_styles';

/**
 * AddButton props.
 */
export type AddButtonProps = React.ComponentPropsWithoutRef<'button'>;

/**
 * AddButton component.
 */
export const AddButton: React.VFC<AddButtonProps> = (props) => {
  return (
    <>
      <button {...props} className={styleCircleButton().AddButton}>
        +
      </button>
    </>
  );
};

export default AddButton;
