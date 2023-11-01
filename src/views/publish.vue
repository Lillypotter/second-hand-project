<style lang="scss" scoped>
.container {
  padding: 0 180px;
  height: 800px;
  .release-idle-container-title {
    font-size: 18px;
    padding: 30px 0;
    font-weight: 600;
    width: 100%;
    text-align: center;
  }
}
</style>

<template>
  <div class="release-idle-container-title">物品发布</div>
  <div class="container">
    <el-input
      v-model="idleItemInfo.idleName"
      maxlength="10"
      placeholder="请输入二手物品名称"
      show-word-limit
      type="text"
    />
    <div style="margin: 20px 0 0" />
    <el-input
      v-model="idleItemInfo.idleDetails"
      maxlength="30"
      placeholder="请输入物品的详细介绍"
      show-word-limit
      type="textarea"
    />
    <div style="margin: 20px 0 0">您的地区</div>
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="handleAddressChange"
      :separator="' '"
      style="width: 90%"
    />

    <div style="margin: 20px 0 0">物品类别</div>
    <el-select v-model="idleItemInfo.idleLabel" placeholder="请选择类别">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <div slot="prepend" style="margin: 20px 0 0">价格</div>
    <el-input-number
      v-model="idleItemInfo.idlePrice"
      :precision="2"
      :step="10"
      :max="10000000"
    >
    </el-input-number>

    <div class="release-idle-container-picture">
      <div
        class="release-idle-container-picture-title"
        style="margin: 20px 0 0"
      >
        上传二手物品照片
      </div>
      <el-upload
        action="http://localhost:8080/file"
        :headers="headers"
        :on-preview="fileHandlePreview"
        :on-remove="fileHandleRemove"
        :on-success="fileHandleSuccess"
        :show-file-list="showFileList"
        :limit="10"
        :on-exceed="handleExceed"
        accept="image/*"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div class="picture-list">
        <el-image
          style="width: 100px; height: 100px; margin-bottom: 2px"
          fit="contain"
          v-for="(img, index) in imgList"
          :src="img"
          :preview-src-list="imgList"
        ></el-image>
      </div>
      <el-dialog :visible.sync="imgDialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 30px;
      "
    >
      <el-button type="primary" plain @click="releaseButton"
        >确认发布</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import options from "../common/country-data.js";
import { UploadFilled } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import api from "../apis/index";
import axios from "axios";
import request from "../utils/request";
const text = ref("");
const textarea = ref("");
const options2 = ref([
  {
    value: 1,
    label: "数码",
  },
  {
    value: 2,
    label: "家电",
  },
  {
    value: 3,
    label: "户外",
  },
  {
    value: 4,
    label: "图书",
  },
  {
    value: 5,
    label: "其他",
  },
]);

const selectedOptions = ref([]);
const idleItemInfo = reactive({
  idleName: "",
  idleDetails: "",
  pictureList: "",
  idlePrice: 0,
  idlePlace: "",
  idleLabel: "",
});
//图片
const imgList = ref([]);
const dialogImageUrl = ref("");
const imgDialogVisible = ref(false);
const showFileList = ref(true);
const test = () => {
  api.getAllIdleItem().then((res) => {
    console.log(22, test);
  });
};
const handleHttprequest = (params) => {
  const formData = new FormData();
  formData.append("file", params.file);
  request({
    url: "/file",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  })
    .then((res) => {
      console.log("sucess");
    })
    .catch(() => {});
};
onMounted(() => {
  // console.log(options);
  // test();
});

//地区改变
const handleAddressChange = (value) => {
  console.log("value", value);
  idleItemInfo.idlePlace = value[0];
};
//图片预览
const fileHandlePreview = (file) => {
  console.log(file);
  dialogImageUrl.value = file.response.data;
  imgDialogVisible.value = true;
};
//上传成功
const fileHandleSuccess = (response, file, fileList) => {
  console.log("file:", response, file, fileList);
  imgList.value.push(response.data);
};
//移除图片
const fileHandleRemove = (file, fileList) => {
  console.log(file, fileList);
  for (let i = 0; i < imgList.value.length; i++) {
    if (imgList.value[i] === file.response.data) {
      imgList.value.splice(i, 1);
    }
  }
};

//确认发布
const releaseButton = () => {
  idleItemInfo.pictureList = JSON.stringify(imgList.value);
  if (
    idleItemInfo.idleName &&
    idleItemInfo.idleDetails &&
    idleItemInfo.idlePlace &&
    idleItemInfo.idleLabel &&
    idleItemInfo.idlePrice
  ) {
    // 都存在就确认发布
    api.addIdleItem(idleItemInfo)
      .then((res) => {
        if (res.status_code === 1) {
          console.log(res.data);
          // router.replace({
          //   path: "/details",
          //   query: { id: res.data.id },
          // });
        } else {
          alert("发布失败！" + res.msg);
        }
      })
      .catch((e) => {
        alert("请填写完整信息");
      });
  }else{
    alert("请填写完整信息");
  }
};
</script>
