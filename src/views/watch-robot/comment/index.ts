import {useStorage} from "@vueuse/core";

const selectedRobotType = ref<"normal" | "profession">("profession");
export const nowSelectedRobot = useStorage<"normal" | "profession">('selectedRobotType',selectedRobotType,sessionStorage);
export const catRobot = (value: "normal" | "profession") => {
    nowSelectedRobot.value = value;
}


const selectedTab = ref('BSC')
export const nowSelectedTab = useStorage('selectedTab',selectedTab,sessionStorage);
export const checkTab = (key: string) => {
    nowSelectedTab.value = key
}