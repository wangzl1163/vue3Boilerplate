/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-02-25 11:32:00
 * @LastEditTime: 2022-12-21 16:46:36
 * @LastEditors: 王占领
 */
const title = "大数据共享交换平台";

export default {
   title,
   titleSuffix: "-" + title,
   theme: "light",
   /**
    * 是否显示 tagsView
    */
   tagsView: false,
   /**
    * 是否固定头部
    */
   fixedHeader: false,
   /** 菜单展开的最小分辨率 */
   sidebarOpenedMinWidth: 1280,
   // 加密 key
   aesKey: import.meta.env.AESKEY,
   // 加密 iv
   aesIv: import.meta.env.AESIV
};
