<template>
  <div>
    <div class="topology-header-bar pane header-pane">
      <Breadcrumb class="p-title primary pl4 w400 fl" :style="{fontSize: `${fontSize}px`}">
        CMB TOPOLOGY1111111111111111111111
      </Breadcrumb>
      <div class="search-input fl">
        <!--
            输入搜索内容即时搜索，所以有一个keyup事件。
            按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
            按上下键可以选择列表条目
        -->
        <input type="text" v-model="keywords" @focus='displaySearch' @change="searchClear" @keyup="get($event)" @keydown.enter="search" @keydown.down="selectDown()" @keydown.up.prevent="selectUp()">
        <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
        <span class="search-reset" @click="clearInput()">&times;</span>
        <button class="search-btn" @click="search">搜一下</button>
        <div class="search-select">
        <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
            <transition-group name="itemfade" tag='ul' mode="out-in" v-cloak class="attopic" v-show="showSearch">
              <!-- <ul class="attopic"> -->
                <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">
                    {{value}}
                </li>
              <!-- </ul> -->
            </transition-group>
        </div>
      </div>
      <div class="top-right">
        <i-button class="minor fr mt15 mr15" shape="circle" icon="ios-arrow-forward" @click="redo"></i-button>
        <i-button class="minor fr mt15 mr15" shape="circle" icon="ios-arrow-back" @click="undo"></i-button>
        <i-button class="minor fr mt15 mr15" shape="circle" icon="ios-star" @click="save"></i-button>
      </div>
    </div>
  
    <div class="cytoscape">
      <cytoscape :config="config" :preConfig="preConfig" :preCola="preCola" :afterCreated="afterCreated" :style="fullHeight" />
    </div>
  
    <drag-drawer v-model="showDeviceDrawer" :width.sync="width1" :min-width="300" :placement="placementComputed" :draggable="draggable" :scrollable="true">
      <div slot="header">
        <b>设备信息</b>
      </div>
      <p>IP地址：{{nodeData.ib_ip}}</p>
      <p>设备名：{{nodeData.id}}</p>
      <p>序列号：{{nodeData.seq}}</p>
      <p>设备类型：{{nodeData.model}}</p>
      <p>软件版本：{{nodeData.soft_ver}}</p>
      <p>所属区域：{{nodeData.area}}</p>
      <p>厂商：{{nodeData.manu}}</p>
      <p>硬件类型：{{nodeData.role}}</p>
      <p>系统描述硬件类型：{{nodeData.manu}}</p>
      <p>最后变更时间：{{nodeData.last_alter_time}}</p>
      <p>负责人：{{nodeData.manager}}</p>
      <p>设备分类：{{nodeData.manu}}</p>
    </drag-drawer>
    <Drawer title="性能容量" width="512" :closable="false" v-model="showLineDrawer">
      <Card shadow>
        <chart-pie @childOpen="childOpen" style="width: 431px;height: 300px;" :value="pieData" text="设备分布区域"></chart-pie>
      </Card>
  
      <table class='alertDialog'>
        <tbody>
          <tr>
            <td class='alertHead'>线路速率</td>
            <td>10 M</td>
          </tr>
          <tr>
            <td class='alertHead'>端口IP</td>
            <td>*.2.20.*</td>
          </tr>
          <tr>
            <td class='alertHead'>端口状态</td>
            <td>正常</td>
          </tr>
          <tr>
            <td class='alertHead'>线路描述</td>
            <td>bizflowm(*.2.20.*)上/opt/app 磁盘空间使用率过高,当前值:90%</td>
          </tr>
        </tbody>
      </table>
  
      <Button @click="value6 = true" type="primary" id="twoLevelDrawer">Two-level Drawer</Button>
    </Drawer>
    <Drawer title="区域性能容量" :closable="false" v-model="value6">
      <table class='alertDialog'>
        <tbody>
          <tr>
            <td class='alertHead'>线路速率</td>
            <td>10 M</td>
          </tr>
          <tr>
            <td class='alertHead'>端口IP</td>
            <td>*.2.20.*</td>
          </tr>
          <tr>
            <td class='alertHead'>端口状态</td>
            <td>正常</td>
          </tr>
          <tr>
            <td class='alertHead'>线路描述</td>
            <td>bizflowm(*.2.20.*)上/opt/app 磁盘空间使用率过高,当前值:90%</td>
          </tr>
        </tbody>
      </table>
    </Drawer>
    <drag-drawer v-model="showAreaDrawer" :width.sync="width1" :min-width="300" :placement="placementComputed" :draggable="draggable" :scrollable="true">
      <div slot="header">
        <b>区域信息</b>
      </div>
      <p>设备总数：</p>
      <p>千兆端口已用/总数：</p>
      <p>万兆端口已用/总数：</p>
      <p>核心A出入流量：</p>
      <p>核心B出入流量：</p>
      <p>总流量：</p>
    </drag-drawer>
  
    <drag-drawer v-model="showAlertsDrawer" :width.sync="width1" :min-width="300" :placement="placementComputed" :draggable="draggable" :scrollable="true">
      <div slot="header">
        <b>告警信息</b>
      </div>
      <p>IP：</p>
      <p>告警级别：</p>
      <p>告警详细信息：</p>
      <p>时间：</p>
    </drag-drawer>
  
    <Modal title="对话框标题" :visible.sync="dialogAlarts" class-name="vertical-center-modal">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>
  
  </div>
</template>

<script>
  // 引入echart 
  import {
    ChartPie
  } from '_c/charts'
  import {
    Modal
  } from 'iview'
  import DragDrawer from '_c/drag-drawer'
  import '@/components/topology/cmb-topology.less'
  import elements from './elements/elements.js'
  import elements2 from "./elements/level-1-1.js";
  import elements3 from "./elements/level-1-2.js";
  import elements4 from "./elements/level-2-sz-op.js";
  import elements5 from "./elements/level-2-sh-op.js";
  import icons from './elements/icons.js'
  import layout from './configs/layout'
  import style from './configs/style'
  import jquery from 'jquery'
  import contextMenus from 'cytoscape-context-menus'
  import 'cytoscape-context-menus/cytoscape-context-menus.css'
  import popper from 'cytoscape-popper'
  import cytoscape from 'cytoscape'
  import cola from 'cytoscape-cola'
  
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      },
      fontSize: {
        type: Number,
        default: 21
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },
    components: {
      // 引入组件
      ChartPie,
      DragDrawer,
      Modal
    },
    computed: {
      breadCrumbList() {
        return this.$store.state.app.breadCrumbList
      },
      placementComputed() {
        return this.placement ? 'left' : 'right'
      }
    },
    data() {
      return {
        // 给组件的传值pieData 组件用value接收
        pieData: [{
            value: 335,
            name: '深圳1'
          },
          {
            value: 310,
            name: '深圳2'
          },
          {
            value: 234,
            name: '深圳-西丽'
          },
          {
            value: 135,
            name: '上海-1'
          },
          {
            value: 158,
            name: '上海-2'
          }
        ],
        value6: false,
        config: {
          boxSelectionEnabled: false,
          autounselectify: true,
          elements: elements,
          style: style,
          layout: layout,
        },
        loading: false,
        keywords: '',
        myData: [],//用来接收ajax得到的数据
        now: -1,
        searchIndex: 0,
        nodes: [],
        currentEdgeIds: [],
        right: false,
        dialogTitle: '',
        dialog: false,
        dialogAlarts: false,
        linemessage: false,
        dataLine: {},
        confirm: false,
        nodeData: {},
        redoCount: 0,
        target: {},
        fullHeight: null,
        searchHeight: null,
        alertsDevice: [],
        showLineDrawer: false,
        showDeviceDrawer: false,
        showAreaDrawer: false,
        showAlertsDrawer: false,
        width1: 300,
        width2: 200,
        placement: false,
        draggable: true,
        colorFlag: 0,
        showSearch: false,
        level11: [],
        level12: [],
        level21: [],
        level22: [],
      }
    },
    created: function() {
      this.setHeight(200)
    },
    mounted() {
      this.cyInit(),
      this.cyAlerts()
    },
    methods: {
      hideSearch () {
        this.showSearch = false
      },
      displaySearch () {
        if (this.myData.length > 0) {
          this.showSearch = true
        }
      },
      childOpen(params) {
        document.getElementById("twoLevelDrawer").click();
      },
      searchClear() {
        if (this.keywords.length === 0) {
          this.$cytoscape.instance.then(cy => {
            var nodes = cy.elements().nodes()
            nodes.map(node => {
              var data = node[0]._private.data
              cy.$('#' + data.id).style({
                'border-width': 0,
              })
            })
          })
          this.myData = []
          this.showSearch = false
          return
        }
      },
      search() {
        if (this.keywords.length == 0) {
          return
        }
        this.showSearch = true
        if (this.keywords.length === 0) {
          this.$cytoscape.instance.then(cy => {
            var nodes = cy.elements().nodes()
            nodes.map(node => {
              var data = node[0]._private.data
              cy.$('#' + data.id).style({
                'border-width': 0,
              })
            })
          })
          this.loading = false
          return
        }
        var selected = []
        this.$cytoscape.instance.then(cy => {
          var keyword = this.keywords
          var datas = cy.elements().nodes()
          var datas2 = elements2.nodes
          var datas3 = elements3.nodes
          var datas4 = elements4.nodes
          var datas5 = elements5.nodes
          datas.map(node => {
            var name = node._private.data.id
            if (name === keyword) {
              selected.push(name)
            }
            var names = name.split("-")
            for (var i in names) {
              if (names[i] === keyword) {
                selected.push(name)
              }
            }
            var name1 = name.match("([A-Z]{2}).*")
            for (var i in name1) {
              if (name1[1] === keyword) {
                selected.push(name)
              }
            }
            var name2 = name.split("-")[1]
            for (var i in name2) {
              if (name1[i] === keyword) {
                selected.push(name)
              }
            }
            var name3 = name.match(".*?-([A-Z]+).*-.*")
            for (var i in name3) {
              if (name3[1] === keyword) {
                selected.push(name)
              }
            }
            var name4 = name.match(".*-.*?-([A-Z]+).*-.*")
            for (var i in name4) {
              if (name4[1] === keyword) {
                selected.push(name)
              }
            }
          })
          // console.log(datas2)
          // console.log(datas3)
          this.level11 = this.searchMap (datas2)
          this.level12 = this.searchMap (datas3)
          this.level21 = this.searchMap (datas4)
          this.level22 = this.searchMap (datas5)
          console.log("this.level21")
          console.log(this.level21)
          // console.log("selected2")
          // console.log(localStorage.getItem('selected'))
          // this.myData = JSON.parse(localStorage.getItem('selected'))
        })
        this.$cytoscape.instance.then(cy => {
          selected.map(id => {
            cy.$('#' + id).style({
              'border-opacity': 0.7,
              'border-color': '#e53935',
              'border-width': 15,
            })
          })
        })
      },
      searchMap (datas) {
        var selected = []
        var keyword = this.keywords
        // console.log(datas)
        datas.map(node => {
          var name = node.data.id
          if (name === keyword) {
            selected.push(name)
          }
          var names = name.split("-")
          for (var i in names) {
            if (names[i] === keyword) {
              selected.push(name)
            }
          }
          var name1 = name.match("([A-Z]{2}).*")
          for (var i in name1) {
            if (name1[1] === keyword) {
              selected.push(name)
            }
          }
          var name2 = name.split("-")[1]
          for (var i in name2) {
            if (name1[i] === keyword) {
              selected.push(name)
            }
          }
          var name3 = name.match(".*?-([A-Z]+).*-.*")
          for (var i in name3) {
            if (name3[1] === keyword) {
              selected.push(name)
            }
          }
          var name4 = name.match(".*-.*?-([A-Z]+).*-.*")
          for (var i in name4) {
            if (name4[1] === keyword) {
              selected.push(name)
            }
          }
        })
        var selecteds = []
        selected.map(name => {
          // console.log(name)
          if (name.length > 3) {
            // console.log(name)
            if (this.myData.indexOf(name) === -1) {
              // console.log(name)
              this.myData.push(name)
              console.log(selecteds)
            }
            if (selecteds.indexOf(name) === -1) {
              selecteds.push(name)
            }
          }
        })
        // this.myData = selecteds
        // console.log(this.myData)
        if (selected.length == 0) {
          return false
        }else {
          localStorage.setItem('selected', selected)
          return selecteds
        }
      },
      get: function(ev) {
          // 如果按得键是上或者下，就不进行ajax
          if (ev.keyCode == 38 || ev.keyCode == 40) {
              return;
          }

          // this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keywords + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
          //     this.myData = res.data.s;
          // });
      },
      selectDown: function() {
          this.now++;
          //到达最后一个时，再按下就回到第一个
          if (this.now == this.myData.length) {
              this.now = 0;
          }
          this.keywords = this.myData[this.now];
      },
      selectUp: function() {
          this.now--;
          //同上
          if (this.now == -1) {
              this.now = this.myData.length - 1;
          }
          this.keywords = this.myData[this.now];
      },
      // search: function() {
      //     //打开对应的搜索界面
      //     window.open(this.logoData[this.searchIndex].searchSrc + this.keywords);
      // },
      selectHover: function(index) {
          this.now = index
      },
      selectClick: function(index) {
          console.log('uyxxsjjjj')
          this.keywords = this.myData[index];
          console.log(`${this.keywords}`)
          console.log(this.level11)
          for (var i in this.level11) {
            if (this.level11[i] == this.keywords) {
              this.$router.push({path:'/level-1-1', query:{keywords:this.keywords}})
            }
          }
          for (var i in this.level12) {
            if (this.level12[i] == this.keywords) {
              this.$router.push({path:'/level-1-2', query:{keywords:this.keywords}})
            }
          }
          for (var i in this.level21) {
            if (this.level21[i] == this.keywords) {
              this.$router.push({path:'/level-2-sz-op', query:{keywords:this.keywords}})
            }
          }
          for (var i in this.level22) {
            if (this.level22[i] == this.keywords) {
              this.$router.push({path:'/level-2-sh-op', query:{keywords:this.keywords}})
            }
          }
      },
      clearInput: function() {
          this.keywords = '';
          this.myData = []
          this.showSearch = false
          // this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keywords + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
          //     this.myData = res.data.s;
          // });
      },
      getIndex: function(index) {
          this.searchIndex = index;
      },
      clear() {
        this.redoCount = 0
        localStorage.clear()
      },
      saveInfo() {
        this.dialogTitle = '节点信息储存成功'
        this.dialog = true
        this.right = false
      },
      removeConfirm() {
        this.confirm = false
        this.target.remove()
        this.dialogTitle = '节点删除成功'
        this.dialog = true
      },
      redo() {
        var keys = JSON.parse(localStorage.getItem('keys')).reverse()
        var index = parseInt(localStorage.getItem('index'))
        if (index === 0) {
          this.redoCount++
            this.dialogTitle = '已为最新版本'
          this.dialog = true
          return
        }
        if (index > 0) index = index - 1;
  
        localStorage.setItem('index', index.toString())
        this.$cytoscape.instance.then(cy => {
          cy.json(storage.getPositions(keys[index]))
          console.log('前滾成功')
        })
      },
      undo() {
        var keys = JSON.parse(localStorage.getItem('keys')).reverse()
        var index = parseInt(localStorage.getItem('index'))
        if ((keys.length - 1) === index) {
          this.dialogTitle = '已为最旧版本'
          this.dialog = true
          return
        }
        if ((keys.length - 1) > index) index = index + 1
        localStorage.setItem('index', index.toString())
  
        this.$cytoscape.instance.then(cy => {
          cy.json(storage.getPositions(keys[index]))
          console.log('回滾成功')
        })
      },
      last() {
        var keys = JSON.parse(localStorage.getItem('keys')).reverse()
        var index = 0;
        localStorage.setItem('index', '0');
        this.$cytoscape.instance.then(cy => {
          cy.json(storage.getPositions(keys[index]));
          console.log('成功')
        });
      },
      save() {
        this.$cytoscape.instance.then(cy => {
          storage.setPositions(cy.json())
          this.dialogTitle = '节点保存成功'
          this.dialog = true
        })
      },
  
      preCola(cytoscape) {
        cytoscape.use(cola)
      },
      preConfig(cytoscape) {
        var pagecount = this.$store.state.app.pagecount
        if (pagecount === 0) {
          this.$store.commit('uppagecount')
          contextMenus(cytoscape, jquery)
          cytoscape.use(popper)
        }
      },
      addNodeData(nodeData) {
        this.nodeData = nodeData
        this.setDevice()
      },
      areaEvent(nodeData) {
        this.nodeData = nodeData
        this.showAreaDrawer = true
      },
      AlartsEvent() {
        this.showAlertsDrawer = true
      },
      removeNode(target) {
        // this.target = target
        target.remove()
        // this.confirm = true
      },
      afterCreated(cy) {
        var addNodeData = this.addNodeData
        var removeNode = this.removeNode
        var openFileIIs = this.openFileIIs
        var _this = this
        cy.contextMenus({
          menuItems: [{
              id: 'add-node',
              content: '设备信息',
              tooltipText: 'add node',
              selector: 'node.deviceNode, node.inborder, node.level1',
              onClickFunction: function(event) {
                var targetDevice = event.target.data().id
                var sumAlarts = _this.$store.state.sumAlarts
                addNodeData(event.target.data())
              },
            },
            {
              id: 'area',
              content: '区域信息',
              tooltipText: 'area',
              selector: 'node.shenzhen, node.shanghai, node.area, node.divide, node.divide2, node.divide3',
              onClickFunction: function(event) {
                _this.areaEvent(event.target.data())
              },
            },
            {
              id: 'remove',
              content: '删除设备',
              tooltipText: 'remove',
              selector: 'node.deviceNode, node.inborder, node.level1',
              onClickFunction: function(event) {
                var target = event.target || event.cyTarget
                removeNode(target)
              },
            },
            {
              id: 'login',
              content: '登录设备',
              tooltipText: 'login',
              selector: 'node.deviceNode, node.inborder, node.level1',
              onClickFunction: function(event) {
                window.location.href = 'telnet://SecureCRTexe'
              },
            },
            {
              id: 'alarts',
              content: '告警',
              tooltipText: 'alarts',
              selector: 'node.deviceNode, node.inborder, node.shenzhen, node.shanghai, node.area, node.level1',
              onClickFunction: function(event) {
                _this.AlartsEvent()
              },
            },
            {
              id: 'line',
              content: '线路信息',
              tooltipText: 'line',
              selector: 'edge',
              onClickFunction: function(event) {
                _this.showLineDrawer = true
  
              },
            },
          ],
        })
      },
      addimg() {
        console.log(this.$cytoscape.instance)
        console.log(this.$cytoscapexusx)
        this.$cytoscape.instance.then(cy => {
          cy.nodes().style({
            'background-image': './assets/icons/routes.png',
          });
          
          cy.edges('.principalRed').style({
            "line-color": "#000",
            'width': '8px',
          });
          console.log('xbxaaaaaaaaaaaaaaaaaaaaaaaa')
        })
        console.log(this.$cytoscape.instance)
      },
      cyInit() {
        var currentEdgeIds = this.currentEdgeIds;
        this.$cytoscape.instance.then(cy => {
          var nodes = cy.elements().nodes();
          nodes.map(node => {
            var data = node.data();
            var status = '';
            if (data.status === undefined) {
              data.status = 'normal';
            }
            if (data.status !== 'normal') {
              status = '_' + data.status;
            }
            node.style({
              'background-image': './assets/icons/unknown' + status + '.png',
            });
            icons.map(icon => {
              if (icon.type === data.type) {
                var url = (data.status === 'normal') ? icon.normal : ((data.status === 'warn') ? icon.warn : icon.error);
                console.log(url)
                node.style({
                  'background-image': './assets/icons/' + url
                });
              } else if (data.status === 'none') {
                node.style({
                  'background-image': 'none'
                });
              } else if (data.status === 'shenzhen') {
                node.style({
                  'background-image': './assets/images/center.png'
                });
              } else if (data.status === 'shanghai') {
                node.style({
                  'background-image': './assets/images/center.png'
                });
              } else if (data.status === 'divide') {
                node.style({
                  'background-image': './assets/images/center.png'
                });
              }
            });
          })
          nodes = {}
          var _this = this
          console.log('caaaa',cy)
          //cy.off('tap')
          cy.on('tap', '#SZ7FC11U07-WN1-ASR1013A, #SZ7FG06U22-WN1-ASR1013B', function() {
            _this.$router.push("/level1-1")
          });
          cy.on('tap', '#shenzhen', function() {
            _this.$router.push("/level-1-1")
            console.log('ccc')
          });
          cy.on('tap', '#shanghai', function() {
            _this.$router.push("/level-1-2")
            console.log('ccc')
          });
          cy.on('tap', '#SZ7FA13U16-CR1-C7KA, #SZ7FB11U16-CR1-C7KB, #SZ7FH04U16-CR1-C7KC, #SZ7FJ02U16-CR1-C7KD', function() {
            _this.$router.push("/level-1-1")
          });
          cy.on('tap', '#SHN1B03U02-CR1-N77A, #SHN2B03U02-CR1-N77B, #SHN1B07U02-CR1-N77C, #SHN2B07U02-CR1-N77D', function() {
            _this.$router.push("/level-1-2")
          });
        })
      },
      cyAlerts() {
        var dataAlerts = this.dataAlerts
        var sumAlarts = []
        var szcyid = []
        var sznodealias = []
        for (var i in dataAlerts) {
          var severity = dataAlerts[i].severity
          if (severity === 1) {
            var nodealias = dataAlerts[i].nodealias
            var area = nodealias.match(".*-([A-Z]+).*-.*$")[1]
            sumAlarts.push(area)
            var area2 = nodealias.match(".*-(.*)-.*$")[1]
            sumAlarts.push(area2)
            if (nodealias.match(new RegExp("^SZ.*$"))) {
              if (sumAlarts.indexOf('shenzhen') === -1) {
                sumAlarts.push('shenzhen')
              }
              this.$cytoscape.instance.then(cy => {
                cy.nodes('#shenzhen').style({
                  'border-opacity': 0.7,
                  'border-color': '#e53935',
                  'border-width': 4,
                  'background-color': '#e53935',
                  'background-opacity': '0.3',
                });
              })
              var cyid = `#${area}`
              szcyid.push(cyid)
              var cyid2 = `#${area2}`
              szcyid.push(cyid2)
              sznodealias.push(nodealias)
              this.$store.commit('SET_SZCYID', szcyid)
              this.$store.commit('SET_SZNODEALIAS', sznodealias)
              this.$store.commit('SET_SUMALARTS', sumAlarts)
            }
            if (nodealias.match(new RegExp("^SH.*$"))) {
              this.$cytoscape.instance.then(cy => {
                cy.nodes('#shanghai').style({
                  'border-opacity': 0.7,
                  'border-color': '#e53935',
                  'border-width': 4,
                  'background-color': '#e53935',
                  'background-opacity': '0.3',
                });
              })
            }
          }
        }
      },
      changeColor() {
        var dataAlerts = this.dataAlerts
        var colorFlag = this.colorFlag;
        for (var i in dataAlerts) {
          var severity = 1
          if (severity === 1) {
            if (!colorFlag)
            {
              this.$cytoscape.instance.then(cy => {
                cy.nodes('#SZ7FC11U07-WN1-ASR1013A, #SZ7FG06U22-WN1-ASR1013B').style({
                  'border-color': '#e53935',
                  'border-width': 20,
                  'border-opacity': 0.6,
                  'background-color': '#e53935',
                  'background-opacity': '0.3',
                });
                cy.edges('.principalRed').style({
                  "line-color": "#e53935",
                  'width': '8px',
                });
              })
              this.colorFlag = 1;
            }else{
              this.$cytoscape.instance.then(cy => {
                cy.nodes('#SZ7FC11U07-WN1-ASR1013A, #SZ7FG06U22-WN1-ASR1013B').style({
                  'border-color': '#000a13',
                  'border-width': 0,
                  'border-opacity': 0.6,
                  'background-color': '#000a13',
                  'background-opacity': '0',
                });
                cy.edges('.principalRed').style({
                  "line-color": "#000a13",
                  'width': '8px',
                });
              })
              this.colorFlag = 0;
            }
          }else{
            clearInterval(this.timer)
          }
        }
      },
      setHeight(height) {
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        var curHeight = h - height; //减去页面上固定高度height
        this.fullHeight = "width:100%; height:" + curHeight + 'px'
        this.searchHeight = "height:" + curHeight + 'px'
      },
      redirectIndex() {
        this.$router.go(-1)
      },
      handleResize(event) {
        const {
          atMin
        } = event
        /* eslint-disable */
      },
      error(nodesc) {
        this.$Notice.error({
          title: '高级告警',
          desc: nodesc ? '' : '高级告警高级告警高级告警'
        });
      },
  
      setDevice() {
        let url = "./data/data.json"
        this.$axios.get(url).then(res => {
          var device = res.data;
          for (var i in device) {
            var device_info = device[i]
            for (var name in device_info) {
              if (name === this.nodeData.id) {
                var devices = device_info[name]
                this.nodeData["ib_ip"] = devices.ib_ip
                this.nodeData["seq"] = devices.seq
                this.nodeData["model"] = devices.model
                this.nodeData["soft_ver"] = devices.soft_ver
                this.nodeData["area"] = devices.area
                this.nodeData["manu"] = devices.manu
                this.nodeData["role"] = devices.role
                this.nodeData["total_runtime"] = devices.total_runtime
                this.nodeData["last_alter_time"] = devices.last_alter_time
                this.nodeData["manager"] = devices.manager
              }
            }
          }
          this.showDeviceDrawer = true
        })
      },
  
    },
    destroyed: function () {
      localStorage.setItem('count', 0)
    }
  }
</script>


<style lang="less">
  .drag-drawer-body-wrapper p {
    font-size: 14px;
    color: #000;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .ivu-drawer-wrap b {
    font-size: 14px;
    color: #000;
  }
  
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
      top: 0;
    }
  }
</style>

<style lang="css">
  .alertDialog {
    width: 100%;
    text-align: left;
    border-top: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    border-collapse: collapse;
    /*设置单元格的边框合并为1*/
  }
  
  tr {
    height: 40px;
  }
  
  td {
    border-bottom: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    padding-left: 10px;
  }
  
  .alertHead {
    width: 30%;
    text-align: right;
    vertical-align: middle;
    font-weight: bold;
    padding-right: 25px;
    background-color: #f5f5f5;
  }
  
  #twoLevelDrawer {
    height: 0;
    overflow: hidden;
    padding: 0;
    border: 0;
  }

 
</style>
