<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> Notification</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="container">
          <el-tabs v-model="message">
            <el-tab-pane :label="`Draft${draft.length})`" name="first">
              <el-table :data="unread" :show-header="false" style="width: 100%">
                <el-table-column>
                  <template slot-scope="scope">
                    <span class="message-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="180"></el-table-column>
                <el-table-column width="120">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--          <div class="handle-row">-->
              <!--            <el-button type="primary">全部标为已读</el-button>-->
              <!--          </div>-->
            </el-tab-pane>
            <el-tab-pane :label="`Unread Msg(${unread.length})`" name="second">
              <el-table :data="unread" :show-header="false" style="width: 100%">
                <el-table-column>
                  <template slot-scope="scope">
                    <span class="message-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="180"></el-table-column>
                <el-table-column width="120">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="handle-row">
                <el-button type="primary">全部标为已读</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="`Read Msg(${read.length})`" name="third">
              <template v-if="message === 'third'">
                <el-table :data="read" :show-header="false" style="width: 100%">
                  <el-table-column>
                    <template slot-scope="scope">
                      <span class="message-title">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="150"></el-table-column>
                  <el-table-column width="120">
                    <template slot-scope="scope">
                      <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="danger">删除全部</el-button>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane :label="`Recycle(${recycle.length})`" name="fourth">
              <template v-if="message === 'fourth'">
                <el-table :data="recycle" :show-header="false" style="width: 100%">
                  <el-table-column>
                    <template slot-scope="scope">
                      <span class="message-title">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="150"></el-table-column>
                  <el-table-column width="120">
                    <template slot-scope="scope">
                      <el-button @click="handleRestore(scope.$index)">还原</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="danger">清空回收站</el-button>
                </div>
              </template>
            </el-tab-pane>
            <el-button style="float: right; padding: 3px 0" type="text" @click="drawerProp.addTaskDrawer = true">add
            </el-button>
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="14">
        <div class="container">
          <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
          </div>
          <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
          <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {quillEditor} from 'vue-quill-editor';
import bus from "@/components/common/bus";

export default {
  name: "Notification",
  data() {
    return {
      message: 'second',
      showHeader: false,
      draft: [],
      unread: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
      },
        {
          date: '2018-04-19 21:00:00',
          title: '今晚12点整发大红包，先到先得',
        }],
      read: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],
      recycle: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],

      content: '',
      editorOption: {
        placeholder: 'Hello World'
      },
    }
  },
  components: {
    quillEditor
  },
  methods: {
    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    },
    onEditorChange({editor, html, text}) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      this.$message.success('提交成功！');
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  },
  created() {
    this.collapse = !this.collapse;
    bus.$emit('collapse', this.collapse);
  }
}
</script>

<style scoped>
.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}

.container {
  height: 700px;
}

.editor-btn {
  margin-top: 20px;
}
</style>