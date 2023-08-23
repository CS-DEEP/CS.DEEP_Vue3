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
    const date = new Date(timestamp); // 将时间戳转换为毫秒

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

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// function:生成随机深色色系颜色
export function generateDarkColor(): string {
    const hue = Math.floor(Math.random() * 360); // 随机选择色相
    const saturation = Math.floor(Math.random() * 40) + 30; // 随机选择饱和度（60-100）
    const lightness = Math.floor(Math.random() * 30) + 10; // 随机选择亮度（70-100）

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// function:计算距今时间
export function getElapsedTime(timestamp: number): string {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - timestamp;

    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes < 1) {
        // 不到一分钟，显示刚刚
        return "刚刚";
    } else if (minutes < 60) {
        // 不到一小时，显示几分钟前
        return `${minutes} 分钟前`;
    } else if (minutes >= 60 && minutes < 1440) {
        // 超过一小时但不到一天，显示几小时前
        const hours = Math.floor(minutes / 60);
        return `${hours} 小时前`;
    } else {
        // 超过一天，显示几天前
        const days = Math.floor(minutes / 1440);
        return `${days} 天前`;
    }
}

// function:防抖函数
export function debounce(func, delay) {
    let timerId;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            func.apply(this, args);
            timerId = null;
        }, delay);
    };
}

