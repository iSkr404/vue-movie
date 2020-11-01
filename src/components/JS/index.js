import Vue from 'vue'
import MessageBox from './messageBox'


export let messageBox = (function() {
    let defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleOk: null,
        handleCancel: null
    };
    return function(opts) {
        for (let attr in opts) {
            defaults[attr] = opts[attr];
        }
        let MyComponent = Vue.extend(MessageBox);
        let vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,
            },
            methods: {
                handleCancel() {
                    // call改变直接触发调用，bind改指向
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            },
        })
        document.body.appendChild(vm.$el);
    }
})();