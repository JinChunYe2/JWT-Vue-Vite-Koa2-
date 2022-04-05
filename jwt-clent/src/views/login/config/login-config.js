// 编辑规则
export const rulesAccount = {
  username: [
    {
      required: true,
      message: "用户名是必填内容～",
      trigger: "blur",
    },
    {
      min: 3,
      max: 10,
      message: "用户名必须是3—10个字母或者数字~",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必填内容～",
      trigger: "blur",
    },
    {
      min: 3,
      message: "密码必须是3位以上的字母或者数字~",
      trigger: "blur",
    },
  ],
};
