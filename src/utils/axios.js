import axios from "axios";
import { Notification } from "element-ui";
import urls from "./urls";

function doRequest(opts, handle) {
    return new Promise(function (resolve, reject) {
        axios(opts).then(function (response) {
            let data = response.data;
            if (data.code === 0) {
                resolve(data);
            } else {
                if (handle)
                    resolve(data);
                else
                    Notification({
                        message: data.msg,
                        type: "warning"
                    });
            }
        }).catch(function (error) {
            if (handle)
                reject(error);
            else
                Notification.error({
                    message: error.message
                });
        });
    });
}

export default {
    get: function (url, opts, handle) {
        opts = opts || {};
        opts.method = "GET";
        opts.url = urls(url);

        return doRequest(opts, handle);
    },

    post: function (url, opts, handle) {
        opts = opts || {};
        opts.method = "POST";
        opts.url = urls(url);

        return doRequest(opts, handle);
    },
};
