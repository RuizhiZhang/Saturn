// 表格唯一标识
const gridManagerName = 'test';

// 公开方法列表
const GM_PUBLISH_METHOD_MAP = {
    init: {
        key: 'init',
        relyInit: false,
        title: '初始化',
        code: 'demo1.initGM(document.querySelector("table"));'
    },
    get: {
        key: 'get',
        relyInit: true,  // 是否依赖init方法
        title: '获取表格的实时配置信息',
        code: `GridManager.get('${gridManagerName}');`
    },
    version: {
        key: 'version',
        relyInit: false,
        title: '获取当前GridManager的版本号',
        code: 'GridManager.version;'
    },
    getLocalStorage: {
        key: 'getLocalStorage',
        relyInit: true,
        title: '获取表格用户记忆',
        code: `GridManager.getLocalStorage('${gridManagerName}');`
    },
    resetLayout: {
        key: 'resetLayout',
        relyInit: true,
        title: '重置表格布局',
        code: `GridManager.resetLayout('${gridManagerName}', '800px', '500px');`
    },
    clear: {
        key: 'clear',
        relyInit: true,
        title: '清除表格记忆数据',
        code: `GridManager.clear('${gridManagerName}');`
    },
    getTableData: {
        key: 'getTableData',
        relyInit: true,
        title: '获取指定tr所使用的数据',
        code: `GridManager.getTableData('${gridManagerName}');`
    },
    getRowData: {
        key: 'getRowData',
        relyInit: true,
        title: '获取指定tr所使用的数据',
        code: `GridManager.getRowData('${gridManagerName}', document.querySelector("table[grid-manager=${gridManagerName}] tbody tr"));`
    },
    updateRowData: {
        key: 'updateRowData',
        relyInit: true,
        title: '更新指定行所使用的数据',
        code: `GridManager.updateRowData('${gridManagerName}', 'id', {id: 92, title: 'ccc'});`
    },
    updateTreeState: {
        key: 'updateTreeState',
        relyInit: true,
        title: '更新树的展开状态',
        code: `GridManager.updateTreeState('${gridManagerName}', true);`
    },
    setSort: {
        key: 'setSort',
        relyInit: true,
        title: '手动设置排序',
        code: `GridManager.setSort('${gridManagerName}', {createDate: 'ASC'});`
    },
    setConfigVisible: {
        key: 'setConfigVisible',
        relyInit: true,
        title: '设置表头配置区域可视状态',
        code: `GridManager.setConfigVisible('${gridManagerName}', true);`
    },
    showTh: {
        key: 'showTh',
        relyInit: true,
        title: '设置列为可视状态',
        code: `GridManager.showTh('${gridManagerName}', 'pic');`
    },
    hideTh: {
        key: 'hideTh',
        relyInit: true,
        title: '设置列为隐藏状态',
        code: `GridManager.hideTh('${gridManagerName}', 'pic');`
    },
    exportGrid: {
        key: 'exportGrid',
        relyInit: true,
        title: '导出指定表格',
        code: `GridManager.exportGrid('${gridManagerName}', 'demo中使用的导出').then(res=>{console.log('success')}).catch(err=>{console.error('error', err)});`
    },
    setQuery: {
        key: 'setQuery',
        relyInit: true,
        title: '更改在生成组件时所配置的参数query',
        code: `GridManager.setQuery('${gridManagerName}', {'userName':'baukh','sex':'男'});`
    },
    setAjaxData: {
        key: 'setAjaxData',
        relyInit: true,
        title: '用于再次配置ajaxData数据',
        code: `GridManager.setAjaxData('${gridManagerName}', {data: [{title: '通过setAjaxData动态添加的数据，其它项为空'}], totals: 1});`
    },
    refreshGrid: {
        key: 'refreshGrid',
        relyInit: true,
        title: '刷新表格',
        code: `GridManager.refreshGrid('${gridManagerName}');`
    },
    renderGrid: {
        key: 'renderGrid',
        relyInit: true,
        title: '渲染表格',
        code: `GridManager.renderGrid('${gridManagerName}');`
    },
    getCheckedTr: {
        key: 'getCheckedTr',
        relyInit: true,
        title: '获取当前选中的行',
        code: `GridManager.getCheckedTr('${gridManagerName}');`
    },
    getCheckedData: {
        key: 'getCheckedData',
        relyInit: true,
        title: '获取选中行的渲染数据',
        code: `GridManager.getCheckedData('${gridManagerName}');`
    },
    setCheckedData: {
        key: 'setCheckedData',
        relyInit: true,
        title: '设置选中的数据',
        code: `GridManager.setCheckedData('${gridManagerName}', [GridManager.getTableData('${gridManagerName}')[1]]);`
    },
    cleanData: {
        key: 'cleanData',
        relyInit: true,
        title: '清除指定表格数据',
        code: `GridManager.cleanData('${gridManagerName}');`
    },
    print: {
        key: 'print',
        relyInit: true,
        title: '打印当前页',
        code: `GridManager.print('${gridManagerName}');`
    },
    showLoading: {
        key: 'showLoading',
        relyInit: true,
        title: '显示加载中',
        code: `GridManager.showLoading('${gridManagerName}');`
    },
    hideLoading: {
        key: 'hideLoading',
        relyInit: true,
        title: '隐藏加载中',
        code: `GridManager.hideLoading('${gridManagerName}', 300);`
    },
    destroy: {
        key: 'destroy',
        relyInit: true,
        title: '消毁指定的GridManager实例',
        code: `GridManager.destroy('${gridManagerName}');`
    }
};
const demo1 = {
    /**
     * 初始化搜索区域
     */
    initSearch: function () {
        // 渲染下拉框
        var typeSelect = document.querySelector('.search-area select[name="type"]');

        for(let key in TYPE_MAP) {
            const option = document.createElement('option');
            option.value = key;
            option.innerText = TYPE_MAP[key];
            typeSelect.appendChild(option);
        }

        // 绑定搜索事件
        document.querySelector('.search-action').addEventListener('click', function () {
            var _query = {
                title: document.querySelector('[name="name"]').value,

            };
            table.GM('setQuery', _query, function () {
                console.log('setQuery执行成功');
            });
        });

        // 绑定重置
        document.querySelector('.reset-action').addEventListener('click', function () {
            document.querySelector('[name="name"]').value = '';

        });
    },

    /**
     * 初始化方法区域
     */
    initFN: () => {
        const fnSelect = document.querySelector('.fn-select');
        const fnRun = document.querySelector('.fn-run');
        const fnCode = document.querySelector('.fn-code');
        const fnRunInfo = document.querySelector('.fn-run-info');

        // 渲染选择区域, instantiated: 是否已经实例化
        const renderSelect = instantiated => {
            let liStr = '<option value="-1">请选择方法</option>';
            for (let key in GM_PUBLISH_METHOD_MAP) {
                let fn = GM_PUBLISH_METHOD_MAP[key];
                let disabled = !instantiated && fn.relyInit  ? 'disabled' : '';
                liStr = `${liStr}<option value="${key}" ${disabled} title="${fn.title}">${key}</option>`;
            }
            fnSelect.innerHTML = liStr;
        };
        renderSelect(true);

        // bind input change event
        fnSelect.addEventListener('change', function () {
            fnCode.value = GM_PUBLISH_METHOD_MAP[this.value].code;
            fnRun.setAttribute('now-fun', this.value);
        });

        // bind run event
        fnRun.addEventListener('click', function () {
            if (!fnCode.value) {
                fnRunInfo.innerHTML = '请通过选择方法生成所需要执行的代码';
                return;
            }
            fnRunInfo.innerHTML = '';
            const log = eval(fnCode.value);
            const nowFn = fnRun.getAttribute('now-fun');
            console.group(nowFn);
            console.log(fnCode.value);
            console.log(log);
            console.groupEnd();
            try {
                if (nowFn === 'init') {
                    renderSelect(true);
                }
                if (nowFn === 'destroy') {
                    renderSelect(false);
                }

                fnRunInfo.innerHTML = `<span class="success-info">
                    <a href="http://gridmanager.lovejavascript.com/api/index.html#${nowFn}" target="_blank">${nowFn}</a>
                    执行成功, 请打开控制台查看具体信息
                </span>`;
            } catch (e) {
                fnRunInfo.innerHTML = `<span class="error-info">
                    <a href="http://gridmanager.lovejavascript.com/api/index.html#${nowFn}" target="_blank">${nowFn}</a>
                    执行失败, 请打开控制台查看具体信息
                </span>`;
                console.error('执行错误: ', e);
            }
        });
    },

    /**
     * 初始化表格
     */
    initGM: function () {
        new window.GridManager(table, {
            gridManagerName: 'test',
            width: '100%',
            height: '100%',
            // 初始渲染时是否加载数据
            // firstLoading: false,

            // supportAutoOrder: false,
            // 自动序号配置
            autoOrderConfig: {
                // 固定列
                fixed: 'left'
            },
            supportCheckbox: false,
            // 选择框配置
            checkboxConfig: {
                // 使用单选
                // useRadio: true,

                // 使用行选中
                // useRowCheck: true,

                key: 'id',
                // 复选时最大可选数
                // max: 2,

                // 固定列
                fixed: 'left'
            },

            // 是否使用无总条数模式
            // useNoTotalsMode: true,
            // 是否开启分页
            supportAjaxPage: true,
            // 排序模式，single(升降序单一触发) overall(升降序整体触发)
            sortMode: 'single',

            supportAdjust: false,
            // 是否开启配置功能
            // supportConfig: false,

            // 是否开启导出
             supportExport: true,

            // 是否开启打印
             supportPrint: true,

            // 右键菜单
            supportMenu: true,
            menuHandler: list => {
                list.unshift({
                    content: 'Customized Menu',
                    line: true,
                    onClick: _ => {
                        alert(_);
                    }
                });
                return list;
            },

            // 禁用分割线
            // disableLine: true,

            // 设置表头的icon图标是否跟随文本
            // isIconFollowText: true,

            // 组合排序
            // isCombSorting: true,

            // 合并排序
            // mergeSort: true,

            // 禁用边框线
            // disableBorder: true,

            // 使用单元格触焦高亮样式
            useCellFocus: true,

            // 行移动
            supportMoveRow: false,
            moveRowConfig: {
                key: 'priority',
                useSingleMode: true,
                fixed: 'left',
                handler: (list, tableData) => {
                    console.log(list, tableData);
                }
            },
            summaryHandler: function(data){
                let readNumber = 0;
                data.forEach(item => {
                    readNumber += item.readNumber;
                });
                return {
                    pic: '共计',
                    readNumber
                };
            },

            // 禁用缓存
            disableCache: false,
            ajaxData: function (settings, params) {
                document.querySelector('[name="type"]').value = params.type || -1;
                return 'http://127.0.0.1:9091/grid/data';
            },

            // 导出配置
            exportConfig: {
                fileName: query => {
                    const date = new Date();
                    let fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    for (let key in query) {
                        fileName = `${fileName}-${key}=${query[key]}`;
                    }
                    return fileName;
                },
                suffix: 'xls'
            },
            ajaxType: 'POST',

            // 选择事件执行前事件
            checkedBefore: function (checkedList, isChecked, row) {
                console.log('checkedBefore==', checkedList, isChecked, row);
                if (row && row.id === 90) {
                    alert('该节点在checkedBefore中配置为不可选');
                }
                return row && row.id !== 90;
            },

            // 选择事件执行后事件
            checkedAfter: function (checkedList, isChecked, row) {
                console.log('checkedAfter==', checkedList, isChecked, row);
            },

            // 全选事件执行前事件
            checkedAllBefore: function (checkedList, isChecked) {
                console.log('checkedAllBefore==', checkedList, isChecked);
                //
                // if (isChecked) {
                //     alert('不能取消全选');
                // }
                // return !isChecked;
            },

            // 全选事件执行后事件
            checkedAllAfter: function (checkedList, isChecked) {
                console.log('checkedAllAfter==', checkedList, isChecked);
            },

            // 执行排序前事件
            sortingBefore: function (query) {
                console.log('sortingBefore', query);
            },

            // 排行排序后事件
            sortingAfter: function (query) {
                console.log('sortingAfter', query);
            },

            // AJAX请求前事件函数
            ajaxBeforeSend: function (promise) {
                console.log('ajaxBeforeSend');
            },
            // AJAX成功事件函数
            ajaxSuccess: function (response) {
                console.log('ajaxSuccess');
            },

            // AJAX失败事件函数
            ajaxError: function (errorInfo) {
                console.log('ajaxError');
            },

            // AJAX结束事件函数
            ajaxComplete: function (complete) {
                console.log('ajaxComplete');
            },
            adjustBefore: eve => {
                console.log('adjustBefore=>', eve);
            },
            adjustAfter: eve => {
                console.log('adjustAfter=>', eve);
            },

            // 执行请求后执行程序
            responseHandler: res => {
                res.data.forEach(item => {
                    // 用id模拟优先级字段
                    item.priority = item.id;
                });
                return res;
            },

            // 单行数据渲染时执行程序
            rowRenderHandler: (row, index) => {
                // if (row.id === 90) {
                //     row.gm_checkbox = true;
                // }

                // 指定第92行不可选中
                if (row.id === 92) {
                        // row.gm_checkbox = true;
                    row.gm_checkbox_disabled = true;
                    row.gm_row_class_name = 'test-row-class';
                }
                return row;
            },

            emptyTemplate: settings => {
                return `<div style="text-align: center;">${settings.query.title ? '搜索为空' : '暂无数据'}</div>`;
            },
            // 单个td的click事件
            // cellClick: (row, rowIndex, colIndex) => {
            //     console.log(row, rowIndex, colIndex);
            //     return {
            //         text: '这里有个提示',
            //         position: 'left'
            //     };
            // },
            // rowHover: (a, b, c) => {
            //     return {
            //         text: '这里有个提示',
            //         position: 'right'
            //     };
            // },
            // useWordBreak: true,
            i18n: 'en-us',
              fullColumn: {
                    useFold: true,
                    fixed: 'left', // 折叠事件列固定方向
                    bottomTemplate: function(row, index){
                        return  '<div class="table-form">'
                        + '<div class="tf-text">'
                        + '<div class="tf-el"><label>precision:</label>'+ row.data +'</div>'
                        + '</div>';
                    }
                },
            columnData: [
             {
                    key: 'name',
                    remind: 'model name',
                    text: 'Model',
					//sorting:'',
					template: function(title, rowObject) {
                        var titleNode = document.createElement('a');
                        titleNode.setAttribute('name', title);
                        titleNode.innerText = title;
                        titleNode.title = `${rowObject.name}`;
                        titleNode.classList.add('plugin-action');
                        return titleNode;
                    }
                    // disableMoveRow: true
                },

                {
                    key: 'kpi',
                    text: 'kpi',
					sorting: '',
                    width: '100px'

                    // disableMoveRow: true
                },
				{
                    key: 'value',
                    remind: 'value',
                    text: 'value',
                    width: '200px',
					fixed: 'right',
					template: function(title, rowObject) {
                        var titleNode = document.createElement('a');
                        titleNode.setAttribute('vslur', title);
                        titleNode.innerText = title;
                        titleNode.title = `${rowObject.Accuracy}`;
                        titleNode.classList.add('plugin-action');
                        return titleNode;
                    }
                    //disableMoveRow: true
                }
            ]
			 
        }, query => {
            // 渲染完成后的回调函数
            console.log('渲染完成后的回调函数:', query);
        });
    },

    /**
     * 编辑功能
     */
    editRowData: function (dom) {
        window.GridManager.updateRowData('test', 'id', {id: window.parseInt(dom.getAttribute('data-id')), lastDate: new Date().getTime()});
    }
};

// GridManager 渲染
const table = document.querySelector('table');
demo1.initSearch(table);
demo1.initGM(table);
demo1.initFN();
