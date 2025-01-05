// utils.ts 或其他合适的文件
export function getResource(path: string, filename: string,suffix:string = "/images/"): string | Promise<any> {
    try {
        // 构建资源的完整 URL
        const resourceUrl = new URL(`${suffix}${path}/${filename}`, import.meta.url);

        // 如果是图片文件，直接返回其 URL
        if (filename.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return resourceUrl.href;  // 返回绝对路径
        }

        // 如果是 JSON 文件
        else if (filename.match(/\.(json)$/)) {
            return fetch(resourceUrl.href)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to load resource');
                    }
                    return response.json();
                })
                .catch((error) => console.error("Failed to load resource:", error));
        }

        // 其他类型的文件
        else {
            console.error("Unsupported file type");
            return "";
        }
    } catch (error) {
        console.error("Error loading resource:", error);
        return "";
    }
}
