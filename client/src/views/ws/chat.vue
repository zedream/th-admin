<template>
<div class="container">
  <div class="chat_wrap">
    <div class="friend_box">
      <div class="search_wrap">
        <div class="search_box">
          <i class="iconfont icon-fri_search"></i>
          <input type="text" class="search_input" v-model="searchInput">
          <i class="iconfont icon-fri_clear" v-show="searchInput.trim().length > 0" @click="searchInput = ''"></i>
        </div>
      </div>
      <div class="friend_list">
        <div class="friend" v-for="item in dataList" :key="item.username" @click="chooseFriend(item.id, item.username, item.avatar, item.nickname, item.online)">
          <div class="ava_box">
            <img class="avatar" :src="item.avatar">
          </div>
          <div class="content_box">
            <div class="centent_top">
              <div class="nickname" v-text="item.nickname"></div>
              <div class="time">
                <span :class="item.online === 1 ? 'online' : 'offline'"></span>
                <span>11:12</span>
              </div>
            </div>
            <div class="content_btm">
              <div class="content"></div>
              <div class="count" v-if="item.count > 0"><span v-text="item.count"></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat_box">
      <div class="friend_name_box" v-text="toNickname"></div>
      <div class="record_box">
        <div class="chat" v-for="(item, index) in receiveList" :key="`${index}${item.time}`">
          <div class="chat_row" v-if="item.from_id === userInfo.id">
            <div class="chat_box text_right">
              <div class="chat_time" v-text="item.time"></div>
              <div class="chat_content" v-text="item.content"></div>
            </div>
            <img class="chat_ava ml_16" :src="userInfo.avatar">
          </div>
          <div class="chat_row" v-else>
            <img class="chat_ava mr_16" :src="toAva">
            <div class="chat_box text_left">
              <div class="chat_time" v-text="item.time"></div>
              <div class="chat_content" v-text="item.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="input_box">
        <textarea class="textarea" v-model="sendInput"></textarea>
        <div class="send_box">
          <div class="send" @click="send">发送</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Alert from '@/document/alert'
import {
  mapState
} from 'vuex'
import {
  formatDate
} from '@/utils/util'
export default {
  data() {
    return {
      dataList: [],
      sendToSb: '',
      toNickname: '',
      toId: '',
      toAva: '',
      sendInput: '',
      searchInput: '',
      receiveList: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      socket: state => state.socket.socket
    })
  },
  watch: {
    searchInput(newVal) {
      this.getFriend(newVal)
    }
  },
  created() {
    this.getFriend()
    this.getAllRecord()
    this.socket.on('sendmessage', data => {
      this.rec = data
    })
    this.socket.on('privatechat', data => {
      this.getRecord()
      console.log(data)
    })
    this.socket.on('privatechaterror', data => {
      console.log(data)
    })
  },
  methods: {
    broadcast() {
      this.socket.emit('sendmessage', this.sendInput)
    },
    send() {
      if (this.toOnline === 1) {
        if (this.sendInput === '') {
          Alert('请输入发送内容')
        } else if (this.sendToSb === '') {
          Alert('请输入接收人')
        } else {
          this.socket.emit('privatechat', {
            fromId: this.userInfo.id,
            toId: this.toId,
            from: this.userInfo.username,
            to: this.sendToSb,
            msg: this.sendInput,
            time: new Date()
          })
          this.receiveList.push({
            from_id: this.userInfo.id,
            from: this.userInfo.username,
            to: this.sendToSb,
            msg: this.sendInput,
            content: this.sendInput,
            time: formatDate(new Date())
          })
          setTimeout(() => {
            this.sendInput = ''
          }, 100)
        }
      } else {
        Alert('用户不在线')
      }
    },
    chooseFriend(id, username, avatar, nickname, online) {
      this.sendToSb = username
      this.toId = id
      this.toOnline = online
      this.toNickname = nickname
      this.toAva = avatar
      this.sendInput = ''
      this.getRecord()
    },
    getRecord() {
      this.$store.dispatch('getChatRecord', {
        toId: this.toId
      }).then(res => {
        this.receiveList = res.data
      })
    },
    getAllRecord() {
      this.$store.dispatch('getAllRecord').then(() => {

      })
    },
    getFriend(nickname) { // 获取用户列表
      this.$store.dispatch('getUsers', {
        currentPage: 1,
        pageSize: 999,
        nickname: nickname
      }).then((res) => {
        this.dataList = res.data.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.chat_wrap {
  position: absolute;
  display: flex;
  align-items: center;
  height: 880px;
  width: 1000px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-radius: 12px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06);
  transform: translateY(-50%);
  top: 50%;
  background: #fbfbfb;

  .friend_box {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    position: relative;

    .search_wrap {
      padding: 12px;
      height: 60px;
      box-sizing: border-box;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fbfbfb;

      .search_box {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        background: #d8d7d7;

        .search_input {
          outline: none;
          border: none;
          padding: 0;
          height: 100%;
          text-indent: 8px;
          flex: 1;
          background: #d8d7d7;
          color: #888888;
        }

        .icon-fri_search {
          width: 36px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          font-size: 24px;
          color: #777777;
        }

        .icon-fri_clear {
          display: inline-block;
          width: 24px;
          height: 24px;
          font-size: 18px;
          line-height: 24px;
          text-align: center;
          color: #afafaf;
          cursor: pointer;
        }
      }
    }

    .friend_list {
      .friend {
        border-top: 1px solid #dedede;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        padding: 6px 12px;
        background: #f7f7f7;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          background: #e6e6e6;
        }

        &:active {
          background: white;
        }

        .ava_box {
          width: 80px;

          .avatar {
            width: 54px;
            height: 54px;
            border-radius: 50%;
          }
        }

        .content_box {
          flex: 1;
          display: flex;
          height: 100%;
          flex-direction: column;

          .centent_top {
            flex: 1;
            display: flex;
            align-items: center;

            .nickname {
              flex: 1;
              font-size: 17px;
              font-weight: 500;
              color: #4c4c4c;
            }

            .time {
              width: 60px;
              color: #bfbfbf;
              text-align: right;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .online {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #45b545;
                display: inline-block;
              }

              .offline {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                background: #9ba09b;
              }
            }
          }

          .content_btm {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .content {
              font-size: 15px;
              width: 150px;
              color: #bfbfbf;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }

            .count {
              width: 30px;
              color: white;
              text-align: right;

              span {
                display: inline-block;
                min-width: 16px;
                height: 16px;
                background: red;
                line-height: 16px;
                text-align: center;
                border-radius: 8px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  .chat_box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .friend_name_box {
      height: 60px;
      font-size: 20px;
      font-weight: 500;
      width: 100%;
      text-align: left;
      padding: 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #dedede;
      line-height: 36px;
    }

    .record_box {
      width: 100%;
      flex: 1;
      border-bottom: 1px solid #dedede;
      overflow-y: scroll;

      .chat {
        margin: 6px 0;
      }

      .chat_row {
        width: 100%;
        height: 40px;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .chat_box {
          display: flex;
          justify-content: space-between;
          height: 100%;

          .chat_time {
            font-size: 12px;
            flex: 2;
            color: #b1b1b1;
          }

          .chat_content {
            font-size: 16px;
            flex: 3;
          }
        }

        .text_right {
          align-items: flex-end;
        }

        .mr_16 {
          margin-right: 16px;
        }

        .ml_16 {
          margin-left: 16px;
        }

        .text_left {
          align-items: flex-start;
        }

        .chat_ava {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
    }

    .input_box {
      width: 100%;
      height: 180px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;

      .textarea {
        width: 100%;
        flex: 1;
        border: none;
        outline: none;
        resize: none;
        padding: 8px;
        box-sizing: border-box;
        border-bottom-right-radius: 12px;
        font-size: 16px;
        color: #717171;
      }

      .send_box {
        width: 100%;
        height: 32px;
        display: flex;
        justify-content: flex-end;
        line-height: 32px;

        .send {
          width: 80px;
          background: greenyellow;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          color: #807e7e;
        }
      }
    }
  }
}

// .msg_list {
//   width: 360px;
//   height: 600px;
//   overflow: auto;

//   .msg_box {
//     width: 100%;
//     height: 36px;
//     display: flex;
//     align_items: center;
//     justify_content: space_between;

//     .msg_content {}
//   }
// }
</style>
