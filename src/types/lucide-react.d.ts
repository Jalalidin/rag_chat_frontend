declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const Send: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const User: FC<IconProps>;
  export const Bot: FC<IconProps>;
  export const FileText: FC<IconProps>;
} 