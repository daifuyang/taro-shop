import * as React from 'react';
export interface TypographyProps {
    __designMode?: string;
    title?: string;
    desc?: string;
    textAlign?: string;
    titleFontSize?: string;
    descFontSize?: string;
    titleFontWeight?: string;
    descFontWeight?: string;
    titleColor?: string;
    descColor?: string;
    backgroundColor?: string;
    divider?: boolean;
    showMore?: boolean;
}
declare const Typography: React.FC<TypographyProps>;
export default Typography;
