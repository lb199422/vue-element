<template>
  <div>
    <CommonDrawer
      ref="yb-drawer"
      :size="size"
      :title="title"
      :show-btn="showButton"
      @close="close"
      @save="save"
      @opened="opened"
      :destroy-on-close="true"
    >
      <div class="add-config">
        <!-- 头部 -->
        <!-- <div class="tool-bar"></div> -->
        <!-- 中间内容 -->
        <div class="main">
          <div class="main-left"></div>
          <!-- 容器 -->
          <div class="main-center panel-body points flow_chart" id="flow">
            <!-- 根据数据生成节点 -->
            <div
              :ref="item._id"
              v-for="item in flowData.point"
              :key="item._id"
              :id="item._id"
              :class="`point chart_act_${item.status} ${item.name}`"
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

export default {
  components: {
    CommonDrawer,
  },
  data() {
    return {
      currentType: '',
      size: '100%',
      showButton: true,
      flowData: {
        point: [
          {
            _id: '58c21d713819d56d68763918',
            name: 'MoeLove',
            status: '0',
          },
          {
            _id: '58c21d803819d56d68763919',
            name: 'Moe',
            status: '1',
          },
          {
            _id: '58c21da83819d56d6876391a',
            name: 'Love',
            status: '0',
          },
          {
            _id: '58c63ecf3819d5a22f2c7f24',
            name: 'TaoBeier',
            status: '1',
          },
        ],
        location: [
          ['Moe', 1, 10],
          ['Love', 4, 24],
          ['TaoBeier', 4, 14],
          ['TaoBeier', 20, 24],
          ['MoeLove', 1, 1],
        ],
        line: [
          ['58c21d713819d56d68763918', '58c21d803819d56d68763919'],
          ['58c21d803819d56d68763919', '58c21da83819d56d6876391a'],
          ['58c21d803819d56d68763919', '58c63ecf3819d5a22f2c7f24'],
          ['58c21da83819d56d6876391a', '58c63ecf3819d5a22f2c7f24'],
        ],
      },
      templateList: [],
      itemData: {},
      graphicsList: [],
      jsplumbInstance: null,
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
      console.log(this.jsplumbInstance.getConnections(), this.jsplumbInstance);
      this.flowData.point.push({
        _id: '58c21d713819d56d68763913',
        name: '测试',
        status: '1',
      });
      // 添加节点
      this.$nextTick(() => {
        this.jsplumbInstance.addEndpoint(
          document.getElementById('58c21d713819d56d68763913'),
          {
            anchor: 'Top',
            source: true,
            target: true,
          }
        );
        this.jsplumbInstance.addEndpoint(
          document.getElementById('58c21d713819d56d68763913'),
          {
            anchor: 'Right',
            source: true,
            target: true,
          }
        );
        this.jsplumbInstance.addEndpoint(
          document.getElementById('58c21d713819d56d68763913'),
          {
            anchor: 'Bottom',
            source: true,
            target: true,
          }
        );
        this.jsplumbInstance.addEndpoint(
          document.getElementById('58c21d713819d56d68763913'),
          {
            anchor: 'Left',
            source: true,
            target: true,
          }
        );
        this.$refs['58c21d713819d56d68763913'][0].style.left = 20 + 'px';
        this.$refs['58c21d713819d56d68763913'][0].style.top = 20 + 'px';
        this.jsplumbInstance.repaintEverything();
      });
      // deleteEveryConnection() 删除所有连接
    },
    close() {
      this.$refs['yb-drawer'].close();
    },
    opened() {
      ready(() => {
        this.createFlow(this.flowData);
      });
    },
    createFlow(flowData) {
      const instance = newInstance({
        container: document.getElementById('flow'),
        connector: {
          type: FlowchartConnector.type,
        },
        maxConnections: -1,
        endpoint: {
          type: DotEndpoint.type,
          options: {
            radius: 6,
          },
        },
        endpointStyle: { fill: '#00aaaa' },
        endpointHoverStyle: { fill: 'red' },
        paintStyle: { strokeWidth: 2, stroke: '#00aaaa' },
        hoverPaintStyle: {},
        dragOptions: { cursor: 'pointer', zIndex: 5000 },
        connectionOverlays: [
          {
            type: 'Arrow',
            options: { location: 0.9, length: 8, width: 8 },
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
      instance.batch(() => {
        // init point
        flowData.point.forEach((point) => {
          instance.addEndpoint(document.getElementById(point._id), {
            anchor: 'Top',
            source: true,
            target: true,
          });
          instance.addEndpoint(document.getElementById(point._id), {
            anchor: 'Right',
            source: true,
            target: true,
          });
          instance.addEndpoint(document.getElementById(point._id), {
            anchor: 'Bottom',
            source: true,
            target: true,
          });
          instance.addEndpoint(document.getElementById(point._id), {
            anchor: 'Left',
            source: true,
            target: true,
          });
        });

        // 连接
        flowData.line.forEach((line) => {
          instance.connect({
            source: document.getElementById(`${line[0]}`),
            target: document.getElementById(`${line[1]}`),
            anchors: ['Bottom', 'Top'],
          });
        });

        // 位置
        flowData.point.forEach((point, index) => {
          this.$refs[point._id][0].style.left =
            flowData.location[index][1] * 20 + 'px';
          this.$refs[point._id][0].style.top =
            flowData.location[index][2] * 20 + 'px';
        });
      });
      // 监听连接点击事件
      instance.bind(EVENT_CONNECTION_CLICK, (p) => {
        console.log(p);
        // this.jsplumbInstance.deleteConnection(p);
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
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
  -moz-border-radius: 0.5em;
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
</style>
