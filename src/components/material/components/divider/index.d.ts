import * as React from 'react';
export interface DividerProps {
    __designMode?: string;
    type: 'block' | 'border';
    height?: number;
    borderStyle?: string;
    borderColor?: string;
    padding?: string;
}
declare const Divider: React.FC<DividerProps>;
export default Divider;
