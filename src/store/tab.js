import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        menu: [],
        currentMenu: null,
        tabsList: [{
            id: 1,
            name: 'home',
            path: "/",
            label: "首页",
            icon: "home",
        }]
    },
    mutations: {
        // 定义方法
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                // 判断里面tabslist里面是否有数组
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
            } else {
                state.currentMenu = null
            }
        },
        // tag方法
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 动态路由设置
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 清除cookid
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 添加
        addMenu(state, router) {
            // 查看是否
            if (!Cookie.get('menu')) {
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu = [
                {
                    path: '/',
                    component: () => import(`@/views/Main`),
                    children: []
                }
            ]
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            router.addRoutes(currentMenu)
        },
    },
    actions: {},
}