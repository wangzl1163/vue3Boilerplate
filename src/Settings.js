const title = "****平台";

export default {
   title,
   titleSuffix: "-" + title,
   /**
    * 是否显示 tagsView
    */
   tagsView: true,
   /**
    * 是否固定头部
    */
   fixedHeader: false,
   // 加密 key
   aesKey: import.meta.env.AESKEY,
   // 加密 iv
   aesIv: import.meta.env.AESIV
};
