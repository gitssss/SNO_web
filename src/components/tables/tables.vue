<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
                  <Option
                    v-for="item in columns"
                    v-if="item.key !== 'handle'"
                    :value="item.key"
                    :key="`search-col-${item.key}`"
                  >{{ item.title }}</Option>
                </Select>
      <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
                  <Icon type="search"/>&nbsp;&nbsp;搜索
                </Button>

      <Button type="primary" class="add-btn" @click="dialogFormVisible = true">新增</Button>
      <Modal v-model="dialogFormVisible" title="新增设备" @on-ok="handleSubmit('formValidate')" @on-cancel="cancel" draggable>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
          </FormItem>
          <FormItem label="Date">
            <Row>
              <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
              </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <Table ref="tablesMain" :data="insideTableData" :columns="insideColumns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :height="height" :loading="loading" :disabled-hover="disabledHover" :highlight-row="highlightRow" :row-class-name="rowClassName"
      :size="size" :no-data-text="noDataText" :no-filtered-data-text="noFilteredDataText" @on-current-change="onCurrentChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-selection-change="onSelectionChange" @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange" @on-row-click="onRowClick" @on-row-dblclick="onRowDblclick" @on-expand="onExpand">
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
                  <Option
                    v-for="item in columns"
                    v-if="item.key !== 'handle'"
                    :value="item.key"
                    :key="`search-col-${item.key}`"
                  >{{ item.title }}</Option>
                </Select>
      <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button class="search-btn" type="primary">
                  <Icon type="search"/>&nbsp;&nbsp;搜索
                </Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import addDevice from '../../api/device.js'
import './index.less'
export default {
  name: 'Tables',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
       * @description 全局设置是否可编辑
       */
    editable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 是否可搜索
       */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
       * @description 搜索控件所在位置，'top' / 'bottom'
       */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  /**
     * Events
     * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
     * @on-cancel-edit 返回值 {Object} 同上
     * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
     */
  data () {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      searchKey: '',
      dialogFormVisible: false,
      formValidate: {
        name: '',
        mail: '',
        date: ''
      },
      ruleValidate: {
        name: [{
          required: true,
          message: 'The name cannot be empty',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          message: 'Mailbox cannot be empty',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: 'Incorrect email format',
          trigger: 'blur'
        }
        ],
        date: [{
          required: true,
          type: 'date',
          message: 'Please select the date',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    cancel () {
      this.$Message.info('取消新增')
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 给新增表单添加initRowIndex属性,存入insideTableData
          this.insideTableData.unshift({
            name: this.formValidate.name,
            email: this.formValidate.mail,
            createTime: this.formValidate.date,
            initRowIndex: this.insideTableData.length
          })
          // value的作用？？？
          this.value.unshift({
            name: this.formValidate.name,
            email: this.formValidate.mail,
            createTime: this.formValidate.date,
            initRowIndex: this.insideTableData.length
          })
          // 清空表单
          this.formValidate.name = ''
          this.formValidate.mail = ''
          this.formValidate.date = ''
          // 关闭模态框
          this.dialogFormVisible = false
          this.$Message.success('新增成功!')
        } else {
          this.$Message.error('格式不符合要求，新增失败!')
        }
      })
    },
    // 实现可编辑
    suportEdit (item, index) {
      // iview table的render()函数: 可以嵌套渲染元素
      // render:(h,params) => {
      //   return h(" 定义的元素 "，{ 元素的性质 }，" 元素的内容"/[元素的内容])
      // }
      // render:(h,params)=>{
      //     return h('div', {style:{width:'100px',height:'100px',background:'#ccc'}}, '地方')
      // }
      //
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            input: val => {
              this.edittingText = val
            },
            'on-start-edit': params => {
              this.edittingCellId = `editting-${params.index}-${
                params.column.key
              }`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': params => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': params => {
              console.log(this.value)
              // 保存编辑内容时，必须有initRowIndex才行
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText === '' ? this.insideTableData[params.index][params.column.key] : this.edittingText

              this.$emit('input', this.value)
              this.$emit(
                'on-save-edit',
                Object.assign(params, {
                  value: this.edittingText
                })
              )
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    // 处理表头
    handleColumns (columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey () {
      this.searchKey =
          this.columns[0].key !== 'handle'
            ? this.columns[0].key
            : this.columns.length > 1
              ? this.columns[1].key
              : ''
    },
    handleClear (e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch () {
      this.insideTableData = this.value.filter(
        item => item[this.searchKey].indexOf(this.searchValue) > -1
      )
    },
    // 遍历表格数组，添加initRowIndex属性
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      if (this.searchable) this.handleSearch()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
  }
}
</script>
