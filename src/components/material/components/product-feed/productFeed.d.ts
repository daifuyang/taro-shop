export interface ProductFeed {
    __designMode: string;
    data: any[];
    itemKey?: string;
    initProductNum?: number;
    col?: 1 | 2;
    padding?: number | string;
    borderRadius?: number | string;
    thumb?: string;
}
declare const Index: (props: ProductFeed) => JSX.Element;
export default Index;
