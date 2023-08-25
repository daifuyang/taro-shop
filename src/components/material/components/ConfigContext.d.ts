/// <reference types="react" />
export declare const ConfigContext: import("react").Context<{
    productListAction: any;
    productCategoryListAction: any;
    assetsURL: string;
    actionTo: any;
}>;
declare const ConfigProvider: ({ children, config }: {
    children: any;
    config?: any;
}) => JSX.Element;
export default ConfigProvider;
