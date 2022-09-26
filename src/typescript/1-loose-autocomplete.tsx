type LooseAutoCompleteString<T extends string> = T | Omit<string, T>;

type Color = LooseAutoCompleteString<'primary' | 'secondary'>;

interface TextProps {
  color: Color;
}

const COLORS = {
  primary: 'blue',
  secondary: 'red',
};

export const Text = ({ color }: TextProps) => {
  return (
    <h3
      style={{
        color:
          color === 'primary'
            ? COLORS.primary
            : color === 'secondary'
            ? COLORS.secondary
            : color.toString(),
      }}
    >
      I am a header
    </h3>
  );
};

export default Text;

const Component = () => {
  return <Text color='green' />;
};

export { Component };

type THEME_COLOR = 'primary' | 'secondary' | string;

// type COLOR = THEME_COLOR | Omit<string, THEME_COLOR>;

// const c: Th = '';

type LooseAutoCompleteString2<T extends string> = T | Omit<string, T>;

type C = LooseAutoCompleteString2<'primary' | 'secondary'>;
