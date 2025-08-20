// inputPath传进来的是地址
export default function resolveCodePath(inputPath:string) {
    // 如果是开发环境则在前面加 'public/'
    // 如果是正式环境则在前面加 'dist/'
    if (process.env.NODE_ENV === 'development') {
        return `public/${inputPath}`;
    } else {
        return `dist/${inputPath}`;
    }
}
