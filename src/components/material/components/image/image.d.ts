import * as React from 'react';
interface List {
    _BASE_URL?: string;
    src?: string;
    alt?: string;
    onClick?: any;
}
export interface ImageProps {
    __designMode?: string;
    type?: 'vertical' | 'swiper' | 'horizontal';
    list?: List[];
    boxShadow?: string;
    borderRadius?: string;
    pagePadding?: string;
    imagePadding?: string;
    imageMargin?: string;
}
declare const Image: React.FC<ImageProps>;
export default Image;
