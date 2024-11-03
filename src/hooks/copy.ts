// 获取目标 DOM 元素
import {useClipboard} from "@vueuse/core";
import {Snackbar} from "@varlet/ui";

const {copy, isSupported} = useClipboard();

export const handleCopy = async (text:string) => {
    if (!isSupported) {
        Snackbar.error({
            content: "这是一个消息条！！",
            duration: 1000,
        })
        return;
    }
    await copy(text);
    Snackbar.success({
        content: "复制成功",
        duration: 1000,
    })
};
