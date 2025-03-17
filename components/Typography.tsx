import clsx from 'clsx';
import { Text } from 'react-native';

const tags = {
    h1: "text-xl font-bold text-white",
    h2: "text-xs font-semibold text-light-200",
    p: "text-sm font-semibold",
    small: "text-[10px]",
    error: "text-sm text-red",
}

type TypographyProps = {
    tag?: keyof typeof tags;
    children: React.ReactNode;
    className?: string;
  };

const Typography = ({ tag = "p", className= " ", children }: TypographyProps) => {
  return (
    <Text className={clsx(tags[tag], className)}>
      {children}
    </Text>
  );
};

export default Typography;
