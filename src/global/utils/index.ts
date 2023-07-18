// instruction: 各类公共接口文件

// function: 页面自适应缩放
// use: 每个页面最外层div命名为page，在mounted钩子函数中调用此函数
export function scalePage() {
    let browserWidth = window.innerWidth; //浏览器可视宽度
    const baseWidth = 1850; //设计稿宽度
    let zoomValue = browserWidth / baseWidth; //缩放比例计算
    //page为主容器id
    document.getElementById("page").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
    //窗口尺寸变化时，重新计算和缩放
    window.onresize = function () {
        browserWidth = window.innerWidth;
        zoomValue = browserWidth / baseWidth;
        document.getElementById("page").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
    }
}

// function:通过图片url获取file对象
export async function getImageFileFromUrl(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

    // 使用 File 构造函数创建一个新的文件对象
    return new File([blob], fileName, {type: blob.type});
}

// function:将Promise<File>对象转为Promise<FormData>对象
export async function fileToFormData(filePromise: Promise<File>): Promise<FormData> {
    const formData = new FormData();
    const file = await filePromise;
    formData.append('avatar', file);
    return formData;
}
