<!-- @format -->

<template>
  <div class="FilesUpload">
    <!-- 上传单张图片 -->
    <el-upload
      v-if="!IsFiles"
      class="avatar-uploader"
      action="customize"
      ref="upload"
      :accept="accept"
      :on-progress="onProgress"
      :http-request="GetUploadFile"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :disabled="IsDisabled"
    >
      <div v-if="percent < 101 && percent > 0" class="progress-bar">
        <el-progress type="circle" :percentage="percent"></el-progress>
      </div>
      <img v-if="FilesPaths" :src="FilesPaths" class="avatar" />
      <div class="avatar-uploader-icon" v-else>
        <i class="el-icon-plus"></i>
        <p>上传文件</p>
      </div>
    </el-upload>
    <p v-if="IsPrompt" class="upload-img-txt">
      只支持
      <span v-for="item in acceptName" :key="item">{{ item }}</span> 格式
    </p>

    <!-- 上传多个文件 -->
    <el-upload
      v-if="IsFiles && !IsBtnUpload"
      class="avatar-uploader"
      action="customize"
      ref="upload"
      multiple
      list-type="picture-card"
      :http-request="GetUploadFile"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      :disabled="IsDisabled"
      :class="{hide: IsDisabled || (fileList && fileList.length == limit)}"
    >
      <div class="avatar-uploader-icon">
        <i class="el-icon-plus"></i>
        <p style="margin-top:8px">上传文件</p>
      </div>
      <div slot="file" slot-scope="{file}">
        <div class="file-infors">
          <dl>
            <dt>
              <!-- <img :src="filterFileType(file)" width="44" height="38" /> -->
              <i class="iconfont">{{ filterFileType(file) }}</i>
            </dt>
            <dd class="clearfix">
              <p>{{ file.name.split(".")[0] }}</p>
              <span>.{{ getFileType(file.name) }}</span>
            </dd>
          </dl>
          <div v-if="fixedProgress(file) < 101" class="progress-bar">
            <el-progress type="circle" :percentage="fixedProgress(file)"></el-progress>
          </div>
        </div>
        <span class="el-upload-list__item-actions">
          <span
            v-if="!getFileType(file.name, 'doc_docx_ppt_pptx')"
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" v-if="IsDisabled" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span class="el-upload-list__item-delete" v-if="!IsDisabled" @click="handleRemove(file, fileList)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <!-- 点击按钮上传文件 -->
    <el-upload
      v-if="IsFiles && IsBtnUpload"
      class="upload-demo"
      action="customize"
      ref="upload"
      multiple
      :http-request="GetUploadFile"
      :file-list="fileList"
      :show-file-list="showFileList"
      :limit="limit"
      :accept="accept"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      :disabled="IsDisabled"
      :class="{hide: IsDisabled}"
    >
      <el-button type="primary" :size="ButtonSize">
        <i v-if="IsIcon" class="el-icon-upload2"></i>
        {{ this.BtnText }}
      </el-button>
      <div v-if="showFileList" slot="file" slot-scope="{file}" v-popover:file-popover>
        <ul class="download-file-list">
          <li class="pointer" style="margin-right:0;">
            <i class="paperclip"></i>
            <span>{{ file.name }}</span>
            <el-popover class="files-el-popover" ref="file-popover" placement="right" width="50" trigger="click">
              <div class="files-operation">
                <p @click="handlePictureCardPreview(file)">查看</p>
                <p v-if="IsDisabled" @click="handleDownload(file)">下载</p>
                <p v-if="!IsDisabled" @click="handleRemove(file)">删除</p>
              </div>
            </el-popover>
          </li>
        </ul>
      </div>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <div class="text-c" v-if="dialogImageUrl">
        <img
          :src="dialogImageUrl"
          alt
          v-if="getFileType(dialogImageUrl) === 'png' || getFileType(dialogImageName) === 'png'"
        />
        <img
          :src="dialogImageUrl"
          alt
          v-if="getFileType(dialogImageUrl) === 'jpg' || getFileType(dialogImageName) === 'jpg'"
        />
        <embed
          :src="dialogImageUrl"
          type="application/pdf"
          style="width:1000px;height:500px;"
          v-if="getFileType(dialogImageUrl) === 'pdf' || getFileType(dialogImageName) === 'pdf'"
        />
        <video
          :src="dialogImageUrl"
          width="1000"
          height="500"
          v-if="getFileType(dialogImageUrl) === 'mp4' || getFileType(dialogImageName) === 'mp4'"
          controls
        >
          您的浏览器不支持 video 标签。
        </video>
        <iframe
          :src="'https://view.officeapps.live.com/op/view.aspx?src=' + dialogImageUrl"
          width="1000"
          height="500"
          frameborder="1"
          v-if="getFileType(dialogImageUrl, 'docx_xlsx') || getFileType(dialogImageName, 'docx_xlsx')"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {createFileDown} from "utils/index.js";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      dialogImageName: null,
      //文件路径
      FilesPaths: "",
      fileList: [],
      // 图片视频解析 imgpath,pdfpath,ideopath
      picUploadData: [],
      // // 视频路径字符串
      videoPaths: {},
      // pdf转图片路径字符串
      picPaths: {},
      // 文件类型图标

      fileTypeIcon: {
        doc: "&#xe608;",
        docx: "&#xe608;",
        xls: "&#xe607;",
        xlsx: "&#xe607;",
        jpg: "&#xe609;",
        png: "&#xe609;",
        pdf: "&#xe60a;",
        mp4: "&#xe605;",
        ppt: "&#xe606;",
        pptx: "&#xe606;"
      },
      acceptName: "",
      percent: 0, //单文件上传时展示进度
      uploadingFiles: {} //正在上传的文件
    };
  },
  created() {
    this.FilesPaths = this.filePath;
    console.log(this.FilesPaths, "filesPath");
    this.acceptName = this.accept.split(",");
    if (this.IsFiles) {
      //多文件
      // this.getFileList();
      // this.initPicUploadData();
      this.getInitData();
    }
  },
  props: {
    // 图片视频解析
    picUpload: {
      type: Boolean,
      default: false
    },
    // 图片路径
    picPath: {
      type: String,
      default: null
    },
    // 视频路径
    videoPath: {
      type: String,
      default: null
    },
    IsExcel: {
      type: Boolean,
      default: false
    },
    //文件路径
    filePath: {
      type: String,
      default: null
    },
    //是否显示提示
    IsPrompt: {
      type: Boolean,
      default: true
    },
    //是否禁用
    IsDisabled: {
      type: Boolean,
      default: false
    },
    //是否上传多个文件
    IsFiles: {
      //默认上传单张图片
      type: Boolean,
      default: false
    },
    //文件上传个数
    limit: {
      //默认为10个
      type: Number,
      default: 10
    },
    //文件上传类型
    accept: {
      type: String,
      default: ".jpg"
    },
    //是否点击按钮实现上传
    IsBtnUpload: {
      type: Boolean,
      default: false
    },
    IsIcon: {
      type: Boolean,
      default: true
    },
    //按钮文字描述
    BtnText: {
      type: String,
      default: "点击上传"
    },
    ButtonSize: {
      type: String,
      default: "mini"
    },
    // 是否展示file-list
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //判断文件上传类型
    beforeAvatarUpload(file) {
      const acceptArr = this.accept.split(",");
      const fileType = "." + this.getFileType(file.name);
      let isJPG = false;
      const isLt2M = file.size / 1024 / 1024 < 500;
      acceptArr.forEach((element) => {
        if (element === fileType) {
          isJPG = true;
        }
      });
      if (!isJPG) {
        this.$message.error(`上传文件只能是（${acceptArr}）格式!`);
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 500MB!");
      }
      return isJPG && isLt2M;
    },
    //获取文件类型
    getFileType(name, type) {
      let fileType = name.split(".")[name.split(".").length - 1].toLowerCase();
      if (!type) {
        return fileType;
      } else {
        return type.indexOf(fileType) > -1;
      }
    },
    // 根据文件类型展示图标
    filterFileType(file) {
      let type = this.getFileType(file.name);
      return this.fileTypeIcon[type];
    },
    //上传文件
    GetUploadFile(params) {
      // console.log(this.FilesPaths,this.fileList)
      if (!this.IsFiles) {
        // 单文件时清空已上传文件的filePaths
        this.FilesPaths = "";
      } else {
        params.file.percentage = 1;
        params.file.raw = params.file;
        this.fileList.push(params.file);
      }
      console.log(params.file);
      let CancelToken = axios.CancelToken;
      let cancel = new CancelToken(function executor(c) {
        params.file.cancel = c;
        // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
      });
      this.uploadingFiles[params.file.uid] = params.file; //记录正在上传的文件
      const Url = ""; // 文件上传url
      const file = params.file;
      let formData = new FormData();
      formData.append("fName", file);
      axios({
        url: Url,
        method: "Post",
        formData,
        headers: {
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarymS7TlCNHkMnROj3Y"
        },
        onUploadProgress: (progressEvent) => {
          let percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          // console.log(percent)
          //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
          params.onProgress({percent: percent});
          this.$forceUpdate();
        },
        cancelToken: cancel
      }).then((res) => {
        delete this.uploadingFiles[file.uid]; //清除该文件在正在上传的列表记录
        console.log("upload success:" + this.uploadingFiles);
        if (!res) {
          return;
        }
        if (this.IsFiles) {
          //上传多个文件，需要返回name和uid(name用来显示，uid用来进行删除)
          console.log(this.FilesPaths);
          this.getDisposePath(res.data.data, file.name, file.uid);
          this.getFileList();
          // 图片视频解析  特殊处理
          if (this.picUpload) {
            this.getPicUploadData(res.data.data, file.name, file.uid);
            this.getPicUploadUrl();
          }
        } else {
          this.FilesPaths = res.data.data;
        }

        if (this.FilesPaths) {
          this.getFilePath(this.FilesPaths);
        }
        // 隐藏进度
        params.onProgress({percent: 101}); //多文件
        this.percent = 0; //单文件
        this.$forceUpdate();
        this.$message({
          type: "success",
          message: res.data.msg
        });
      });
    },
    onProgress(event, file, fileList) {
      this.percent = Number(file.percentage.toFixed(0));
    },
    // 获取上传进度
    fixedProgress(file) {
      if (file.status == "success") {
        return 101;
      }
      return Number(file.percentage.toFixed(0));
    },
    //删除文件
    handleRemove(file, fileList) {
      if (file.status == "uploading") {
        //删除下载文件时 触发
        file.cancel();
      }
      fileList.forEach((element, index) => {
        if (element.uid == file.uid) {
          fileList.splice(index, 1);
          // 图片视频特殊处理
          this.picUploadData && this.picUploadData.length > 0 ? this.picUploadData.splice(index, 1) : "";
        }
      });
      this.fileList = fileList;
      this.getPicUploadUrl();
      this.FilesPaths = "";
      if (this.fileList.length > 0) {
        //删除操作之后重新拼接文件url集合
        this.fileList.forEach((element) => {
          if (element.url) {
            this.getDisposePath(element.url, element.name, element.uid);
          }
        });
        this.getFilePath(this.FilesPaths);
      } else {
        this.getFilePath(this.FilesPaths);
      }
    },
    // 编辑文件初始化
    async getInitData() {
      await this.getFileList();
      this.initPicUploadData();
    },
    //把文件url集合字符串转换为数组用来显示
    getFileList() {
      if (this.FilesPaths) {
        // console.log(this.FilesPaths)
        // let [ ...oldFileList ] = this.fileList;
        let newFileList = [];
        let fileList = null;
        let hasUid = this.FilesPaths.indexOf("uid") > -1;
        if (hasUid) {
          fileList = this.FilesPaths.match(/(http(s)?\:\/\/)?.*?uid\=\d+/g);
        } else {
          fileList = this.FilesPaths.split(",");
        }
        if (fileList && fileList.length > 0) {
          fileList.forEach((element, index) => {
            if (hasUid) {
              newFileList[index] = {
                url: element.split("?fileName=")[0],
                name: element.split("?fileName=")[1].split("?uid=")[0],
                uid: element.split("?uid=")[1]
              };
            } else {
              newFileList[index] = {
                url: element,
                name: element
              };
            }
          });
          for (let uid in this.uploadingFiles) {
            newFileList.push(this.uploadingFiles[uid]);
          }
          this.fileList = newFileList;
        }
      }
    },
    //拼接文件url字符串集合
    getDisposePath(url, name, uid) {
      //上传多个文件，文件url后面要加上name用来显示，uid用来进行删除
      if (url && typeof url == "object") {
        url = url.mainPath;
      }
      if (!this.FilesPaths) {
        this.FilesPaths = url + "?fileName=" + name + "?uid=" + uid;
      } else {
        this.FilesPaths += "," + url + "?fileName=" + name + "?uid=" + uid;
      }
    },
    // 编辑初始化图片视频数据
    initPicUploadData() {
      let picUploadData = [];
      if (this.videoPath) {
        let videoPath = JSON.parse(this.videoPath.replace(/\'/g, '"'));
        for (let key in videoPath) {
          let uploadItem = {};
          uploadItem[key] = {
            videoPath: videoPath[key],
            picPath: null
          };
          picUploadData.push(uploadItem);
        }
      }
      if (this.picPath) {
        let picPath = JSON.parse(this.picPath.replace(/\'/g, '"'));
        for (let key in picPath) {
          let uploadItem = {};
          uploadItem[key] = {
            picPath: picPath[key],
            videoPath: null
          };
          picUploadData.push(uploadItem);
        }
      }
      this.picUploadData = picUploadData;
      this.getPicUploadUrl();
    },
    // 图片视频数据返回处理
    getPicUploadData(data, name, uid) {
      let newData = {};
      newData[uid] = data;
      this.picUploadData.push(newData);
    },
    // 获取pdf图片、视频链接url拼接字符串
    getPicUploadUrl() {
      let videoPaths = {},
        picPaths = {},
        isVideo = false;
      if (this.picUploadData && this.picUploadData.length > 0) {
        this.picUploadData.forEach((element, index) => {
          for (let key in element) {
            if (element[key].videoPath) {
              videoPaths[key] = element[key].videoPath;
              isVideo = true;
            } else if (element[key].picPath) {
              picPaths[key] = element[key].picPath;
            }
          }
        });
      }
      this.videoPaths = JSON.stringify(videoPaths);
      this.picPaths = JSON.stringify(picPaths);
    },
    //查看文件
    handlePictureCardPreview(file) {
      console.log(file);
      let name = file.name;
      let index = name.lastIndexOf(".");
      let type = name.substring(index + 1);
      if (type == "doc" || type == "docx") {
        // window.open(file.url);
        this.handleDownload(file);
      } else {
        this.dialogImageUrl = file.url;
        this.dialogImageName = file.name;
        this.dialogVisible = true;
      }
    },
    //下载文件
    handleDownload(file) {
      CommonMethods.downloadFileByUrl.download(file.url, file.name);
    },
    //判断文件上传个数
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传 ${this.limit} 个文件！`);
    },
    //返回文件路径
    getFilePath(url) {
      if (this.picUpload) {
        let fileData = {
          url: url, //mainPath
          videoPath: this.videoPaths, //videoPath
          picPath: this.picPaths //pdfPath
        };
        this.$emit("getFilePath", fileData);
      } else {
        this.$emit("getFilePath", url);
      }
    },
    // 清空文件列表
    clearFiles() {
      this.$refs["upload"].clearFiles();
      this.FilesPaths = null;
      this.fileList = [];
      this.picUploadData = [];
    }
  },
  watch: {
    filePath(val) {
      this.FilesPaths = this.filePath;
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* project id 1740380 */
  src: url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.eot");
  src: url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.eot?#iefix") format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.woff") format("woff"),
    url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1740380_98uk29gzdtc.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss">
.el-upload--picture-card {
  width: 104px;
  height: 104px;
  background-color: #fafafa;
  border-color: 1px dashed #bec3d2;
  line-height: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  // i {
  //     font-size: 24px;
  //     color: #535D7E;
  // }
  > dl {
    dt {
      color: #000;
      font-size: 14px;
      line-height: 24px;
    }
    dd {
      color: #9da8b6;
      font-size: 12px;
      // -webkit-transform: scale(.84,.84);
      // *font-size:10px;
    }
  }
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 104px;
  height: 104px;
  background-color: #fafafa;
  border-color: #bec3d2;
  float: left;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>
<style lang="scss" scoped>
.file-infors {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  dl {
    width: 70%;
    margin: 0 auto;
    line-height: 12px;
    padding-top: 21px;
    dd {
      color: #3b5471;
      font-size: 14px;
      line-height: 20px;
      margin-top: 6px;
      p {
        width: 50%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
      span {
        float: left;
        width: 50%;
        text-align: left;
      }
    }
  }
}
.FilesUpload {
  .upload-img-txt {
    height: 22px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
  }
}
.files-operation {
  p {
    color: #4f5261;
    font-size: 14px;
    text-align: center;
    height: 28px;
    line-height: 28px;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:hover {
      color: #24a8ff;
      background: #f2f4fc;
    }
  }
}
</style>
<style scoped>
.upload-demo ::v-deep .el-upload-list > li {
  width: 140px !important;
  display: inline-block !important;
  outline: none;
}
.upload-demo ::v-deep .el-upload-list > li:hover {
  background-color: transparent !important;
}
.progress-bar {
  position: absolute;
  /* z-index: 10; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* height: 2px; */
  border-radius: 2px;
  background: #666;
}
::v-deep .progress-bar .el-progress--circle {
  width: 100%;
  height: 100%;
}
::v-deep .progress-bar .el-progress-circle {
  width: 100% !important;
  height: 100% !important;
}
::v-deep .progress-bar .el-progress--circle .el-progress__text {
  color: #f5f5f5;
}
::v-deep object html {
  height: 100%;
}
::v-deep object body {
  height: 100%;
}
</style>
