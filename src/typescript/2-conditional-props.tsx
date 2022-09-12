/*
interface AppInputProps {
  value: string;
  onChange: (value: string) => void;
  showSaveButton?: boolean;
  onSave?: () => void;
}

const AppInput = ({ value, onChange, showSaveButton, onSave }: AppInputProps) => {
  return (
    <div>
      <input type='text' value={value} onChange={(e) => onChange(e.target.value)} />

      {showSaveButton && onSave && <button onClick={onSave}>Save</button>}
    </div>
  );
};

export default AppInput;

export const Component = () => {
  return (
    <AppInput
      value='hello'
      onChange={(value) => console.log(value)}
      // showSaveButton
      //  onSave={() => console.log('saved')}
    />
  );
};
*/

type AppInputProps =
  | {
      type: 'normal';
      value: string;
      onChange: (value: string) => void;
      onSave?: never;
    }
  | {
      type: 'save';
      value: string;
      onChange: (value: string) => void;
      onSave: () => void;
    };

const AppInput = ({ value, onChange, type, onSave }: AppInputProps) => {
  return (
    <div>
      <input type='text' value={value} onChange={(e) => onChange(e.target.value)} />

      {type === 'save' && onSave && <button onClick={onSave}>Save</button>}
    </div>
  );
};

export default AppInput;

export const Component = () => {
  return (
    <>
      <AppInput value='hello' onChange={(value) => console.log(value)} type='normal' />
      <AppInput
        value='hello'
        onChange={(value) => console.log(value)}
        type='save'
        onSave={() => console.log('saved')}
      />
    </>
  );
};

// ---------------------------

export type Event =
  | {
      type: 'LOG_IN';
      payload: {
        userId: string;
      };
    }
  | {
      type: 'LOG_OUT';
    };

const sendEvent = <Type extends Event['type']>(
  ...args: Extract<
    Event,
    {
      type: Type;
    }
  > extends {
    payload: infer Payload;
  }
    ? [Type, Payload]
    : [Type]
) => {
  console.log(args);
};

// Correct
sendEvent('LOG_IN', {
  userId: '123',
});
sendEvent('LOG_OUT');

// Incorrect
sendEvent('LOG_IN', {
  userId: '123',
});
sendEvent('LOG_OUT');
