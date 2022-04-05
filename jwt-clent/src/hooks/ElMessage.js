// 引入ElMessage
import { ElMessage } from "element-plus";

const open1 = (data) => {
  ElMessage(data);
};
const open2 = (data) => {
  ElMessage({
    message: data,
    type: "success",
  });
};
const open3 = (data) => {
  ElMessage({
    message: data,
    type: "warning",
  });
};
const open4 = (data) => {
  ElMessage.error(data);
};

export { open1, open2, open3, open4 };
