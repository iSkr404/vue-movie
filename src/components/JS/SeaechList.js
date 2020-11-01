// 后续的一个查询方法补充,缺陷不支持且的过滤方式，
class SearchList {
    constructor() {}
    search(obj, data) { // obj => 搜索条件； data => 传过来的数据
        let dataScoure = [];
        // 将后端的数据格式化一下
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            for (let k = 0; k < data[i].list.length; k++) {
                arr.push(data[i].list[k].nm);
            }
        }
        arr.forEach(item => {
            if (this.hasChange(obj, item)) { // 判断输入值(搜索条件) 是否存在对象数组上面 
                for (let i = 0; i < data.length; i++) {
                    for (let k = 0; k < data[i].list.length; k++) {
                        if (data[i].list[k].nm == item) {
                            dataScoure.push(data[i].list[k]);
                        }
                    }
                }
            }
        })
        return dataScoure;
    }

    // 使用递归遍历所有属性判断是否在对象里面匹配到对应值
    hasChange(obj, item) {
        let bool = false
        let loop = obj => {
            for (let key in obj) {
                if (String(obj[key]).trim().indexOf(item[key]) !== -1) {
                    bool = true
                }
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    loop(obj[key])
                }
            }
        }
        loop(obj)
        return bool;
        // return items.filter(item => item.indexOf(obj) > -1);
    }
}
export default SearchList;