<script setup>
</script>

<template>
  <footer class="app-footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i>在线客服</dd>
          <dd><i class="iconfont icon-question"></i>问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i>公众号</dd>
          <dd><i class="iconfont icon-weibo"></i>微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode">
            <img
              src="@/assets/images/qrcode.jpg"
              style="width: 92px; height: 92px"
              alt=""
            />
          </dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;"></a>
          </dd>
        </dl>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  overflow: hidden;
  padding-top: 20px;
  .contact {
    .container {
      display: flex;
      justify-content: space-between;
      dl {
        dd {
          margin: 36px 12px 0 0;
          .iconfont {
            font-size: 16px;
            margin-right: 10px;
          }
          .qrcode {
            width: 92px;
            height: 92px;
            padding: 7px;
            border: 1px solid #ededed;
          }
          .download {
            font-size: 14px;
            width: auto;
            height: auto;
            border: none;
            margin:0;
            span {
              display: block;
            }
            a {
              display: block;
            }
            &:hover {
              color: none !important;
            }
          }
          &:hover {
            color: $xtxColor;
            
          }
        }
      }
    }
  }
}
</style>