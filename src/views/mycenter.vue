<template>
  <div v-show="!eidtAddress">
    <div class="user-info-container">
      <!-- 个人信息 -->
      <div class="user-info-details">
        <!-- 头像 -->
        <el-upload
          action="http://localhost:8080/file/"
          :on-success="fileHandleSuccess"
          :file-list="imgFileList"
          accept="image/*"
        >
          <el-image
            style="width: 120px; height: 120px; border-radius: 10px"
            :src="userInfo.avatar"
            fit="contain"
          ></el-image>
        </el-upload>
        <!-- 编辑个人信息 -->
        <div class="user-info-details-text">
          <div class="user-info-details-text-nickname">
            {{ userInfo.nickname }}
          </div>
          <div class="user-info-details-text-time">
            {{ userInfo.signInTime }} 加入平台
          </div>
          <div class="user-info-details-text-edit">
            <el-button
              type="primary"
              plain
              @click="userInfoDialogVisible = true"
              >编辑个人信息</el-button
            >
            <el-dialog
              v-model="userInfoDialogVisible"
              @close="finishEdit"
              title="编辑个人信息"
              width="400px"
            >
              <el-form>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input
                    v-model="userInfo.nickname"
                    autocomplete="off"
                    @change="saveUserNickname"
                  >
                  </el-input>
                </el-form-item>

                <div v-if="userPasswordEdit">
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userPassword1" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="userPassword2" show-password></el-input>
                  </el-form-item>
                  <el-form-item
                    label="确认新密码"
                    :label-width="formLabelWidth"
                  >
                    <el-input v-model="userPassword3" show-password></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth">
                    <el-button @click="savePassword" plain>确认修改</el-button>
                    <el-button @click="cancelPassword" plain>取消</el-button>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input
                      type="password"
                      autocomplete="off"
                      value="123456"
                      show-password
                      :disabled="true"
                    >
                      <template #append>
                        <el-button
                          type="warning"
                          class="iconfont icon-edit"
                          @click="userPasswordEdit = true"
                          >编辑
                        </el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="userInfoDialogVisible = false"
                    >Cancel</el-button
                  >
                  <el-button
                    type="primary"
                    @click="userInfoDialogVisible = false"
                  >
                    完成
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </div>
        <!-- 编辑地址 -->
        <div class="user-info-splace">
          <el-button type="primary" plain @click="eidtAddress = true"
            >编辑收货地址</el-button
          >
        </div>
      </div>
      <div class="idle-container">
        <el-tabs
          type="border-card"
          @tab-click="handleClick"
          v-model="activeName"
        >
          <el-tab-pane label="我的订单" name="1"></el-tab-pane>
          <el-tab-pane label="我卖出的" name="2"></el-tab-pane>
          <el-tab-pane label="我的收藏" name="3"></el-tab-pane>
          <el-tab-pane label="我的发布" name="4"></el-tab-pane>
          <el-tab-pane label="我的下架" name="5"></el-tab-pane>
          <div class="idle-container-list">
            <div v-for="(item, index) in dataList[activeName - 1]">
              <div
                class="idle-container-list-item-detile"
                @click="toDetails(activeName, item)"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.imgUrl"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline">无图</i>
                  </div>
                </el-image>
              </div>
            </div>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
  <!-- 收货地址 -->
  <div v-show="eidtAddress" class="address">
    <el-page-header @back="eidtAddress = false" title="返回">
      <template #content>
        <span class="text-large font-600 mr-3"> 编辑地址 </span>
      </template>

      <div class="add-address">
        <div class="address-container-add-title">新增收货地址</div>
        <!-- 收货地址 -->
        <div>
          <el-input
            v-model="addressInfo.consigneeName"
            maxlength="10"
            placeholder="请输入收货地址"
            show-word-limit
            type="text"
          >
            <template #prepend>收货地址：</template>
          </el-input>
        </div>
        <!-- 手机号 -->
        <div class="telephone">
          <el-input
            v-model="addressInfo.consigneePhone"
            maxlength="11"
            placeholder="请输入手机号"
            show-word-limit
            type="text"
          >
            <template #prepend>手机号：</template>
          </el-input>
        </div>
        <!-- 省/市/区 -->
        <div class="sheng-shi-qu">
          <span>省/市/区</span>
          <el-cascader
            v-model="selectedOptions"
            :options="options"
            :props="props"
            @change="handleChange"
          />
        </div>
        <!-- 详细地址 -->
        <div class="address-detail">
          <el-input
            v-model="addressInfo.detailAddress"
            maxlength="50"
            placeholder="如道路、门牌号、小区、楼栋号等信息"
            show-word-limit
            type="text"
          >
            <template #prepend>详细地址:</template>
          </el-input>
        </div>
        <!-- 设置默认地址 -->
        <div class="default-address">
          <el-checkbox v-model="addressInfo.defaultFlag"
            >设置为默认地址</el-checkbox
          >
          <el-button style="margin-left: 20px" @click="save">保存</el-button>
        </div>
      </div>
      <div class="existed-address">
        <div class="address-container-add-title">已有收货地址</div>
        <el-table :data="addressData" style="width: 100%">
          <el-table-column
            fixed
            prop="consigneeName"
            label="收货人姓名"
            width="150"
          />
          <el-table-column prop="consigneePhone" label="手机号" width="120" />
          <el-table-column prop="detailAddressText" label="地址" width="270" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="editaddress(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="deleteaddress(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="是否默认地址" width="110">
            <template #default="scope">
              <el-button
                v-if="!scope.row.defaultFlag"
                size="mini"
                @click="handleSetDefault(scope.$index, scope.row)"
                >设为默认</el-button
              >
              <div v-else style="padding-left: 10px; color: #409eff">
                {{ scope.row.defaultAddress }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-page-header>
  </div>
</template>

<script>
import options from "../common/country-data.js";
import { ElMessageBox, ElSwitch } from "element-plus";
import { h, ref } from "vue";
export default {
  data() {
    return {
      // 用户信息
      userInfo: {
        accountNumber: "",
        avatar: "",
        nickname: "",
        signInTime: "",
      },
      // 收货地址
      addressInfo: {
        consigneeName: "",
        consigneePhone: "",
        provinceName: "",
        cityName: "",
        regionName: "",
        detailAddress: "",
        defaultFlag: false,
      },
      //已有收货地址
      addressData: [
        {
          consigneeName: "Tom",
          consigneePhone: "131111111",
          detailAddressText: "No. 189, Grove St, Los Angeles",
        },
      ],
      selectedOptions: [], //省市区
      userInfoDialogVisible: false,
      userPasswordEdit: false,
      formLabelWidth: "140px",
      userPassword1: "",
      userPassword2: "",
      userPassword3: "",
      activeName: "1",
      dataList: [[], [], [], []],
      eidtAddress: false,
      options: options,
    };
  },
  created() {
    if (!this.$globalData.userInfo.nickname) {
      this.$api.getUserInfo().then((res) => {
        if (res.status_code === 1) {
          res.data.signInTime = res.data.signInTime.substring(0, 10);
          console.log(res.data);
          this.$globalData.userInfo = res.data;
          this.userInfo = this.$globalData.userInfo;
        }
      });
    } else {
      this.userInfo = this.$globalData.userInfo;
      console.log(this.userInfo);
    }
  },
  mounted() {
    this.getAddressData();
    this.getIdleItemData();
    this.getMyOrder();
    this.getMySoldIdle();
    this.getMyFavorite();
  },
  methods: {
    finishEdit() {
      this.userInfoDialogVisible = false;
      // this.notUserNicknameEdit = false;
      this.userPasswordEdit = false;
    },
    cancelPassword() {
      // this.notUserNicknameEdit = false;
      this.userPasswordEdit = false;
    },
    //保存修改密码
    savePassword() {
      if (!this.userPassword1 || !this.userPassword2) {
        this.$message.error("密码为空！");
      } else if (this.userPassword2 === this.userPassword3) {
        this.$api
          .updatePassword({
            oldPassword: this.userPassword1,
            newPassword: this.userPassword2,
          })
          .then((res) => {
            if (res.status_code === 1) {
              this.userPasswordEdit = false;
              alert({
                message: "修改成功！",
                type: "success",
              });
              this.userPassword1 = "";
              this.userPassword2 = "";
              this.userPassword3 = "";
            } else {
              alert("旧密码错误，修改失败！");
            }
          });
      } else {
        alert("两次输入的密码不一致！");
      }
    },
    // 保存修改名字
    saveUserNickname() {
      // this.notUserNicknameEdit = true;
      this.$api
        .updateUserPublicInfo({
          nickname: this.userInfo.nickname,
        })
        .then((res) => {
          console.log(res);
          this.$globalData.userInfo.nickname = this.userInfo.nickname;
        });
    },
    handleClick(tab, event) {
      //   this.activeName=tab.name
      //   console.log(tab.paneName)
      this.activeName = tab.paneName;
    },
    // 我的订单
    getMyOrder() {
      this.$api.getMyOrder().then((res) => {
        if (res.status_code === 1) {
          console.log("getMyOrder", res.data);
          for (let i = 0; i < res.data.length; i++) {
            let pictureList = JSON.parse(res.data[i].idleItem.pictureList);
            this.dataList[0].push({
              id: res.data[i].id,
              imgUrl: pictureList.length > 0 ? pictureList[0] : "",
              idleName: res.data[i].idleItem.idleName,
              idleDetails: res.data[i].idleItem.idleDetails,
              timeStr:
                res.data[i].createTime.substring(0, 10) +
                " " +
                res.data[i].createTime.substring(11, 19),
              idlePrice: res.data[i].orderPrice,
              orderStatus: res.data[i].orderStatus,
            });
          }
        }
      });
    },
    // 我卖出的
    getMySoldIdle() {
      this.$api.getMySoldIdle().then((res) => {
        if (res.status_code === 1) {
          console.log("getMySoldIdle", res.data);
          for (let i = 0; i < res.data.length; i++) {
            let pictureList = JSON.parse(res.data[i].idleItem.pictureList);
            this.dataList[1].push({
              id: res.data[i].id,
              imgUrl: pictureList.length > 0 ? pictureList[0] : "",
              idleName: res.data[i].idleItem.idleName,
              idleDetails: res.data[i].idleItem.idleDetails,
              timeStr:
                res.data[i].createTime.substring(0, 10) +
                " " +
                res.data[i].createTime.substring(11, 19),
              idlePrice: res.data[i].orderPrice,
              orderStatus: res.data[i].orderStatus,
            });
          }
        }
      });
    },
    // 我的收藏
    getMyFavorite() {
      this.$api.getMyFavorite().then((res) => {
        console.log("getMyFavorite", res);
        if (res.status_code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            let pictureList = JSON.parse(res.data[i].idleItem.pictureList);
            this.dataList[2].push({
              favoriteId: res.data[i].id,
              id: res.data[i].idleItem.id,
              imgUrl: pictureList.length > 0 ? pictureList[0] : "",
              idleName: res.data[i].idleItem.idleName,
              idleDetails: res.data[i].idleItem.idleDetails,
              timeStr:
                res.data[i].createTime.substring(0, 10) +
                " " +
                res.data[i].createTime.substring(11, 19),
              idlePrice: res.data[i].idleItem.idlePrice,
            });
          }
        }
      });
    },
    // 我的发布+我的下架
    getIdleItemData() {
      console.log("123");
      this.$api.getAllIdleItem().then((res) => {
        console.log(res);
        if (res.status_code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].timeStr =
              res.data[i].releaseTime.substring(0, 10) +
              " " +
              res.data[i].releaseTime.substring(11, 19);
            let pictureList = JSON.parse(res.data[i].pictureList);
            res.data[i].imgUrl = pictureList.length > 0 ? pictureList[0] : "";
            if (res.data[i].idleStatus === 1) {
              this.dataList[3].push(res.data[i]);
            } else if (res.data[i].idleStatus === 2) {
              this.dataList[4].push(res.data[i]);
            }
          }
        }
      });
    },
    //城市改变
    handleChange(value) {
      this.addressInfo.provinceName = value[0];
      this.addressInfo.cityName = value[1];
      this.addressInfo.regionName = value[2];
      this.selectedOptions = [`${value[0]}`, `${value[1]}`, `${value[2]}`];
      console.log("123", this.selectedOptions);
    },
    // 新增地址
    addAdress() {
      this.$api
        .addAddress(this.addressInfo)
        .then((res) => {
          if (res.status_code === 1) {
            this.getAddressData();
            this.$message({
              message: "新增成功！",
              type: "success",
            });
            this.selectedOptions = [];
            this.addressInfo = {
              consigneeName: "",
              consigneePhone: "",
              provinceName: "",
              cityName: "",
              regionName: "",
              detailAddress: "",
              defaultFlag: false,
            };
          } else {
            this.$message.error("系统异常，新增失败！");
          }
        })
        .catch((e) => {
          this.$message.error("网络异常！");
        });
    },
    //更新地址
    updateAddress() {
      this.$api
        .updateAddress(this.addressInfo)
        .then((res) => {
          if (res.status_code === 1) {
            this.getAddressData();
            this.addressInfo = {
              consigneeName: "",
              consigneePhone: "",
              provinceName: "",
              cityName: "",
              regionName: "",
              detailAddress: "",
              defaultFlag: false,
            };
            this.selectedOptions = [];
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          } else {
            this.$message.error("系统异常，修改失败！");
          }
        })
        .catch(() => {
          this.$message.error("网络异常！");
        });
    },
    // 保存地址
    save() {
      if (this.addressInfo.id) {
        //保存编辑后的地址
        this.updateAddress();
        //将字段置空
      } else {
        if (this.addressData.length >= 5) {
          this.$message.error("已达到最大地址数量！");
        }
        //保存新增地址
        else this.addAdress();
      }
    },
    //
    //获得已有地址
    getAddressData() {
      this.$api.getAddress().then((res) => {
        if (res.status_code === 1) {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            data[i].detailAddressText =
              data[i].provinceName +
              data[i].cityName +
              data[i].regionName +
              data[i].detailAddress;
            data[i].defaultAddress = data[i].defaultFlag
              ? "默认地址"
              : "设为默认";
          }
          this.addressData = data;
        }
      });
    },
    //编辑地址
    editaddress(index, row) {
      //拷贝对象
      this.addressInfo = JSON.parse(JSON.stringify(row));
      //获得了row的id，用来判断是编辑还是新增
      console.log(this.addressInfo);
      this.selectedOptions = ["", "", ""];
      this.selectedOptions[0] = row.provinceName;
      this.selectedOptions[1] = row.cityName;
      this.selectedOptions[2] = row.regionName;
    },
    // 删除地址
    deleteaddress(index, row) {
      this.$api
        .deleteAddress(row)
        .then((res) => {
          if (res.status_code === 1) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.addressData.splice(index, 1);
            //当被删除的地址如果是默认地址，则将第一个设置为默认地址
            if (row.defaultFlag && this.addressData.length > 0) {
              this.addressData[0].defaultFlag = true;
              this.addressData[0].defaultAddress = "默认地址";
              this.update({
                id: this.addressData[0].id,
                defaultFlag: true,
              });
            }
          } else {
            this.$message.error("系统异常，删除失败！");
          }
        })
        .catch(() => {
          this.$message.error("网络异常！");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.existed-address {
  padding: 0 30px;
  .address-container-add-title {
    margin: 30px 0;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    color: $xtxColor;
  }
}
.address {
  min-height: 500px;
  padding: 10px 20px;
  .add-address {
    padding: 0 200px;
    .el-input-group {
      height: 40px;
    }
    .address-container-add-title {
      margin: 10px 0;
      margin-bottom: 20px;
      font-size: 20px;
      text-align: center;
      font-weight: 600;
      color: $xtxColor;
    }
    .telephone {
      margin-top: 20px;
    }
    .sheng-shi-qu {
      margin-top: 20px;
      span {
        padding: 10px;
      }
    }
    .address-detail {
      margin-top: 20px;
    }
    .default-address {
      margin-top: 20px;
    }
  }
}
.user-info-container {
  min-height: 500px;
}
.user-info-details {
  display: flex;
  align-items: center;
  height: 140px;
  margin: 20px 40px;
}
.user-info-details-text {
  margin-left: 20px;
}
.user-info-details-text-nickname {
  font-size: 26px;
  font-weight: 600;
  margin: 10px 0;
}
.user-info-splace {
  flex: 1;
  text-align: right;
  margin-right: 40px;
}
</style>