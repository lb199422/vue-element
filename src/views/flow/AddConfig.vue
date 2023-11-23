<template>
  <div>
    <CommonDrawer
      ref="yb-drawer"
      :size="size"
      :title="title"
      :show-btn="showButton"
      @cancel="close"
      @save="save"
      @opened="opened"
      :destroy-on-close="true"
    >
      <div class="add-config">
        <!-- 头部 -->
        <!-- <div class="tool-bar"></div> -->
        <!-- 中间内容 -->
        <div class="main">
          <div class="main-left">
            <div
              :class="item.type"
              class="graphics"
              v-for="(item, index) in templateList"
              :key="index"
              @click="addGraphics(item.type)"
            ></div>
          </div>
          <!-- 容器 -->
          <div class="main-center panel-body points flow_chart" id="flow">
            <!-- 根据数据生成节点 -->
            <div
              :ref="item.id"
              v-for="item in nodes"
              :key="item.id"
              :id="item.id"
              :class="`${item.type} graphics item`"
              @click="itemClick(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="main-right">
            <div v-if="itemData && Object.keys(itemData).length">
              <el-form ref="form" :model="itemData">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="itemData.name" placeholder="请输入">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </CommonDrawer>
  </div>
</template>

<script>
import CommonDrawer from '@/components/CommonDrawer.vue';
import {
  ready,
  newInstance,
  // BezierConnector,
  EVENT_CONNECTION_CLICK,
  FlowchartConnector,
  DotEndpoint,
} from '@jsplumb/browser-ui';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    CommonDrawer,
  },
  data() {
    return {
      currentType: '',
      size: '100%',
      showButton: true,
      templateList: [
        {
          type: 'rectangle',
        },
        {
          type: 'round',
        },
        {
          type: 'oval',
        },
        {
          type: 'parallelogram',
        },
      ],
      itemData: {},
      graphicsList: [],
      jsplumbInstance: null,
      nodes: [],
      lines: [],
    };
  },
  computed: {
    title() {
      let res = '';
      switch (this.currentType) {
        case 'view':
          res = '查看';
          break;
        case 'add':
          res = '新增';
          break;
        case 'edit':
          res = '编辑';
          break;
      }
      return res;
    },
  },
  methods: {
    show(config) {
      let { type, data } = config;
      console.log(type, data);
      this.currentType = type;
      this.$refs['yb-drawer'].show();
    },
    save() {
      this.addGraphics();
      this.jsplumbInstance.repaintEverything();
      // deleteEveryConnection() 删除所有连接
    },
    close() {
      this.$refs['yb-drawer'].close();
    },
    opened() {
      console.log('opened');
      ready(() => {
        this.createFlow(this.flowData);
      });
    },
    createFlow() {
      const instance = newInstance({
        container: document.getElementById('flow'),
        connector: {
          type: FlowchartConnector.type,
        },
        maxConnections: -1,
        // endpoint: {
        //   type: DotEndpoint.type,
        //   source: true,
        //   target: true,
        //   options: {
        //     radius: 6,
        //     cssClass: 'test',
        //   },
        // },
        endpointStyle: { fill: '#00aaaa', radius: 5, stroke: '#aab7c4' },
        endpointHoverStyle: { fill: '#00aaaa' },
        paintStyle: { strokeWidth: 2, stroke: '#00aaaa' },
        hoverPaintStyle: null,
        dragOptions: { cursor: 'pointer', zIndex: 5000 },
        connectionOverlays: [
          {
            type: 'Arrow',
            options: { location: 1, length: 8, width: 8 },
          },
          {
            type: 'Label',
            options: {
              label: 'foo',
              location: 0.5,
              id: 'test',
              events: {
                click: (e, o) => {
                  console.log(e, o);
                  // 删除
                  // connect.removeOverlay(e.overlay.id);
                },
              },
            },
          },
        ],
      });
      this.jsplumbInstance = instance;
      instance.batch(() => {});
      // 监听连接点击事件
      instance.bind(EVENT_CONNECTION_CLICK, (p) => {
        console.log(p);
        // this.jsplumbInstance.deleteConnection(p);
      });
    },
    // 添加图形
    addGraphics(type) {
      let id = uuidv4();
      let node = {
        id,
        label: '',
        location: {
          left: 10,
          top: 10,
        },
        type,
      };
      this.nodes.push(node);
      this.$nextTick(() => {
        let ele = document.getElementById(id);
        this.jsplumbInstance.addEndpoint(ele, {
          anchor: 'Left',
          endpoint: {
            type: DotEndpoint.type,
            options: {
              radius: 6,
              cssClass: 'test',
            },
          },
          source: true,
          target: true,
        });
        this.jsplumbInstance.addEndpoint(ele, {
          anchor: 'Top',
          endpoint: {
            type: DotEndpoint.type,
            options: {
              radius: 6,
              cssClass: 'test',
            },
          },
          source: true,
          target: true,
        });
        this.jsplumbInstance.addEndpoint(ele, {
          anchor: 'Right',
          endpoint: {
            type: DotEndpoint.type,
            options: {
              radius: 6,
              cssClass: 'test',
              hoverClass: 'hover',
            },
          },
          source: true,
          target: true,
        });
        this.jsplumbInstance.addEndpoint(ele, {
          anchor: 'Bottom',
          endpoint: {
            type: DotEndpoint.type,
            options: {
              radius: 6,
              cssClass: 'test',
            },
          },
          source: true,
          target: true,
        });
        this.$refs[id][0].style.left = node.location.left + 'px';
        this.$refs[id][0].style.top = node.location.top + 'px';
        this.jsplumbInstance.repaintEverything();
      });
    },
    // 添加line
    addLine(line) {
      this.jsplumbInstance.connect({
        source: document.getElementById(line.source),
        target: document.getElementById(line.target),
        anchors: ['Bottom', 'Top'],
      });
    },
    itemClick(item) {
      this.itemData = item;
    },
  },
};
</script>

<style scoped lang="scss">
.add-config {
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  background: #fff;
}

.tool-bar {
  border: 1px solid #e6e9ed;
  height: 50px;
  box-sizing: border-box;
}
.main {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  .main-left,
  .main-right {
    box-sizing: border-box;
    width: 150px;
    height: 100%;
    background: #fafafa;
    padding: 10px 5px;
  }
  .main-right {
    width: 250px;
  }
  .main-center {
    flex: 1;
    height: 100%;
  }
}

#flow {
  position: relative;
  width: 100%;
  background-color: white;
  overflow: auto;
  height: 100%;
  user-select: none;
  .item {
    position: absolute;
  }
}

::v-deep .points .point:hover,
::v-deep .points .point._jsPlumb_source_hover,
::v-deep .points .point._jsPlumb_target_hover {
  border: 1px solid #00aaaa;
  // color: orange;
  cursor: pointer;
}
.point {
  background-color: white;
  border: 1px solid #346789;
  text-align: center;
  z-index: 24;
  cursor: pointer;
  box-shadow: 2px 2px 19px #aaa;
  border-radius: 0.5em;
  position: absolute;
  color: black;
  padding: 0.5em;
  width: 80px;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: box-shadow 0.15s ease-in;
}

.point:hover {
  border: 1px solid #123456;
  box-shadow: 2px 2px 19px #444;
  opacity: 0.9;
  filter: alpha(opacity=90);
}

::v-deep .jtk-endpoint {
  cursor: pointer;
}

.graphics {
  background-color: white;
  border: 1px solid #346789;
  text-align: center;
  cursor: pointer;
  box-shadow: 2px 2px 19px #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: box-shadow 0.15s ease-in;
  // margin: 20px auto;
  padding: 0.5em;
}
.oval {
  width: 80px;
  height: 40px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.parallelogram {
  width: 80px;
  height: 40px;
  transform: skewX(-20deg);
}
.round {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.rectangle {
  border-radius: 0.5em;
  padding: 0.5em;
  width: 80px;
  height: 40px;
  line-height: 40px;
}

::v-deep .test {
  opacity: 0;
}
::v-deep .test:hover {
  opacity: 1;
}

.main-left {
  .graphics {
    margin: 15px auto;
  }
}
</style>
