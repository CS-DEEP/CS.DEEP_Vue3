// instruction: 各类公共接口文件

// function:通过图片url获取file对象
export async function getImageFileFromUrl(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

    // 使用 File 构造函数创建一个新的文件对象
    return new File([blob], fileName, {type: blob.type});
}

// function:时间戳转换
export function timestampToDateTimeString(timestamp: number): string {
    const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// function:计算字符串的字节长
export function getStringLengthOfChar(str: string): number {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
        // 判断字符是否为中文
        if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fff) {
            length += 2; // 中文字符长度为2
        } else {
            length += 1; // 英文字符长度为1
        }
    }
    return length;
}

// function:生成随机浅色系颜色
export function generateLightColor(): string {
    const hue = Math.floor(Math.random() * 360); // 随机选择色相
    const saturation = Math.floor(Math.random() * 40) + 60; // 随机选择饱和度（60-100）
    const lightness = Math.floor(Math.random() * 30) + 70; // 随机选择亮度（70-100）

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
}
