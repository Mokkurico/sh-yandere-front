import React from 'react';

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
      <button {...props} className="add-button">
        +
      </button>
      <style jsx>{`
        .add-button {
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 32px;

          width: 64px;
          height: 64px;
          border-radius: 32px;

          border: none;
        }
      `}</style>
    </>
  );
};

export default AddButton;
